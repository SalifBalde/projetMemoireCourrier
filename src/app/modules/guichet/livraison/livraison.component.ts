import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ColisDto, ColisService } from 'src/app/proxy/colis';
import { Router } from '@angular/router';

@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.component.html',
})
export class LivraisonComponent implements OnInit {
  form: FormGroup;
  montant = 0;
  colis$: ColisDto[] = []; 
  loadingColis: boolean = false;
  selectedColis: ColisDto | null = null; 
  displayDialog: boolean = false; 
  montantTotal: number = 0;
  payer: boolean = false;

  selectedColisForDeletion: Set<ColisDto> = new Set(); 
  allSelected: boolean = false; 

  constructor(
    private colisService: ColisService,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getAllColis();
  }

  buildForm() {
    this.form = this.fb.group({
      dateDebut: [undefined, Validators.required],
      dateFin: [undefined, Validators.required],
    });
  }

  getAllColis() {
    this.loadingColis = true;
    this.colisService.findAll().subscribe(
      (result) => {
        this.colis$ = result;
        this.montant = this.colis$.reduce((sum, item) => sum + Number(item.montant || 0), 0);
        this.loadingColis = false;
      },
      (error) => {
        console.error('Erreur lors de la récupération des colis:', error);
        this.loadingColis = false;
      }
    );
  }

  voirColis(colis: ColisDto) {
    this.selectedColis = colis;
    this.calculerMontantTotal();
    this.payer = colis.payer; 
    console.log('payer:', this.payer); 
    this.displayDialog = true;
  }

  private calculerMontantTotal() {
    if (this.selectedColis) {
      const fraisEnlevement = Number(this.selectedColis.fraisEnlevement) || 0;
      const fraisLivraison = Number(this.selectedColis.fraisLivraison) || 0;
      const montant = Number(this.selectedColis.montant) || 0;
      this.montantTotal = fraisEnlevement + fraisLivraison + montant;
    }
  }

  Livrer() {
    if (this.selectedColis) {
      this.colisService.livrer(this.selectedColis.id.toString(), this.selectedColis).subscribe(
        (response) => {
          console.log('Colis livré avec succès', response);
          this.displayDialog = false;
          this.messageService.add({ 
            severity: 'success', 
            summary: 'Succès', 
            detail: 'Le colis a été livré avec succès.' 
          });
          setTimeout(() => {
            location.reload(); 
          }, 1000); 
        },
        (error) => {
          console.error('Erreur lors de la livraison du colis', error);
          this.messageService.add({ 
            severity: 'error', 
            summary: 'Erreur', 
            detail: 'Une erreur est survenue lors de la livraison du colis.' 
          });
        }
      );
    } else {
      console.error('Aucun colis sélectionné');
      this.messageService.add({ 
        severity: 'warn', 
        summary: 'Avertissement', 
        detail: 'Aucun colis sélectionné pour la livraison.' 
      });
    }
  }

  supprimerSelection() {
    if (this.selectedColisForDeletion.size === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Avertissement',
        detail: 'Aucun colis sélectionné pour la suppression.',
      });
      return;
    }

    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer ces colis ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedColisForDeletion.forEach(colis => {
          this.colisService.delete(colis.id.toString()).subscribe(
            () => {
              console.log(`le colis ${colis.code} vient d'etre supprimer avec succes`);
              this.messageService.add({
                severity: 'success',
                summary: 'Succès',
                detail: `Le colis ${colis.code} a été supprimé.`,
              });
              this.getAllColis(); 
            },
            (error) => {
              console.error(`Erreur lors du suppression du colis ${colis.code}`, error);
              this.messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: `Error lors de la supreesion du colis ${colis.code}`,
              });
            }
          );
        });
        this.selectedColisForDeletion.clear(); 
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Annulé',
          detail: 'Suppression annulée.',
        });
      }
    });
  }

  toggleSelection(colis: ColisDto) {
    if (this.selectedColisForDeletion.has(colis)) {
      this.selectedColisForDeletion.delete(colis);
    } else {
      this.selectedColisForDeletion.add(colis);
    }
    console.log('Colis sélectionnés pour suppression:', Array.from(this.selectedColisForDeletion).map(c => c.id));
  }

  selectAll(event: any): void {
    if (event.checked) {
      this.colis$.forEach(colis => this.selectedColisForDeletion.add(colis));
    } else {
      this.selectedColisForDeletion.clear();
    }
    this.allSelected = event.checked;
  }

  onRowSelect(event: any) {
    const colis = event.data;
    this.toggleSelection(colis); 
  }

  onRowUnselect(event: any) {
    const colis = event.data;
    this.selectedColisForDeletion.delete(colis); 
    console.log("Row Unselected: ", colis);
  }
}
