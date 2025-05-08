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

@Component({
    selector: 'app-courrier-ordinaire',
    templateUrl: './courrier-ordinaire.component.html',
    styleUrl: './courrier-ordinaire.component.scss',
    providers: [MessageService],
})
export class CourrierOrdinaireComponent implements OnInit {
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
    valeurTimbre: number = 0;
    fraisRecommande: number = 0;
    fraisAr: number = 0;
    fraisExpress: number = 0;
    fraisVd: number = 0;
    regime$: RegimeDto[];
    categorie$: CategorieDto[];
    structure$: StructureDto[];
    stocksTimbre$: StockDto[];
    mode$: ModePaiementDto[];
    clientDialog: boolean;
    loading: boolean;
    client: ClientDto = {};
    destinataire: ClientDto = {};
    destinataireDialog: boolean;
    selectedQuantite: number;
    numberOfItems: any;
    selectedTimbre: any;
    label: string = 'RR';
    filteredCountries: Paysdto[];

    constructor(
        private router: Router,
        private clientService: ClientService,
        private regimeService: RegimeService,
        private paysService: PaysService,
        private categorieService: CategorieService,
        private sessionService: SessionService,
        private courrierService: CourrierService,
        private tarifService: TarifServiceService,
        private taxeCourrierService: TarifCourrierService,
        private stocksService: StockService,
        private fb: FormBuilder,
        private modePaiementService: ModePaiementService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.paysService.findAll().subscribe((result) => {
            this.pays$ = result.filter((pays) => pays.active); // Filtrer uniquement les pays actifs
        });


        this.regimeService.findAll().subscribe((result) => {
            this.regime$ = result;
        });

        this.modePaiementService.findAll().subscribe((result) => {
            this.mode$ = result;
        });

        this.stocksService
            .getStocksByCaisseFigurine(
                this.sessionService.getAgentAttributes().caisseId)
            .subscribe((result) => {
                //  this.stocksTimbre$ = result;
                this.stocksTimbre$ = result.map((stock) => ({
                    ...stock,
                    combinedLibelle: `${stock.produitLibelle} ${
                        stock.produitThemeLibelle
                    }  ${`(${stock.quantite})`}`,
                }));
            });

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
        this.form
            .get('ar')
            ?.valueChanges.subscribe(() => this.calculateTariff());
        this.form
            .get('express')
            ?.valueChanges.subscribe(() => this.calculateTariff());
        // this.formClient.get('telephone')?.valueChanges.subscribe(() => this.searchClient());
        this.form
            .get('poids')
            ?.valueChanges.subscribe((value) => this.poidsChange(value));
        this.form
            .get('paysDestinationId')
            ?.valueChanges.subscribe((value) => this.paysChange(value));
        this.getCatgories(this.form.get('regimeId').value);
        //this.choixRegime();
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
                regimeId: ['', Validators.required],
                poids: ['', Validators.required],
                expediteurId: ['', Validators.required],
                destinataireId: ['', Validators.required],
                paysDestinationId: [210, Validators.required],
                codeBarre: [
                    { value: '', disabled: true },
                    [
                      Validators.required,
                      Validators.minLength(9),
                      Validators.maxLength(9),
                      Validators.pattern(/^\d{9}$/),
                    ],
                  ],
                  valeurDeclare: [{ value: '', disabled: true }],
                contenu: [''],
                timbreId: [''],
                typeId: ['1'],
                quantite: ['1'],
                categorieId: ['', Validators.required],
                typeCourrierId: ['1'],
                recommande: [{ value: false, disabled: true }],
                ar: [{ value: false, disabled: true }],
                express: [{ value: false, disabled: true }],
                statutCourrierId: ['1'],
                paysOrigineId: [210],
                caisseId: [
                    this.sessionService.getAgentAttributes()?.caisseId,
                    Validators.required,
                ],
                structureDepotId: [
                    this.sessionService.getAgentAttributes()?.structureId,
                    Validators.required,
                ],
                 journalId: [
                    this.sessionService.getJournalAttributes()?.id,
                    Validators.required,
                ],
                totalMontant: [0],
                valeurTimbre: [0],
            },

            { validators: this.validateMontant }
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
                    this.client = {};
                    this.formClient.reset();
                    this.formClient.patchValue({
                        telephone: keyword,
                    });

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
                        destinataireId: this.destinataire?.id,
                    });
                    this.loading = false;
                    this.buildFormDestinataire();
                    this.destinataireDialog = true;
                },
                (error: HttpErrorResponse) => {
                    this.loading = false;
                    this.destinataire = {};
                    this.formDestinataire.reset();
                    this.formDestinataire.patchValue({
                        telephone: keyword,
                    });
                    //this.buildFormClient();
                    this.destinataireDialog = true;
                }
            );
        }
    }
    calculateTariff() {
        const regimeId = this.form.get('regimeId')?.value;
        const isRecommande = this.form.get('recommande')?.value;
        const isAr = this.form.get('ar')?.value;
        const isExpress = this.form.get('express')?.value;

        if (regimeId) {
            const selectedRegime = this.regime$.find(
                (regime) => regime.id === regimeId
            );
            if (selectedRegime) {
                let totalTax = 0;
                this.fraisAr = 0;
                this.fraisExpress = 0;

                // Ajouter les frais pour les services sélectionnés
                if (isRecommande) {
                    const recommandeTarif = selectedRegime.tarifs.find(
                        (tarif) => tarif.serviceLibelle === 'Recommander'
                    );
                    if (recommandeTarif) {
                        this.fraisRecommande = recommandeTarif.taxe;
                        totalTax += recommandeTarif.taxe;
                    }
                }
                if (isAr) {
                    const arTarif = selectedRegime.tarifs.find(
                        (tarif) => tarif.serviceLibelle === 'Accusé Réception'
                    );
                    if (arTarif) {
                        this.fraisAr = arTarif.taxe;
                        totalTax += arTarif.taxe;
                    }
                }
                if (isExpress) {
                    const expressTarif = selectedRegime.tarifs.find(
                        (tarif) => tarif.serviceLibelle === 'Express'
                    );
                    if (expressTarif) {
                        this.fraisExpress = expressTarif.taxe;
                        totalTax += expressTarif.taxe;
                    }
                }

                // Ajouter les frais de valeur déclarée
                totalTax += this.fraisVd;

                // Calculer le montant total
                this.totalMontant = totalTax + this.montant;
                this.form.get('totalMontant')?.setValue(this.totalMontant);
            }
        }
    }

    choixRegime() {
        const regimeId = this.form.get('regimeId')?.value;

        if (regimeId === 1) {
            this.form.get('paysDestinationId')?.setValue(210);
            this.form.get('paysDestinationId')?.disable();
        } else {
            this.form.get('paysDestinationId')?.enable();
            this.form.get('paysDestinationId')?.reset();

            // Supprimer le pays avec l'ID 210 si le régime est 2
            if (regimeId === 2) {
                this.filteredCountries = this.pays$.filter(
                    (country) => country.id !== 210
                );
            } else {
                this.filteredCountries = this.pays$;
            }
        }
        this.form.updateValueAndValidity();
        this.getCatgories(regimeId);
    }

    getCatgories(regimeId: number) {
        const serviceId = this.form.get("typeId").value
        console.log(serviceId)
        this.categorieService
            .getAllByRegimeAndType(regimeId, 1, serviceId)
            .subscribe((result) => {
                this.categorie$ = result;
                this.categorie$ = this.categorie$.filter(c => c.entrant == false)
            });
    }
    updateServiceState(typeId: string) {
        const formControls = this.form.controls;



        // Désactivation par défaut des champs
        formControls['recommande'].disable();
        formControls['ar'].disable();
        formControls['express'].disable();
        formControls['valeurDeclare'].disable();
        formControls['codeBarre'].disable();

        // Suppression des validations par défaut
        formControls['valeurDeclare'].setValidators(null);
        formControls['codeBarre'].setValidators(null);

        switch (typeId) {
            case '1':
                formControls['recommande'].setValue(false);
                formControls['ar'].setValue(false);
                formControls['express'].setValue(false);
                formControls['valeurDeclare'].setValue('0');
                this.fraisAr = 0;
                this.fraisExpress = 0;
                this.fraisRecommande = 0;
                this.totalMontant = this.montant;
                this.label = 'RR';
                break;

            case '2':
                formControls['recommande'].setValue(true);
                formControls['ar'].enable();
                formControls['ar'].setValue(false);
                formControls['express'].enable();
                formControls['express'].setValue(false);
                formControls['codeBarre'].enable();
                formControls['codeBarre'].setValidators(Validators.required);
                this.fraisAr = 0;
                this.fraisExpress = 0;
                this.label ='RR';

                break;

            case '3':
                formControls['recommande'].setValue(true);
                formControls['ar'].setValue(false);
                formControls['ar'].enable();
                formControls['express'].setValue(false);
                formControls['express'].enable();
                formControls['valeurDeclare'].enable();
                formControls['valeurDeclare'].setValidators(
                    Validators.required
                );
                formControls['codeBarre'].enable();
                formControls['codeBarre'].setValidators(Validators.required);
                this.fraisAr = 0;
                this.fraisExpress = 0;
                this.label = 'VV';
                break;

            default:
                break;
        }

        // Mise à jour de la validation pour appliquer les changements
        formControls['valeurDeclare'].updateValueAndValidity();
        formControls['codeBarre'].updateValueAndValidity();
        formControls['recommande'].updateValueAndValidity();
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
        const poidsMax = pays.zonePoidsMax;
       /*  if (poidsMax !== undefined && value > poidsMax) {
            this.messageService.add({
                severity: 'error',
                summary: 'Poids invalide',
                detail: `Le poids ne doit pas dépasser ${poidsMax} kg.`,
            });
            this.totalMontant = 0;
        return;
        } */

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
        this.form.get('recommande')?.enable();
        this.form.get('paysDestinationId')?.enable();
        this.form.value.userId = this.sessionService.getAgentAttributes().id;
        this.form.value.montant = this.totalMontant;
        this.form.value.details = this.courrier.details;

        if (this.form.get('recommande')?.value)
            this.form.value.codeBarre =
                this.label + this.form.get('codeBarre')?.value + 'SN';

        this.loading = true;
        console.log(this.form.value)
        this.courrierService.save(this.form.value).subscribe(
            (result) => {
                this.courrier = result;
                this.loading = false;
                this.router.navigateByUrl(
                    '/guichet/courrier-details/' + this.courrier.id
                );
            },
            (error) => {
                this.loading = false;
                if (error.status === 409) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Code Barre',
                        detail: 'Le code-barres est déjà utilisé par un autre courrier.',
                        life: 8000,
                    });
                } else if (error.status === 500) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erreur serveur',
                        detail: 'Erreur lors de l’enregistrement.',
                        life: 3000,
                    });
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erreur',
                        detail: 'Une erreur inconnue est survenue.',
                        life: 3000,
                    });
                }

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

    //Panier Timbre
    updateMetrics() {
        this.numberOfItems = this.courrier.details.length;
        this.valeurTimbre = this.courrier.details.reduce(
            (sum, detail) => sum + (detail.quantite || 0) * (detail.prix || 0),
            0
        );
        this.form.get('valeurTimbre')?.setValue(this.valeurTimbre);
        this.form.updateValueAndValidity();
    }

    getTarifProduit() {}

    onQuantiteChange(event: any): void {
        this.checkAndAddProduct();
    }

    checkAndAddProduct(): void {
        if (this.selectedTimbre && this.selectedQuantite > 0) {
            this.ajouterProduit();
        }
    }

    ajouterProduit(): void {
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
    }
}
