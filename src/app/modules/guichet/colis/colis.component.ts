import { Component, OnInit } from '@angular/core';
import { ClientDto, ClientService } from 'src/app/proxy/client';
import { Params, Router, ActivatedRoute } from '@angular/router';
import {
    ModePaiementDto,
    ModePaiementService,
} from 'src/app/proxy/mode-paiements';
import { MessageService } from 'primeng/api';
import { StructureDto, StructureService } from 'src/app/proxy/structures';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ValidationErrors,
    Validators,
} from '@angular/forms';
import { SessionService } from 'src/app/proxy/auth/Session.service';
import { Paysdto, PaysService } from 'src/app/proxy/pays';
import { RegimeDto, RegimeService } from 'src/app/proxy/regime';
import { CategorieDto, CategorieService } from 'src/app/proxy/categorie';
import { TarifCourrierService } from 'src/app/proxy/tarif-courrier';
import { TarifServiceService } from 'src/app/proxy/TarifService';
import { HttpErrorResponse } from '@angular/common/http';
import {
    CourrierCreateUpdateDto,
    CourrierService,
} from 'src/app/proxy/courrier';
import { StockDto, StockService } from 'src/app/proxy/stock';
import { TarifColisService } from 'src/app/proxy/tarif-colis';

@Component({
    selector: 'app-colis',
    templateUrl: './colis.component.html',
    styleUrl: './colis.component.scss',
    providers: [MessageService],
})
export class ColisComponent implements OnInit {
    form: FormGroup;
    formClient: FormGroup;
    formDestinataire: FormGroup;
    montant = 0;
    pays$: Paysdto[];

    clients: ClientDto[] = [];
    courrier: CourrierCreateUpdateDto = new CourrierCreateUpdateDto();
    modesPaiement: any;
    totalMontant: number = 0;
    taxe: number = 0;
    // valeurTimbre: number = 0;
    fraisRecommande: number = 0;
    fraisAr: number = 0;
    fraisExpress: number = 0;
    fraisVd: number = 0;
    regime$: RegimeDto[];
    categorie$: CategorieDto[];
    structure$: StructureDto[];
    // stocksTimbre$: StockDto[];
    mode$: ModePaiementDto[];
    clientDialog: boolean;
    loading: boolean;
    client: ClientDto = {};
    destinataire: ClientDto = {};
    destinataireDialog: boolean;
    selectedQuantite: number;
    numberOfItems: any;
    // selectedTimbre: any;
    label: string = 'CP';
    contenu: Array<any> = [];

    constructor(
        private router: Router,
        private clientService: ClientService,
        private regimeService: RegimeService,
        private paysService: PaysService,
        private categorieService: CategorieService,
        private sessionService: SessionService,
        private courrierService: CourrierService,
        private tarifService: TarifServiceService,
        private taxeCourrierService: TarifColisService,
        private stocksService: StockService,
        private fb: FormBuilder,
        private modePaiementService: ModePaiementService,
        private messageService: MessageService
    ) { }

    ngOnInit(): void {
        this.paysService.findAll().subscribe((result) => {
            this.pays$ = result;
        });

        this.regimeService.findAll().subscribe((result) => {
            this.regime$ = result;
        });

        this.modePaiementService.findAll().subscribe((result) => {
            this.mode$ = result;
        });

        // this.stocksService
        //     .getStocksByCaisseIdAndTypeProduit(
        //         this.sessionService.getAgentAttributes().structureId,
        //         '2'
        //     )
        //     .subscribe((result) => {
        //         //  this.stocksTimbre$ = result;
        //         this.stocksTimbre$ = result.map((stock) => ({
        //             ...stock,
        //             combinedLibelle: `${stock.produitLibelle} ${
        //                 stock.produitThemeLibelle
        //             }  ${`(${stock.quantite})`}`,
        //         }));
        //     });

        this.buildForm();
        this.buildFormClient();
        this.buildFormDestinataire();

        this.form.get('typeId')?.valueChanges.subscribe((typeId) => {
            this.updateServiceState(typeId);
        });

        this.form
            .get('regimeId')
            ?.valueChanges.subscribe(() => this.calculateTariff());
        this.form
            .get('recommande')
            ?.valueChanges.subscribe(() => this.calculateTariff());
        //this.form.get('ar')?.valueChanges.subscribe(() => this.calculateTariff());
        //this.form.get('express')?.valueChanges.subscribe(() => this.calculateTariff());
        // this.formClient.get('telephone')?.valueChanges.subscribe(() => this.searchClient());
        this.form
            .get('poids')
            ?.valueChanges.subscribe((value) => this.poidsChange(value));
        this.form
            .get('paysDestinationId')
            ?.valueChanges.subscribe((value) => this.paysChange(value));
        this.getCatgories(this.form.get('regimeId').value);
        this.form.get('paysDestinationId')?.disable();
    }

    validateMontant(form: AbstractControl): ValidationErrors | null {
        const totalMontant = form.get('totalMontant')?.value || 0;
        const valeurTimbre = form.get('valeurTimbre')?.value || 0;

        return totalMontant === valeurTimbre ? null : { montantMismatch: true };
    }

    getAllDestinataire() {
        const paysId = this.form.get('paysDestinationId').value;
        this.courrierService
            .getAllDestinataires(this.client.id, paysId)
            .subscribe((result) => {
                this.clients = result;
            });
    }

    choisirDestinataire(client: ClientDto) {
        this.destinataire = client;
        this.destinataireDialog = false;
        this.form.patchValue({
            destinataireId: client.id,
        });

    }
    buildForm() {
        this.form = this.fb.group(
            {
                modePaiementId: ['', Validators.required],
                regimeId: [1, Validators.required],
                poids: ['', Validators.required],
                expediteurId: ['', Validators.required],
                destinataireId: ['', Validators.required],
                paysDestinationId: [210, Validators.required],
                codeBarre: [
                    { value: '', disabled: false },
                    Validators.required,
                ],
                valeurDeclare: [{ value: '', disabled: true }],
                contenu: [''],
                quantite: [0],
                valeur: [''],
                poidsNet: [''],
                timbreId: [''],
                typeId: ['1'],
                categorieId: ['', Validators.required],
                typeCourrierId: ['2'],
                recommande: [{ value: true }],
                //ar: [{ value: false, disabled: true }],
                //express: [{ value: false, disabled: true }],
                statutCourrierId: ['1'],
                paysOrigineId: [210],
                caisseId: [
                    this.sessionService.getAgentAttributes()?.caisseId,
                    Validators.required,
                ],
                journalId: [
                    this.sessionService.getJournalAttributes()?.id,
                    Validators.required,
                ],

                structureDepotId: [
                    this.sessionService.getAgentAttributes().structureId,
                    Validators.required,
                ],
                totalMontant: [0],
                //  valeurTimbre: [0],

            },

            //  { validators: this.validateMontant }
        );

        const journalId = this.form.get('journalId')?.value;
        if (!journalId) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Avertissement',
                detail: 'Vous n\'avez pas de caisse. Demandez à votre supérieur de vous attribuer une caisse.'
            });
        }
    }

    buildFormClient() {
        this.formClient = this.fb.group({
            nom: [this.client.nom || '', Validators.required],
            prenom: [this.client.prenom || '', Validators.required],
            adresse: [this.client.adresse || '', Validators.required],
            codePostal: [this.client.codePostal || '', Validators.required],
            telephone: [this.client.telephone || '', Validators.required],
            email: [this.client.email],
        });
    }

    buildFormDestinataire() {
        this.formDestinataire = this.fb.group({
            nom: [this.destinataire.nom || '', Validators.required],
            prenom: [this.destinataire.prenom || '', Validators.required],
            adresse: [this.destinataire.adresse || '', Validators.required],
            codePostal: [
                this.destinataire.codePostal || '',
                Validators.required,
            ],
            telephone: [this.destinataire.telephone || '', Validators.required],
            email: [this.destinataire.email],
        });
    }

    openClient() {
        this.clientDialog = true;
    }

    openDestinataire() {
        this.destinataireDialog = true;
        this.getAllDestinataire();
    }

    searchClient(): void {
        const keyword = this.formClient.get('telephone').value;

        if (keyword?.length > 8) {
            this.loading = true;
            this.client = {};
            this.clientService.searchClient(keyword).subscribe(
                (client) => {
                    this.client = { ...client };
                    this.form.patchValue({
                        expediteurId: this.client?.id || '',
                    });
                    this.loading = false;
                    this.buildFormClient();
                    this.clientDialog = true;
                },
                (error: HttpErrorResponse) => {
                    this.loading = false;
                    //this.buildFormClient();
                    this.clientDialog = true;
                }
            );
        }
    }

    calculateTaxVd() {
        const taxeParDefaut = 1500;
        const taxeSupplementaire = 250;
        const valeurDeclaree = this.form.get('valeurDeclare')?.value || 0;

        // Calcul des tranches
        const tranches = Math.ceil(valeurDeclaree / 10000);

        // Calcul du total des taxes
        const taxeTotale = tranches * taxeSupplementaire;

        // Appliquer la logique de taxe minimale
        this.fraisVd = taxeTotale > taxeParDefaut ? taxeTotale : taxeParDefaut;

        // Mettre à jour le montant total
        this.calculateTariff();
    }

    searchDestinataire(): void {
        const keyword = this.formDestinataire.get('telephone').value;

        if (keyword?.length > 8) {
            this.loading = true;
            this.destinataire = {};
            this.clientService.searchClient(keyword).subscribe(
                (client) => {
                    this.destinataire = { ...client };
                    this.form.patchValue({
                        destinataireId: this.destinataire?.id || '',
                    });
                    this.loading = false;
                    this.buildFormDestinataire();
                    this.destinataireDialog = true;
                },
                (error: HttpErrorResponse) => {
                    this.loading = false;
                    //this.buildFormClient();
                    this.destinataireDialog = true;
                }
            );
        } else {
            this.destinataire = null;
        }
    }

    calculateTariff() {
        this.totalMontant = this.montant + this.fraisVd;
        this.form.get('totalMontant')?.setValue(this.totalMontant);

    }

    choixRegime() {
        const regimeId = this.form.get('regimeId')?.value;

        if (regimeId === 1) {
            this.form.get('paysDestinationId')?.disable(); // Désactiver pour tout autre régime
            this.form.get('paysDestinationId')?.setValue(210);
        } else {
            this.form.get('paysDestinationId')?.enable(); // Activer si regimeId = 1
            this.form.get('paysDestinationId')?.reset(); // Réinitialiser la valeur de paysDestinationId si désactivé
        }
        this.form.updateValueAndValidity();

        this.getCatgories(regimeId);
    }

    getCatgories(regimeId: number) {
        const serviceId = this.form.get("typeId").value
        this.categorieService
            .getAllByRegimeAndType(regimeId, 2, serviceId)
            .subscribe((result) => {
                this.categorie$ = result;
                this.categorie$ = this.categorie$.filter(c => c.entrant === false)

            });
    }
    updateServiceState(typeId: string) {
        const formControls = this.form.controls;

        // Désactivation par défaut des champs
        formControls['recommande'].disable();
        // formControls['ar'].disable();
        // formControls['express'].disable();
        formControls['valeurDeclare'].disable();
        formControls['codeBarre'].disable();

        // Suppression des validations par défaut
        formControls['valeurDeclare'].setValidators(null);
        formControls['codeBarre'].setValidators(null);

        switch (typeId) {
            case '1':
                formControls['recommande'].setValue(true);
                /*  formControls['ar'].enable();
            formControls['ar'].setValue(false);
            formControls['express'].enable();
            formControls['express'].setValue(false); */
                formControls['codeBarre'].enable();
                formControls['codeBarre'].setValidators(Validators.required);
                this.fraisAr = 0;
                this.fraisExpress = 0;
                this.label = 'CP';
                break;

            case '3':
                formControls['recommande'].setValue(true);
                // formControls['ar'].setValue(true);
                // formControls['express'].setValue(true);
                formControls['valeurDeclare'].enable();
                formControls['valeurDeclare'].setValidators(
                    Validators.required
                );
                formControls['codeBarre'].enable();
                formControls['codeBarre'].setValidators(Validators.required);
                this.label = 'CV';
                break;

            default:
                break;
        }

        // Mise à jour de la validation pour appliquer les changements
        formControls['valeurDeclare'].updateValueAndValidity();
        formControls['codeBarre'].updateValueAndValidity();
    }

    paysChange(value: number) {
        const poids = this.form.get('poids')?.value;

        if (value > 0 && poids > 0) {
            this.taxeCourrierService
                .getTarif(value, poids)
                .subscribe((result) => {
                    this.montant = result;
                    // Mise à jour du montant total en incluant les frais recommandés
                    this.totalMontant = +this.montant + this.fraisRecommande;

                    // Appel de calculateTariff pour prendre en compte tous les frais supplémentaires
                    this.calculateTariff();

                    // Mise à jour du champ totalMontant dans le formulaire
                    this.form.get('totalMontant')?.setValue(this.totalMontant);
                });
        } else {
            // Si le poids ou le pays de destination ne sont pas valides
            this.montant = 0;
            this.totalMontant = this.montant; // Reset du montant total
        }
        this.form.updateValueAndValidity();
    }
    poidsChange(value: number) {
        const paysDestinationId = this.form.get('paysDestinationId')?.value;

        const pays = this.pays$.find(p => p.id === paysDestinationId);
        const poidsMax = pays.maxKgAutorise;
        if (poidsMax !== undefined && value > poidsMax) {
            this.messageService.add({
                severity: 'error',
                summary: 'Poids invalide',
                detail: `Le poids ne doit pas dépasser ${poidsMax} kg.`,
            });
            this.totalMontant = 0;
            return;
        }
        // Si le poids et le pays de destination sont valides
        if (value > 0 && paysDestinationId > 0) {
            // Appel du service pour obtenir le tarif
            this.taxeCourrierService
                .getTarif(paysDestinationId, value)
                .subscribe((result) => {
                    this.montant = result; // Mise à jour du montant

                    // Mise à jour du montant total en incluant les frais recommandés
                    this.totalMontant = +this.montant + this.fraisRecommande;

                    // Appel de calculateTariff pour prendre en compte tous les frais supplémentaires
                    this.calculateTariff();

                    // Mise à jour du champ totalMontant dans le formulaire
                    this.form.get('totalMontant')?.setValue(this.totalMontant);
                });
        } else {
            // Si le poids ou le pays de destination ne sont pas valides
            this.montant = 0;
            this.totalMontant = this.montant; // Reset du montant total
        }

        // Toujours mettre à jour la validité du formulaire après chaque changement
        this.form.updateValueAndValidity();
    }

    saveColis() {
        if (this.form.invalid) {
            return;
        }

        this.form.get('paysDestinationId')?.enable();
        this.form.value.userId = this.sessionService.getAgentAttributes().id;
        this.form.value.montant = this.totalMontant;
        this.form.value.recommande = true;
        this.form.value.details = this.courrier.details;
        if (this.form.get('codeBarre')?.value)
            this.form.value.codeBarre = this.label + this.form.get('codeBarre')?.value + 'SN';

        this.loading = true;
        this.courrierService.save(this.form.value).subscribe(
            (result) => {
                this.courrier = result;
                this.loading = false;
                this.router.navigateByUrl(
                    '/guichet/courrier-details/' + this.courrier.id
                );
            },
            (error) => {
                this.messageService.add({
                    severity: 'danger',
                    summary: 'Error',
                    detail: 'Erreur enregistrement',
                    life: 3000,
                });
                this.loading = false;
            }
        );
    }

    hideDialog() {
        this.clientDialog = false;
        this.destinataireDialog = false;
    }

    saveClient() {
        if (this.formClient.invalid) {
            return;
        }

        if (this.client.id) {
            this.formClient.value.id = this.client.id;
            this.clientService
                .update(this.client.id, this.formClient.value)
                .subscribe(
                    (result) => {
                        this.client = result;
                        this.form.patchValue({
                            expediteurId: this.client?.id || '',
                        });
                        this.clientDialog = false;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Client Updated',
                            life: 3000,
                        });

                        // this.client = {};
                    },
                    (error) => {
                        this.messageService.add({
                            severity: 'danger',
                            summary: 'Error',
                            detail: 'Erreur Modification',
                            life: 3000,
                        });
                        this.clientDialog = true;
                    }
                );
        } else {
            this.clientService.save(this.formClient.value).subscribe(
                (result) => {
                    this.client = result;
                    this.form.patchValue({
                        expediteurId: this.client?.id || '',
                    });
                    this.loading = false;
                    this.clientDialog = false;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Client Created',
                        life: 3000,
                    });

                    //    this.client = {};
                },
                (error) => {
                    this.messageService.add({
                        severity: 'danger',
                        summary: 'Error',
                        detail: 'Erreur enregistrement',
                        life: 3000,
                    });
                    this.clientDialog = true;
                }
            );
        }
    }

    saveDestinataire() {
        if (this.formDestinataire.invalid) {
            return;
        }

        if (this.destinataire.id) {
            this.formDestinataire.value.id = this.destinataire.id;
            this.clientService
                .update(this.destinataire.id, this.formDestinataire.value)
                .subscribe(
                    (result) => {
                        this.destinataireDialog = false;
                        this.destinataire = { ...result };
                        this.form.patchValue({
                            destinataireId: this.destinataire?.id || '',
                        });
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Client Updated',
                            life: 3000,
                        });

                        // this.client = {};
                    },
                    (error) => {
                        this.messageService.add({
                            severity: 'danger',
                            summary: 'Error',
                            detail: 'Erreur Modification',
                            life: 3000,
                        });
                        this.destinataireDialog = true;
                    }
                );
        } else {
            this.clientService.save(this.formDestinataire.value).subscribe(
                (result) => {
                    this.destinataire = result;
                    this.loading = false;
                    this.destinataireDialog = false;
                    this.form.patchValue({
                        destinataireId: this.destinataire?.id || '',
                    });
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Client Created',
                        life: 3000,
                    });

                    //    this.client = {};
                },
                (error) => {
                    this.messageService.add({
                        severity: 'danger',
                        summary: 'Error',
                        detail: 'Erreur enregistrement',
                        life: 3000,
                    });
                    this.destinataireDialog = true;
                }
            );
        }
    }

    addDetail() {
        const contenu = this.form.value; // Récupérer les données du formulaire
        this.contenu.push(contenu); // Ajouter l'élément au tableau
        this.form.reset(); // Réinitialiser le formulaire
      }

      // Méthode pour supprimer un élément
      removeDetail(index: number) {
        this.contenu.splice(index, 1); // Supprimer l'élément du tableau
      }

      // Méthodes pour modifier la quantité
      incrementQuantity(index: number) {
        this.contenu[index].quantite++;
      }

      decrementQuantity(index: number) {
        if (this.contenu[index].quantite > 0) {
          this.contenu[index].quantite--;
        }
      }
    //Panier Timbre
    // updateMetrics() {
    //     this.numberOfItems = this.courrier.details.length;
    //     this.valeurTimbre = this.courrier.details.reduce(
    //         (sum, detail) => sum + (detail.quantite || 0) * (detail.prix || 0),
    //         0
    //     );
    //     this.form.get('valeurTimbre')?.setValue(this.valeurTimbre);
    //     this.form.updateValueAndValidity();
    // }

    getTarifProduit() { }

    // onQuantiteChange(event: any): void {
    //     this.checkAndAddProduct();
    // }

    // checkAndAddProduct(): void {
    //     if (this.selectedTimbre && this.selectedQuantite > 0) {
    //         this.ajouterProduit();
    //     }
    // }

    /*  ajouterProduit(): void {
         const quantite = this.form.value.quantite;
         const timbreId = this.form.value.timbreId;
         this.selectedTimbre = this.stocksTimbre$.find((p) => p.id === timbreId);

         if (quantite > this.selectedTimbre.quantite) {
             console.error('Quantité saisie supérieure au stock disponible.');
             return;
         }
         if (quantite > 0) {
             this.courrier.details.push({
                 produitId: this.selectedTimbre.id,
                 produitLibelle: this.selectedTimbre.combinedLibelle,
                 quantite: quantite,
                 prix: this.selectedTimbre.produitPrix,
             });
             this.updateMetrics();
             this.resetSelection();
         }
     }
     removeDetail(index: number) {
         this.courrier.details.splice(index, 1);
         this.updateMetrics();
     }

     incrementQuantity(index: number): void {
         if (this.courrier.details[index].quantite < 100) {
             this.courrier.details[index].quantite++;
             this.updateMetrics();
         }
     }

     decrementQuantity(index: number): void {
         if (this.courrier.details[index].quantite > 1) {
             this.courrier.details[index].quantite--;
             this.updateMetrics();
         }
     }

     resetSelection(): void {
         this.form.get('timbreId')?.reset();
         this.form.get('quantite')?.reset();
         this.selectedTimbre = null;
     } */
}
