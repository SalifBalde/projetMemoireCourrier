import { Component, OnInit } from '@angular/core';
import { ClientDto, ClientService } from 'src/app/proxy/client';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { ModePaiementDto, ModePaiementService } from 'src/app/proxy/mode-paiements';
import { MessageService } from 'primeng/api';
import { StructureDto, StructureService } from 'src/app/proxy/structures';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { SessionService } from 'src/app/proxy/auth/Session.service';
import { Paysdto, PaysService } from 'src/app/proxy/pays';
import { Regimedto, RegimeService } from 'src/app/proxy/regime';
import { CategorieDto, CategorieService } from 'src/app/proxy/categorie';
import { TarifCourrierService } from 'src/app/proxy/tarif-courrier';
import { TarifServiceService } from 'src/app/proxy/TarifService';
import { HttpErrorResponse } from '@angular/common/http';
import { CourrierCreateUpdateDto, CourrierService } from 'src/app/proxy/courrier';
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

    clients: ClientDto[] = [{
        id: "1", nom: "mamadou diokou", telephone: "773778825"
    }];
    courrier : CourrierCreateUpdateDto = new CourrierCreateUpdateDto();
    modesPaiement: any;
    totalMontant: number = 0;
    taxe: number = 0;
    valeurTimbre: number = 0;
    fraisRecommande: number = 0;
    fraisAr: number=0;
    fraisExpress: number = 0;
    fraisVd: number = 0;
    regime$: Regimedto[];
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


    constructor(
        private router: Router,
        private clientService: ClientService,
        private route: ActivatedRoute,
        private regimeService: RegimeService,
        private paysService :PaysService,
        private categorieService: CategorieService,
        private  sessionService: SessionService,
        private courrierService : CourrierService,
        private tarifService: TarifServiceService,
        private taxeCourrierService:TarifCourrierService,
        private stocksService: StockService,
        private fb: FormBuilder,
        private modePaiementService:ModePaiementService,
        private messageService : MessageService
    ) { }

    ngOnInit(): void {

        this.route.params.subscribe((params: Params) => {
            //this.id = params['id'];
          //  this.telephone = params['telephone'];
           // this.nom = params['nom'];
           // this.prenom = params['prenom'];
           // this.cni = params['cni'];
        });

        this.categorieService.findAll().subscribe((result) => {
            this.categorie$ = result;
        });

        this.paysService.findAll().subscribe(
            (result) => {
                this.pays$ = result;
            }
        );

        this.regimeService.findAll().subscribe(
            (result) => {
                this.regime$ = result;
            }
        );

        this.categorieService.findAll().subscribe(
            (result) => {
                this.categorie$ = result;
            }
        );

        this.modePaiementService.findAll().subscribe(
            (result) => {
                this.mode$ = result;
            }
        );

        this.stocksService.getStocksByCaisseIdAndTypeProduit(this.sessionService.getAgentAttributes().structureId,"2").subscribe(
            (result) => {
              //  this.stocksTimbre$ = result;
                this.stocksTimbre$ = result.map(stock => ({
                    ...stock,
                    combinedLibelle: `${stock.produitLibelle} ${stock.produitThemeLibelle}  ${`(${stock.quantite})`}`
                  }));
            }
        );


        this.buildForm();
        this.buildFormClient();
        this.buildFormDestinataire();

        this.form.get('typeId')?.valueChanges.subscribe((typeId) => {
            this.updateServiceState(typeId);
          });

    this.form.get('regimeId')?.valueChanges.subscribe(() => this.calculateTariff());
    this.form.get('recommande')?.valueChanges.subscribe(() => this.calculateTariff());
    this.form.get('ar')?.valueChanges.subscribe(() => this.calculateTariff());
    this.form.get('express')?.valueChanges.subscribe(() => this.calculateTariff());
   // this.formClient.get('telephone')?.valueChanges.subscribe(() => this.searchClient());
   this.form.get('poids')?.valueChanges.subscribe((value) => this.poidsChange(value));
   this.form.get('paysDestinationId')?.valueChanges.subscribe((value) => this.paysChange(value));


    }

    validateMontant(form: AbstractControl): ValidationErrors | null {
        const totalMontant = form.get('totalMontant')?.value || 0;
        const valeurTimbre = form.get('valeurTimbre')?.value || 0;

        return totalMontant === valeurTimbre ? null : { montantMismatch: true };
    }

    choisirDestinataire(client:ClientDto){
        this.destinataire = client;
    }
    buildForm() {
        this.form = this.fb.group({
             modePaiementId: [ '', Validators.required],
             regimeId: [ '', Validators.required],
             poids: [ '', Validators.required],
             expediteurId: [ '', Validators.required],
             destinataireId: [ '', Validators.required],
             paysDestinationId: [ '', Validators.required],
             codeBarre: [{ value: '', disabled: true }],
             valeurDeclare: [{ value: '', disabled: true }] ,
             contenu: [ ''],
             timbreId: [ ''],
             typeId: [ '1'],
             quantite: [ '1'],
             categorieId: [ ''],
             recommande: [{ value: false, disabled: true }],
             ar: [{ value: false, disabled: true }],
             express: [{ value: false, disabled: true }],
             statutCourrierId: ['1'],
             paysOrigineId: ['1'],
             caisseId: [this.sessionService.getAgentAttributes().caisseId],
             structureDepotId: [this.sessionService.getAgentAttributes().structureId],
             totalMontant: [0],
             valeurTimbre: [0],
        },

        { validators: this.validateMontant }
    );
    }

    buildFormClient() {
        this.formClient = this.fb.group({
            nom: [this.client.nom || '', Validators.required],
            prenom: [this.client.prenom || '', Validators.required],
            adresse: [this.client.adresse || '', Validators.required],
            cni: [this.client.cni || '', Validators.required],
            telephone: [this.client.telephone || '', Validators.required],
            email: [this.client.email],
        });
    }

    buildFormDestinataire() {
        this.formDestinataire = this.fb.group({
            nom: [this.destinataire.nom || '', Validators.required],
            prenom: [this.destinataire.prenom || '', Validators.required],
            adresse: [this.destinataire.adresse || '', Validators.required],
            cni: [this.destinataire.cni || '', Validators.required],
            telephone: [this.destinataire.telephone || '', Validators.required],
            email: [this.destinataire.email],
        });
    }

    openClient() {
        this.clientDialog = true;
    }

    openDestinataire() {
        this.destinataireDialog = true;
    }



     searchClient(): void {
        const keyword = this.formClient.get('telephone').value;

        if (keyword?.length > 3) {
            this.loading = true;
            this.client = {};
            this.clientService.searchClient(keyword).subscribe(
                (client) => {
                    this.client = { ...client };
                    this.form.patchValue({
                        expediteurId: this.client?.id || ''
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
        } else {
            this.client = null;
        }
    }

    calculateTaxVd() {
        const taxeParDefaut = 1500;
        const taxeSupplementaire = 250;
        const valeurDeclaree = this.form.get('valeurDeclare')?.value || 0;
        // Arrondir la valeur déclarée aux tranches de 10 000
        const tranches = Math.ceil(valeurDeclaree / 10000);
        const taxeTotale = taxeParDefaut + (tranches * taxeSupplementaire);
        this.fraisVd = taxeTotale;
     //   return taxeTotale;
      }

    searchDestinataire(): void {
        const keyword = this.formDestinataire.get('telephone').value;

        if (keyword?.length > 3) {
            this.loading = true;
            this.destinataire = {};
            this.clientService.searchClient(keyword).subscribe(
                (client) => {
                    this.destinataire = { ...client };
                    this.form.patchValue({
                        destinataireId: this.destinataire?.id || ''
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
        const regimeId = this.form.get('regimeId')?.value;
        const isRecommande = this.form.get('recommande')?.value;
        const isAr = this.form.get('ar')?.value;
        const isExpress = this.form.get('express')?.value;
        this.fraisAr = 0;
        this.fraisExpress = 0;
        this.fraisRecommande=0;

        if (regimeId) {
          const selectedRegime = this.regime$.find((regime) => regime.id === regimeId);
          if (selectedRegime) {
            let totalTax = 0;

            // Add tax for the selected services
            if (isRecommande) {
              const recommandeTarif = selectedRegime.tarifs.find((tarif) => tarif.serviceLibelle === "Recommander");
              if (recommandeTarif){
                this.fraisRecommande = recommandeTarif.taxe;
                totalTax += recommandeTarif.taxe;
              }
            }
            if (isAr) {
              const arTarif = selectedRegime.tarifs.find((tarif) => tarif.serviceLibelle === "Accusé Réception");
              if (arTarif) {
                this.fraisAr = arTarif.taxe;
                totalTax += arTarif.taxe;
              }
            }
            if (isExpress) {
              const expressTarif = selectedRegime.tarifs.find((tarif) => tarif.serviceLibelle === "Express");
              if (expressTarif){
                this.fraisExpress = expressTarif.taxe;
                totalTax += expressTarif.taxe;
              }
            }

            this.totalMontant = totalTax+this.montant;
            this.form.get('totalMontant')?.setValue(this.totalMontant);
          //  this.form.updateValueAndValidity();
          }
        }
      }

    choixRegime() {
        const regimeId = this.form.get('regimeId')?.value;

        if (regimeId === 1) {
          this.form.get('paysDestinationId')?.disable(); // Désactiver pour tout autre régime
          this.form.get('paysDestinationId')?.setValue(1);

        } else {

            this.form.get('paysDestinationId')?.enable(); // Activer si regimeId = 1
            this.form.get('paysDestinationId')?.reset(); // Réinitialiser la valeur de paysDestinationId si désactivé

        }
        this.form.updateValueAndValidity();
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
            break;

          case '2':
            formControls['recommande'].setValue(true);
            formControls['ar'].enable();
            formControls['ar'].setValue(false);
            formControls['express'].enable();
            formControls['express'].setValue(false);
            formControls['codeBarre'].enable();
            formControls['codeBarre'].setValidators(Validators.required);
            break;

          case '3':
            formControls['recommande'].setValue(true);
            formControls['ar'].setValue(true);
            formControls['express'].setValue(true);
            formControls['valeurDeclare'].enable();
            formControls['valeurDeclare'].setValidators(Validators.required);
            formControls['codeBarre'].enable();
            formControls['codeBarre'].setValidators(Validators.required);
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
          this.taxeCourrierService.getTarif(value, poids).subscribe((result) => {
            this.montant = result;
            this.totalMontant = +this.montant; // Met à jour le montant total
            this.form.get('totalMontant')?.setValue(this.totalMontant);
          });
        } else {
          this.montant = 0;
          this.totalMontant = +this.montant; ;
          this.form.get('totalMontant')?.setValue(this.totalMontant);
        }
        this.form.updateValueAndValidity();
      }

      poidsChange(value: number) {
        const paysDestinationId = this.form.get('paysDestinationId')?.value;

        if (value > 0 && paysDestinationId > 0) {
          this.taxeCourrierService.getTarif(paysDestinationId, value).subscribe((result) => {
            this.montant = result;
            this.totalMontant = +this.montant; // Met à jour le montant total
          });
        } else {
          this.montant = 0;
          this.totalMontant =+this.montant;
        }
        this.form.get('totalMontant')?.setValue(this.totalMontant);
        this.form.updateValueAndValidity();
      }


    saveColis() {
        if (this.form.invalid) {
            return;
        }
        this.form.value.userId = this.sessionService.getAgentAttributes().id;
        this.form.value.montant = this.totalMontant;
        this.form.value.details = this.courrier.details;
        this.loading = true;
    this.courrierService.save(this.form.value).subscribe(
                (result) => {
                  this.courrier = result;
                  this.loading = false;
                this.router.navigateByUrl('/guichet/courrier-details/'+this.courrier.id);

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
        this.destinataireDialog =false;
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
                    () => {
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

        if (this.destinataire) {
            this.formDestinataire.value.id = this.destinataire.id;
            this.clientService
                .update(this.destinataire.id, this.formDestinataire.value)
                .subscribe(
                    () => {
                        this.destinataireDialog = false;
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
       this.valeurTimbre = this.courrier.details.reduce((sum, detail) => sum + ((detail.quantite || 0) * (detail.prix || 0)), 0);
       this.form.get('valeurTimbre')?.setValue(this.valeurTimbre);
       this.form.updateValueAndValidity();
    }

    getTarifProduit(){

    }

    onQuantiteChange(event: any): void {
        this.checkAndAddProduct();
    }

    checkAndAddProduct(): void {
        if (this.selectedTimbre && this.selectedQuantite > 0) {
            this.ajouterProduit();
        }
    }

    ajouterProduit(): void {
        const quantite =this.form.value.quantite;
        const timbreId = this.form.value.timbreId ;
        this.selectedTimbre = this.stocksTimbre$.find(p => p.id === timbreId);

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
