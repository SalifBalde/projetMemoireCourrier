import { Component, OnInit } from '@angular/core';
import { ClientDto, ClientService } from 'src/app/proxy/client';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { ModePaiementDto, ModePaiementService } from 'src/app/proxy/mode-paiements';
import { ColisCreateUpdateProduitDto, ColisDetailsDto, ColisService } from 'src/app/proxy/colis';
import { MessageService } from 'primeng/api';
import { StructureDto, StructureService } from 'src/app/proxy/structures';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from 'src/app/proxy/auth/Session.service';
import { Paysdto, PaysService } from 'src/app/proxy/pays';
import { Regimedto, RegimeService } from 'src/app/proxy/regime';
import { CategorieDto, CategorieService } from 'src/app/proxy/categorie';
import { TarifCourrierService } from 'src/app/proxy/tarif-courrier';
import { TarifServiceService } from 'src/app/proxy/TarifService';
import { HttpErrorResponse } from '@angular/common/http';
import { CourrierCreateUpdateDto } from 'src/app/proxy/courrier';

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
    nom = "";
    telephone = "";
    cni = "";
    prenom = "";
    id = "";
    clients: ClientDto[] = [{
        id: "1", nom: "mamadou diokou", telephone: "773778825"
    }];
    courrier : CourrierCreateUpdateDto ={};
    modesPaiement: any;
    totalMontant: number = 0;
    fraisRecommande: number = 0;
    fraisAr: number=0;
    fraisExpress: number = 0;
    fraisVd: number = 0;
    regime$: Regimedto[];
    categorie$: CategorieDto[];
    structure$: StructureDto[];
    mode$: ModePaiementDto[];
    clientDialog: boolean;
    loading: boolean;
    client: ClientDto = {};
    destinataire: ClientDto = {};
    destinataireDialog: boolean;


    constructor(
        private router: Router,
        private clientService: ClientService,
        private route: ActivatedRoute,
        private regimeService: RegimeService,
        private paysService :PaysService,
        private categorieService: CategorieService,
        private  sessionService: SessionService,
        private colisService : ColisService,
        private tarifService: TarifServiceService,
        private taxeCourrierService:TarifCourrierService,
        private fb: FormBuilder,
        private modePaiementService:ModePaiementService,
        private messageService : MessageService
    ) { }

    ngOnInit(): void {

        this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
            this.telephone = params['telephone'];
            this.nom = params['nom'];
            this.prenom = params['prenom'];
            this.cni = params['cni'];
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

    }

    choisirDestinataire(client:ClientDto){
        this.destinataire = client;
    }
    buildForm() {
        this.form = this.fb.group({
             modePaiementId: [ '', Validators.required],
             regimeId: [ '', Validators.required],
             paysId: [ '', Validators.required],
             poids: [ '', Validators.required],
             codeBarre: [ ''],
             valeurDeclare: [ ''],
             typeId: [ '1', Validators.required],
             recommande: [{ value: false, disabled: true }],
      ar: [{ value: false, disabled: true }],
      express: [{ value: false, disabled: true }],
        });
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

            this.montant = totalTax;
            this.form.get('montant')?.setValue(this.montant);
          }
        }
      }

    choixRegime() {
        const regimeId = this.form.get('regimeId')?.value;

        if (regimeId === 1) {
          this.form.get('paysId')?.disable(); // Désactiver pour tout autre régime
          this.form.get('paysId')?.setValue(1);

        } else {

            this.form.get('paysId')?.enable(); // Activer si regimeId = 1
            this.form.get('paysId')?.reset(); // Réinitialiser la valeur de paysId si désactivé

        }
      }

      getTaxes() {

      }

      updateServiceState(typeId: string) {
        if (typeId === '1') {
          this.form.get('recommande')?.disable();
          this.form.get('ar')?.disable();
          this.form.get('express')?.disable();
          this.form.get('recommande')?.setValue(false);
          this.form.get('ar')?.setValue(false);
          this.form.get('express')?.setValue(false);
        } else if (typeId === '2') {
          this.form.get('recommande')?.disable();
          this.form.get('recommande')?.setValue(true);
          this.form.get('ar')?.enable();
          this.form.get('ar')?.setValue(false);
          this.form.get('express')?.enable();
          this.form.get('express')?.setValue(false);
        } else if (typeId === '3') {
          this.form.get('recommande')?.disable();
          this.form.get('ar')?.disable();
          this.form.get('express')?.disable();
          this.form.get('recommande')?.setValue(true);
          this.form.get('ar')?.setValue(true);
          this.form.get('express')?.setValue(true);
        }
      }

      onInputChange(value: number) {
        const paysId = this.form.get('paysId')?.value;
        if (value > 0 && paysId > 0) {
        this.form.get('poids')?.valueChanges.subscribe(value => {
            this.taxeCourrierService.getTarif(paysId,value).subscribe((result) => {
                this.montant = result;
            });
          });
        }else{
            this.montant = 0;
        }
      }


    saveColis() {
        if (this.form.invalid) {
            return;
        }
        this.form.value.caisseId = "1";
        this.form.value.clientId = this.id;


    this.colisService.saveProduit(this.form.value).subscribe(
                (result) => {
                  this.courrier = result;
                this.router.navigateByUrl('/guichet/courier-details/'+this.courrier.id);

                },
                (error) => {
                     this.messageService.add({
                        severity: 'danger',
                        summary: 'Error',
                        detail: 'Erreur enregistrement',
                        life: 3000,
                    });
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

        if (this.client) {
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

}
