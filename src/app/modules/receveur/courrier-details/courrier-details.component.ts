import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { generate } from 'rxjs';
import { CourrierDto, CourrierService } from 'src/app/proxy/courrier';
import { Cn22Service } from 'src/app/proxy/pdf/cn22.service';
import { Cn23Service } from 'src/app/proxy/pdf/cn23.service';
import { Cn23AService } from 'src/app/proxy/pdf/cn23A.service';
import { FactureService } from 'src/app/proxy/pdf/facture.service';
import { PdfService } from 'src/app/proxy/pdf/pdf.service';

@Component({
  selector: 'app-courrier-details',
  templateUrl: './courrier-details.component.html',
})
export class CourrierDetailsComponent implements OnInit {
  courrier: CourrierDto  = null;

  constructor(
    private courrierService: CourrierService,
    private factureService: FactureService,
    private pdfService:PdfService,
    private cn23Service : Cn23Service,
    private fb: FormBuilder,
    private router: Router,
          private confirmationService : ConfirmationService,
    private route : ActivatedRoute,
    private cn23AService : Cn23AService,
private messageService: MessageService,
) {}

ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
        const id = params['id'];

        this.courrierService.getOneById(id).subscribe((courrier) => {
            this.courrier = { ...courrier };
        });

      });

}
annulerCourrier(courrier: CourrierDto): void {
    if (courrier && courrier.id) {
      this.confirmationService.confirm({
        message: 'Êtes-vous sûr de vouloir annuler ce courrier ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Oui',
        rejectLabel: 'Non',
        accept: () => {
          this.courrierService.annulerCourrier((courrier.id.toString())).subscribe(
            () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Succès',
                detail: 'Courrier annulé avec succès!',
              });
            },
          );
        },
        reject: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Annulé',
            detail: 'L\'annulation du courrier a été annulée.',
          });
        }
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Courrier invalide',
        detail: 'Aucun courrier sélectionné pour l\'annulation.',
      });
    }
  }

async imprimerFacture(){
    this.pdfService.generatePDF(this.courrier);
}

// async cn23() {
//   if (!this.courrier) {
//     console.error('Aucun courrier sélectionné pour générer le PDF.');
//     return;
//   }

//   try {
//     await this.cn23Service.createPDF(this.courrier);
//     console.log('PDF généré avec succès.');
//   } catch (error) {
//     console.error('Erreur lors de la génération du PDF :', error);
//   }
// }

async cn23() {
    if (!this.courrier) {
      console.error('Aucun courrier sélectionné pour générer le PDF.');
      return;
    }
    try {
      await this.cn23AService.createPDF(this.courrier);
      console.log('PDF généré avec succès.');
    } catch (error) {
      console.error('Erreur lors de la génération du PDF :', error);
    }
  }
}
