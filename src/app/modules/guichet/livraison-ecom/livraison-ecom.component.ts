import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/proxy/auth/Session.service';
import { ModePaiementDto } from 'src/app/proxy/mode-paiements/models';
import { ModePaiementService } from 'src/app/proxy/mode-paiements';
import { EcommerceDto, EcommerceService } from 'src/app/proxy/ecommerce';

@Component({
  selector: 'app-livraison-ecom',
  templateUrl: './livraison-ecom.component.html',
  providers: [ConfirmationService],
})
export class LivraisonEcomComponent implements OnInit {
  form: FormGroup;
  
  ecommerce$: EcommerceDto[] = [];
  loadingEcommerce: boolean = false;
  selectedEcommerce: EcommerceDto | null = null;
  displayDialog: boolean = false;
  montantTotal: number = 0;
  payer: boolean = false;
  isModalOpen = false;
  mode$: ModePaiementDto[] = [];
  selectedEcommerceForDeletion: Set<EcommerceDto> = new Set();
  selectedModePaiement: ModePaiementDto | null = null;
  allSelected: boolean = false;
  events1: any[] = [];
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private ecommerceService: EcommerceService,
    private modePaiementService: ModePaiementService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getAllEcommerceALivrer();
  }

  buildForm() {
    this.form = this.fb.group({
      dateDebut: [undefined, Validators.required],
      dateFin: [undefined, Validators.required],
    });
  }

  private calculerMontantTotal() {
    if (this. selectedEcommerce) {
      const taxetransport = Number(this. selectedEcommerce.taxetransp) || 0;
      const taxeLivraison = Number(this. selectedEcommerce.taxeLivraison) || 0;
      this.montantTotal = taxetransport + taxeLivraison
    }
  }


  getAllEcommerceALivrer() {
    this.loading = true;
    const structureId = Number(this.sessionService.getAgentAttributes().structureId);
    if (isNaN(structureId)) {
      this.loading = false;
      console.error('Invalid structure ID');
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Structure ID invalide.' });
      return;
    }
    this.ecommerceService.findEcommerceALivrer(structureId).subscribe(
      (result) => {
        console.log(result);
        this.loading = false;
        if (result && result.length > 0) {
          this.ecommerce$ = result;
          this.cdr.detectChanges(); 
        } else {
          this.messageService.add({ severity: 'info', summary: 'Pas d\'envois', detail: 'Aucun envoi à livrer.' });
        }
      },
      (error) => {
        this.loading = false;
        console.error('Erreur lors du chargement des ecommerces', error);
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de charger les données des ecommerces.' });
      }
    );
  }
  
  voirEcommerce(ecommerce: EcommerceDto) {
    this.selectedEcommerce = ecommerce;
    this.calculerMontantTotal()
    this.payer = ecommerce.payer;
    this.displayDialog = true;
  }

  livrer() {
    if (!this.selectedEcommerce) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Avertissement',
        detail: 'Aucun envoi e-commerce sélectionné pour la livraison.',
      });
      return;
    }

    if (!this.selectedEcommerce.payer) {
      this.selectedEcommerce.payer = true;
    }

    this.ecommerceService.livrer(this.selectedEcommerce.id).subscribe(
      (result: EcommerceDto) => {
        this.displayDialog = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'L\'envoi ecommerce a été livré avec succès.',
        });

        setTimeout(() => {
          if (result && result.id) {
            this.router.navigateByUrl('/guichet/livraisonDetails/' + result.id);
          }
        }, 500);

        this.selectedEcommerce = null;
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de l\'envoie ecommerce', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Une erreur est survenue lors de la mise à jour de l\'envoie ecommerce.',
        });
      }
    );
  }


  toggleSelection(ecommerce: EcommerceDto) {
    if (this.selectedEcommerceForDeletion.has(ecommerce)) {
      this.selectedEcommerceForDeletion.delete(ecommerce);
    } else {
      this.selectedEcommerceForDeletion.add(ecommerce);
    }
    this.allSelected = this.selectedEcommerceForDeletion.size === this.ecommerce$.length;
  }

  selectAll(event: any): void {
    if (event.checked) {
      this.ecommerce$.forEach((ecommerce) => this.selectedEcommerceForDeletion.add(ecommerce));
    } else {
      this.selectedEcommerceForDeletion.clear();
    }
    this.allSelected = event.checked;
  }

  onRowSelect(event: any) {
    const ecommerce = event.data;
    this.selectedEcommerceForDeletion.add(ecommerce);
    console.log('Row Selected:', ecommerce);
    this.allSelected = this.selectedEcommerceForDeletion.size === this.ecommerce$.length;
  }

  onRowUnselect(event: any) {
    const ecommerce = event.data;
    this.selectedEcommerceForDeletion.delete(ecommerce);
    console.log('Row Unselected:', ecommerce);
    this.allSelected = this.selectedEcommerceForDeletion.size === this.ecommerce$.length;
  }


}
