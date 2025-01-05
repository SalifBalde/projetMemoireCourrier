// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { MessageService, ConfirmationService, PrimeIcons } from 'primeng/api';
// import { ColisDto, ColisService } from 'src/app/proxy/colis';
// import { Router } from '@angular/router';
// import { SessionService } from 'src/app/proxy/auth/Session.service';
// import { ModePaiementDto } from 'src/app/proxy/mode-paiements/models';
// import { ModePaiementService } from 'src/app/proxy/mode-paiements';

// @Component({
//     selector: 'app-livraison-ecom',
//     templateUrl: './livraison-ecom.component.html',
//     providers: [ConfirmationService],


//   })
//   export class LivraisonEcomComponent implements OnInit {
//   form: FormGroup;
//   montant = 0;
//   colis$: ColisDto[] = [];
//   loadingColis: boolean = false;
//   selectedColis: ColisDto | null = null;
//   displayDialog: boolean = false;
//   montantTotal: number = 0;
//   payer: boolean = false;
//   isModalOpen = false;
//   mode$: ModePaiementDto[] = [];
//   selectedColisForDeletion: Set<ColisDto> = new Set();
//   selectedModePaiement: ModePaiementDto | null = null;
//   allSelected: boolean = false;
//   events1: any[] = [];

//   constructor(
//     private colisService: ColisService,
//     private fb: FormBuilder,
//     private sessionService: SessionService,
//     private router: Router,
//     private messageService: MessageService,
//     private confirmationService: ConfirmationService,
//     private modePaiementService: ModePaiementService
//   ) { }

//   ngOnInit(): void {
//     this.buildForm();
//     this.getAllColis();

//     this.modePaiementService.findAll().subscribe(
//       (result) => {
//         this.mode$ = result;
//       },
//       (error) => {
//         console.error('Erreur lors du chargement des modes de paiement', error);
//       }
//     );
//   }

//   buildForm() {
//     this.form = this.fb.group({
//       dateDebut: [undefined, Validators.required],
//       dateFin: [undefined, Validators.required],
//       modePaiement: [undefined, Validators.required],
//     });
//   }





//   voirColis(colis: ColisDto) {
//     this.selectedColis = colis;
//     this.calculerMontantTotal();
//     this.payer = colis.payer;
//     this.displayDialog = true;
//   }

//   private calculerMontantTotal() {
//     if (this.selectedColis) {
//       const fraisEnlevement = Number(this.selectedColis.fraisEnlevement) || 0;
//       const fraisLivraison = Number(this.selectedColis.fraisLivraison) || 0;
//       const montant = Number(this.selectedColis.montant) || 0;
//       this.montantTotal = fraisEnlevement + fraisLivraison + montant;

//     }
//   }

// //   livrer() {
// //     if (!this.selectedColis) {
// //       this.messageService.add({
// //         severity: 'warn',
// //         summary: 'Avertissement',
// //         detail: 'Aucun colis sélectionné pour la livraison.',
// //       });
// //       return;
// //     }


// //     if (!this.selectedColis.payer && !this.selectedModePaiement) {
// //       this.messageService.add({
// //         severity: 'warn',
// //         summary: 'Avertissement',
// //         detail: 'Veuillez sélectionner un mode de paiement.',
// //       });
// //       return;
// //     }


// //     if (!this.selectedColis.payer) {
// //       this.selectedColis.payer = true;
// //     }

// //     const modePaiementId = this.selectedModePaiement ? this.selectedModePaiement.id : '';

// //     this.colisService.livrer(this.selectedColis.id.toString(), this.selectedColis, modePaiementId).subscribe(
// //       (result: ColisDto) => {
// //         this.displayDialog = false;
// //         this.messageService.add({
// //           severity: 'success',
// //           summary: 'Succès',
// //           detail: 'Le colis a été livré avec succès.',
// //         });

// //         this.getAllColis();

// //         setTimeout(() => {
// //           if (result && result.id) {
// //             this.router.navigateByUrl('/guichet/LivraisonDetails/' + result.id);
// //           }
// //         }, 500);
// //       },
// //       (error) => {
// //         console.error('Erreur lors de la mise à jour du colis', error);
// //         this.messageService.add({
// //           severity: 'error',
// //           summary: 'Erreur',
// //           detail: 'Une erreur est survenue lors de la mise à jour du colis.',
// //         });
// //       }
// //     );
// //   }


//   toggleSelection(colis: ColisDto) {
//     if (this.selectedColisForDeletion.has(colis)) {
//       this.selectedColisForDeletion.delete(colis);
//     } else {
//       this.selectedColisForDeletion.add(colis);
//     }
//     this.allSelected = this.selectedColisForDeletion.size === this.colis$.length;
//   }

//   selectAll(event: any): void {
//     if (event.checked) {
//       this.colis$.forEach(colis => this.selectedColisForDeletion.add(colis));
//     } else {
//       this.selectedColisForDeletion.clear();
//     }
//     this.allSelected = event.checked;
//   }

//   onRowSelect(event: any) {
//     const colis = event.data;
//     this.selectedColisForDeletion.add(colis);
//     console.log("Row Selected:", colis);
//     this.allSelected = this.selectedColisForDeletion.size === this.colis$.length;
//   }

//   onRowUnselect(event: any) {
//     const colis = event.data;
//     this.selectedColisForDeletion.delete(colis);
//     console.log("Row Unselected:", colis);
//     this.allSelected = this.selectedColisForDeletion.size === this.colis$.length;
//   }
// }
