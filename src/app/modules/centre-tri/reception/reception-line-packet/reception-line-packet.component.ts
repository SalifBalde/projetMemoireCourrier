import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ClientDto, ClientService} from "../../../../proxy/client";
import {RegimeService} from "../../../../proxy/regime";
import {Paysdto, PaysService} from "../../../../proxy/pays";
import {CategorieDto, CategorieService} from "../../../../proxy/categorie";
import {SessionService} from "../../../../proxy/auth/Session.service";
import {type CourrierCreateUpdateDto, CourrierDetailsDto, CourrierService} from "../../../../proxy/courrier";
import {TarifServiceService} from "../../../../proxy/TarifService";
import {TarifCourrierService} from "../../../../proxy/tarif-courrier";
import {StockService} from "../../../../proxy/stock";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModePaiementService} from "../../../../proxy/mode-paiements";
import {MessageService} from "primeng/api";
import {HttpErrorResponse} from "@angular/common/http";
import {TypeCourrierDto, TypeCourrierService} from "../../../../proxy/type-courrier";

@Component({
  selector: 'app-reception-line-packet',
  templateUrl: './reception-line-packet.component.html',
  styleUrl: './reception-line-packet.component.scss',
    providers: [MessageService],

})
export class ReceptionLinePacketComponent implements  OnInit {
    pays$: Paysdto[];
    categorie$: CategorieDto[];
    typeCourrier$: TypeCourrierDto[];
    clientDialog: boolean;
    client: ClientDto = {};
    formClient: FormGroup;
    formDestinataire: FormGroup;
    destinataire: ClientDto = {};
    destinataireDialog: boolean;
    loading: boolean;
    clients: ClientDto[] = [];
    form: FormGroup;
    courrier: Object;
    label: string = "PO";
    paysDestinationId: any;
    categorieId: any;
    poids: number;
    codebarre: string;
    expediteurId: any;
    typeCourrierId:any
    destinateurId: any;
     categori: CategorieDto;



    constructor(
        private router: Router,
        private clientService: ClientService,
        private route: ActivatedRoute,
        private regimeService: RegimeService,
        private paysService: PaysService,
        private categorieService: CategorieService,
        private sessionService: SessionService,
        private courrierService: CourrierService,
        private tarifService: TarifServiceService,
        private taxeCourrierService: TarifCourrierService,
        private stocksService: StockService,
        private fb: FormBuilder,
        private typecourrierService: TypeCourrierService,
        private messageService: MessageService
    ) {
    }


    ngOnInit(): void {

        this.paysService.findAll().subscribe(
            (result) => {
                this.pays$ = result;
            }
        );

        this.getCatgories()
        this.buildFormClient();
        this.buildFormDestinataire();
        this.checkAndGenerateCode();
        this.getAllTypeCourrier()
    }

    getAllTypeCourrier(){
        this.typecourrierService.findAll().subscribe(
            (result) => {
                this.typeCourrier$ = result;
                this.typeCourrier$ = result.filter((categorie: any) =>
                    categorie.id === 3 || categorie.id === 4
                );
                console.log(this.typeCourrier$)

            }
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

    // Méthode pour générer un code unique de 9 chiffres
    private generateUniqueCode(): string {
        return Math.floor(100000000 + Math.random() * 900000000).toString();
    }

    // Vérifie si le code-barre est vide, puis génère un code

    checkAndGenerateCode(): void {
        if (!this.codebarre) { // Vérifie si le codeBarre est vide
            const generatedCode = this.generateUniqueCode();
            this.codebarre = generatedCode; // Définit la valeur générée
        }
    }


    getCatgories() {
        this.categorieService.findAll().subscribe(
            (result) => {
                this.categorie$ = result;
                this.categorie$ = result.filter((categorie: any) =>
                    categorie.id === 31 || categorie.id === 35

                );

            }
        );

    }

    openDestinataire() {
        this.destinataireDialog = true;
        this.getAllDestinataire();
    }


    openClient() {
        this.clientDialog = true;
    }

    hideDialog() {
        this.clientDialog = false;
        this.destinataireDialog =false;
    }
    getAllDestinataire(){
        const paysId = this.form.get('paysDestinationId').value;
        this.courrierService.getAllDestinataires(this.client.id, paysId).subscribe(
            (result) => {
                this.clients = result;
            }
        );

    }
    geCategorieById(categorId:string) {
        this.categorieService.getOneById(categorId).subscribe(
            (result) => {
                this.categori= result;
                console.log(typeof (this.categori.typeCourrierId))
            }
        );

    }
    saveColis() {
        // Assurez-vous d'utiliser getOneById avec le bon nom
        this.categorieService.getOneById(this.categorieId).subscribe(
            (result) => {
                this.categori = result;
                console.log(typeof(this.categori.typeCourrierId));

                // Création d'un objet avec les données à envoyer
                const courrierData: CourrierCreateUpdateDto = {
                    poids: this.poids,
                    expediteurId: this.expediteurId,
                    destinataireId: this.destinateurId,
                    paysDestinationId: 210,
                    taxePresentation:1000,
                    codeBarre: this.label + this.codebarre + 'SN',  // Utilisation du code barre correctement
                    valeurDeclare: null,
                    contenu: '',
                    quantite: 1,
                    categorieId: this.categorieId,
                    typeCourrierId: this.categori?.typeCourrierId,
                    recommande: false,
                    ar: false,
                    express: false,
                    statutCourrierId: 16,
                    paysOrigineId: this.paysDestinationId,
                    caisseId: Number(this.sessionService.getAgentAttributes().caisseId),
                    structureDepotId: Number(this.sessionService.getAgentAttributes().structureId),
                    structureDestinationId: Number(this.sessionService.getAgentAttributes().structureId),
                    details: null
                };

                // Affichage des données dans la console pour débogage
                console.log(courrierData);

                // Envoi des données au backend via le service
                this.loading = true;
                this.courrierService.save(courrierData).subscribe(
                    (result) => {
                        this.courrier = result;
                        console.log(this.courrier);
                        this.loading = false;
                        this.resetCourrierData(); // Réinitialiser les données du colis
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Packet Enregistré avec succès',
                            life: 3000,
                        });
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
            },
            (error) => {
                // Gérer les erreurs lors de la récupération de la catégorie
                console.error('Erreur lors de la récupération de la catégorie:', error);
            }
        );
    }


    resetCourrierData(): void {
        this.poids = null;
        this.expediteurId = null;
        this.destinateurId = null;
        this.codebarre = '';
        this.paysDestinationId=null
        this.categorieId=null

    }


    choisirDestinataire(client:ClientDto){
        this.destinataire = client;
        this.destinataireDialog = false;
        this.form.patchValue({
            destinataireId: client.id
        });
        //  this.form.updateValueAndValidity();

        console.log(this.form.value);
    }

    saveClient() {
        if (this.formClient.invalid) {
            return;
        }
        if (this.client.id) {
            console.log(this.client)
            this.formClient.value.id = this.client.id;
            this.clientService
                .update(this.client.id, this.formClient.value)
                .subscribe(
                    (client) => {
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
                   // this.client = { ...result };
                   this.expediteurId= this.client?.id

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
                    this.destinateurId = this.destinataire.id
                    console.log(this.destinateurId)
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
    searchDestinataire(): void {
        const keyword = this.formDestinataire.get('telephone').value;

        if (keyword?.length > 8) {
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
    searchClient(): void {
        const keyword = this.formClient.get('telephone').value;
        console.log(keyword)

        if (keyword?.length > 8) {
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


    onSubmit() {

    }
}
