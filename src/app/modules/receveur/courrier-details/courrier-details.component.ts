import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { generate, Subject, takeUntil } from 'rxjs';
import { SessionService } from 'src/app/proxy/auth/Session.service';
import { CourrierCreateUpdateDto, CourrierDto, CourrierService } from 'src/app/proxy/courrier';
import { Cn22Service } from 'src/app/proxy/pdf/cn22.service';
import { Cn23Service } from 'src/app/proxy/pdf/cn23.service';
import { Cn23AService } from 'src/app/proxy/pdf/cn23A.service';
import { FactureService } from 'src/app/proxy/pdf/facture.service';
import { PdfService } from 'src/app/proxy/pdf/pdf.service';

@Component({
  selector: 'app-courrier-details',
  templateUrl: './courrier-details.component.html',
  providers: [MessageService,ConfirmationService],
})
export class CourrierDetailsComponent implements OnInit {
  courrier: CourrierDto  = {};
  loading : boolean = false;
  structureId: number;
  private destroy$ = new Subject<void>(); // Pour gérer la désinscription

  constructor(
    private courrierService: CourrierService,
    private factureService: FactureService,
    private pdfService:PdfService,
    private cn23AService : Cn23AService,
    private sessionService: SessionService,
    private messageService: MessageService,
    private confirmationService : ConfirmationService,
    private cn23Service : Cn23Service,
    private cn22Service : Cn22Service,
    private fb: FormBuilder,
    private router: Router,
    private route : ActivatedRoute,
) {}

ngOnInit(): void {
    this.subscribeToRouteParams(); // Appel de la fonction encapsulée
    this.structureId = Number(this.sessionService.getAgentAttributes().structureId);
  }

  ngOnDestroy(): void {
    // Désabonnement propre
    this.destroy$.next();
    this.destroy$.complete();
  }

  private subscribeToRouteParams(): void {
    this.route.params
      .pipe(takeUntil(this.destroy$)) // Désabonnement automatique
      .subscribe((params: Params) => {
        const id = params['id'];
        this.loadCourrier(id);
      });
  }

  private loadCourrier(id: string): void {
    this.courrierService.getOneById(id)
      .pipe(takeUntil(this.destroy$)) // Désabonnement automatique
      .subscribe({
        next: (courrier) => {
          this.courrier = { ...courrier }; // Copie immuable
        },
        error: (err) => {
          console.error('Erreur lors du chargement du courrier', err);
        }
      });
  }

async imprimerFacture(){
    this.pdfService.generatePDF(this.courrier);
}

annulerCourrier(courrier: CourrierDto): void {
    if (this.loading) {
        return;
    }

    this.loading = true;

    const sessionAttributes = this.sessionService.getAgentAttributes();
    const journalAttributes = this.sessionService.getJournalAttributes();

    if (!journalAttributes?.id) {
        this.loading = false;
        this.messageService.add({
            severity: 'warn',
            summary: 'Avertissement',
            detail: 'Vous n\'avez pas de caisse ouverte. Veuillez ouvrir une caisse avant de continuer.',
        });
        return;
    }

    if (!courrier?.id) {
        this.loading = false;
        this.messageService.add({
            severity: 'warn',
            summary: 'Courrier invalide',
            detail: 'Aucun courrier sélectionné pour l\'annulation.',
        });
        return;
    }

    const annulationRequest: CourrierCreateUpdateDto = {
        userId: Number(sessionAttributes?.id),
        journalId: journalAttributes.id,
        caisseId: Number(sessionAttributes?.caisseId),
    };

    this.confirmationService.confirm({
        message: 'Êtes-vous sûr de vouloir annuler ce courrier ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Oui',
        rejectLabel: 'Non',
        accept: () => {
            this.courrierService.annuler(courrier.id.toString(), annulationRequest).subscribe({
                next: () => {
                    this.subscribeToRouteParams();
                    this.loading = false;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Courrier annulé avec succès!',
                    });
                },
                error: (err) => {
                    this.loading = false;
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erreur',
                        detail: 'Une erreur est survenue lors de l\'annulation du courrier.',
                    });
                    console.error('Erreur d\'annulation du courrier:', err);
                },
            });
        },
        reject: () => {
            this.loading = false;
            this.messageService.add({
                severity: 'info',
                summary: 'Annulé',
                detail: 'L\'annulation du courrier a été annulée.',
            });
        },
    });
}


async cn23() {
  if (!this.courrier) {
    console.error('Aucun courrier sélectionné pour générer le PDF.');
    return;
  }

  try {
    // Appel du service pour créer le PDF
    await this.cn23AService.createPDF(this.courrier);
    console.log('PDF généré avec succès.');
  } catch (error) {
    console.error('Erreur lors de la génération du PDF :', error);
  }
}

async cp71() {
    if (!this.courrier) {
      console.error('Aucun courrier sélectionné pour générer le PDF.');
      return;
    }

    try {
      const agent = this.sessionService.getAgentAttributes();
      const fullname = agent ? `${agent.prenom} ${agent.nom}` : 'Nom non trouvé';

      // Appel du service pour créer le PDF en passant fullname
      await this.cn23Service.createPDF(this.courrier, fullname);
      console.log('PDF généré avec succès.');
    } catch (error) {
      console.error('Erreur lors de la génération du PDF :', error);
    }
  }


  async cn22() {
    if (!this.courrier) {
      console.error('Aucun courrier sélectionné pour générer le PDF.');
      return;
    }

    try {
      // Appel du service pour créer le PDF
      await this.cn22Service.createPDF(this.courrier);
      console.log('PDF généré avec succès.');
    } catch (error) {
      console.error('Erreur lors de la génération du PDF :', error);
    }
  }

}
