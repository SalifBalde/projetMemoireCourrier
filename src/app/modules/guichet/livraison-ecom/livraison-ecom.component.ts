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
  montant = 0;
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
    private cdr: ChangeDetectorRef // Injection de ChangeDetectorRef pour forcer la détection des changements
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

  getAllEcommerceALivrer() {
    this.loading = true;
    this.ecommerceService.findEcommerceALivrer(1).subscribe(
      (result) => {
        console.log(result);
        this.loading = false;
        if (result && result.length > 0) {
          this.ecommerce$ = result;
          this.cdr.detectChanges(); // Déclenche la détection de changement manuellement
        } else {
          this.messageService.add({ severity: 'info', summary: 'Pas d\'envoie', detail: 'Aucun envoie à livrer' });
        }
      },
      (error) => {
        this.loading = false;
        console.error('Erreur lors du chargement des ecommerces', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not load ecommerce data.' });
      }
    );
  }

  voirEcommerce(ecommerce: EcommerceDto) {
    this.selectedEcommerce = ecommerce;
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
      this.selectedEcommerce.payer = true; // Marquer comme payé
    }
  
    // Appel du service pour livrer l'envoi
    this.ecommerceService.livrer(this.selectedEcommerce.id).subscribe(
      (result: EcommerceDto) => {
        this.displayDialog = false;  // Fermer la fenêtre modale
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'L\'envoi ecommerce a été livré avec succès.',
        });
  
        // Mettre à jour la liste des ecommerces : supprimer l'élément correspondant
        this.ecommerce$ = this.ecommerce$.filter(e => e.id !== this.selectedEcommerce.id);
  
        // Réinitialiser la sélection et les données pour un nouvel envoi
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
