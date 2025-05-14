import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";


import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {HttpErrorResponse} from "@angular/common/http";
import {Paysdto, PaysService} from "../../../proxy/pays";
import {CategorieDto, CategorieService} from "../../../proxy/categorie";
import {TypeCourrierDto, TypeCourrierService} from "../../../proxy/type-courrier";
import {ClientDto, ClientService} from "../../../proxy/client";
import {CourrierCreateUpdateDto, CourrierDto, CourrierService} from "../../../proxy/courrier";
import {RegimeService} from "../../../proxy/regime";
import {SessionService} from "../../../proxy/auth/Session.service";
import {TarifServiceService} from "../../../proxy/TarifService";
import {TarifCourrierService} from "../../../proxy/tarif-courrier";
import {StockService} from "../../../proxy/stock";

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
    courrier: CourrierDto;
    label: string
    paysOrigineId: any;
    categorieId: any;
    poids: number;
    taxeDouane: number=0;
    taxePresentation: number=0;
    fraisSuivi: number=0;
    montant: number;
    codebarre: string;
    expediteurId: any;
    typeCourrierId:any
    destinateurId: any;
     categori: CategorieDto;
    private generatedCodeBarre: string = ''; // Stocke le code généré temporairement
    displayDialog:boolean=false
    courrierss:any[]=[]
     issortant: boolean;
     iduser: any;
    taxeePresentation:number
     search: boolean=false
    monresult:CourrierCreateUpdateDto;


    constructor(
        private router: Router,
        private clientService: ClientService,
        private route: ActivatedRoute,
        private regimeService: RegimeService,
        private paysService: PaysService,
        private categorieService: CategorieService,
        private sessionService: SessionService,
        private courrierService: CourrierService,
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
      //  this.checkAndGenerateCode();
        this.getAllTypeCourrier()
        this.geCategorieById(this.categorieId)
        this.iduser= this.sessionService.getAgentAttributes()?.id

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
            cni: [this.client.cni || ''],
            telephone: [this.client.telephone || ''],
            email: [this.client.email],
        });
    }

    buildFormDestinataire() {
        this.formDestinataire = this.fb.group({
            nom: [this.destinataire.nom || '', Validators.required],
            prenom: [this.destinataire.prenom || '', Validators.required],
            adresse: [this.destinataire.adresse || '', Validators.required],
            cni: [this.destinataire.cni || ''],
            telephone: [this.destinataire.telephone || ''],
            email: [this.destinataire.email],
        });
    }

    // Méthode pour générer un code unique de 9 chiffres
    private generateUniqueCode(): string {
        return Math.floor(100000000 + Math.random() * 900000000).toString();
    }

    // Vérifie si le code-barre est vide, puis génère un code

    // checkAndGenerateCode(): void {
    //     if (!this.codebarre) { // Vérifie si le codeBarre est vide
    //         const generatedCode = this.generateUniqueCode();
    //         this.codebarre = generatedCode; // Définit la valeur générée
    //     }
    // }
    validateCodeBarre() {
        this.search=true
       if (this.codebarre){
            this.codebarre = this.codebarre.toUpperCase();
            console.error("Le code-barre doit contenir exactement 13 caractères.");
        // Appelle le service pour récupérer les informations du colis
            console.log(this.codebarre)

           this.courrierService.getByCodeBarre(this.codebarre).subscribe(
            (result) => {
                if (result) {
                    this.courrier = result;
                    this.geCategorieById((this.courrier.categorieId).toString())
                    this.poids = result.poids;
                    this.client = { id: result.expediteurId, nom: result.expediteurNom, prenom: result.expediteurPrenom, cni: result.expediteurCni };
                    this.destinataire = { id: result.destinataireId, nom: result.destinataireNom, prenom: result.destinatairePrenom, cni: result.destinataireCni };
                    this.paysOrigineId = result.paysOrigineId;
                    this.categorieId = result.categorieId;
                    this.taxeDouane=result.taxeDouane
                    this.taxePresentation=result.taxePresentation
                    this.fraisSuivi= result.fraisSuivi
                    this.montant=result.montant
                    console.log( this.client, this.destinataire, this.poids)// Stocke les données du colis
                    this.displayDialog = true;  // Affiche le dialog avec les informations
                    console.log(this.courrier)
                    if(this.courrier.statutCourrierId ===10){
                        this.messageService.add({
                            severity: 'info',
                            summary: ' Colis déjà livré ',
                            detail: ' Ce colis est déjà livré.',
                            life: 8000
                        });
                    }else {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Colis trouvé',
                            detail: 'Le colis  existe déjà veuillez saisir les taxes et  valider en bas .',
                            life: 10000
                        });
                    }

                } else {
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Aucun colis trouvé',
                        detail: 'Aucun colis ne correspond à ce code-barre.',
                        life: 3000
                    });
                }
            },
            (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Colis introvable , Veuillez le saisir en bas ',
                    life: 10000
                });
                console.error('Erreur lors de la récupération du colis:', error);
            }
        );
    }


}
    generateCodeBarre() {

            this.generatedCodeBarre =this.generateCustomCodeBarre();
            this.codebarre = this.generatedCodeBarre
    }

    private generateCustomCodeBarre(): string {
        const numbers = '0123456789';
        let result = 'PO'; // Fixe les deux premières lettres à "PO"

        // Générer 9 chiffres aléatoires
        for (let i = 0; i < 9; i++) {
            result += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }

        result += 'SN'; // Fixe les deux dernières lettres à "SN"
        return result;
    }


    getCatgories() {
        this.categorieService.findAll().subscribe(
            (result) => {
                this.categorie$ = result;
                // this.categorie$ = result.filter((categorie: any) =>
                //     categorie.id === 31 || categorie.id === 35
                //
                // );

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
                this.issortant = !this.categori.entrant; // Si `entrant` est true, `issortant` sera false
                console.log(this.issortant)
                this.typeCourrierId=this.categori.typeCourrierId
                this.courrier.typeCourrierId=this.typeCourrierId
                this.courrier.typeCourrierLibelle=this.categori.typeCourrierLibelle
                console.log (this.categori.typeCourrierId)
                if(this.typeCourrierId !==1){
                    this.taxeePresentation = 1000
                }else{
                    this.taxeePresentation= null
                }
            }
        );

    }
    saveColis() {
            console.log('entrer ici')
        this.geCategorieById(this.categorieId)
        const monustructId= Number( this.sessionService.getAgentAttributes().structureId)
            const courrierData: CourrierCreateUpdateDto = {
                poids: this.poids,
                expediteurId: Number(this.client.id),
                destinataireId: Number(this.destinataire.id),
                typeCourrierId: this.typeCourrierId,
                paysDestinationId: 210,
                taxePresentation: this.typeCourrierId !== 1 ? 1000 : null, // Condition ternaire ici
                codeBarre: this.codebarre , // Utilisation du code barre correctement
                valeurDeclare: null,
                contenu: '',
                quantite: null,
                categorieId: this.categorieId,
                recommande: false,
                ar: false,
                express: false,
                statutCourrierId: 10,
                paysOrigineId: this.paysOrigineId,
                caisseId: Number(this.sessionService.getAgentAttributes().caisseId),
                structureDepotId: null,
                structureDestinationId:monustructId,
                taxeDouane:this.taxeDouane,
                fraisSuivi:this.fraisSuivi,
                userId: this.iduser,
                details: null
            };
            console.log(courrierData)
            this.courrierService.saveReceptionCourrier(courrierData).subscribe(
                (result) => {
                    console.log(result)
                        this.showDetails(result);
                          this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Courrier Created',
                        life: 3000,
                    });

                    //    this.client = {};
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
        this.resetForm()

    }
    updateeCourrier() {
        console.log( 'juste avant')
        if (this.courrier.id) {
            this.geCategorieById(this.categorieId)
            this.courrierss.push(this.courrier)
            console.log(this.courrierss)
            this.courrierss.forEach((courrier) => {
                // Mettre à jour le statut du courrier et l'ID de l'utilisateur
                // Vérifier si l'ID du statut est renseigné
                if (this.courrier?.id) {
                    courrier.statutCourrierId = 10;
                    courrier.taxeDouane = this.taxeDouane;
                    courrier.typeCourrierId= this.typeCourrierId
                    courrier.taxePresentation = this.typeCourrierId !== 1 ? 1000 : null  // Condition ternaire ici
                    courrier.categorieId=this.categorieId
                    courrier.fraisSuivi = this.fraisSuivi;
                    courrier.expediteurId= this.client.id
                    courrier.destinateurId=this.destinataire.id
                    courrier.paysDestinationId=210
                    courrier.paysOrigineId=this.paysOrigineId
                    courrier.structureDestinationId=this.sessionService.getAgentAttributes().structureId
                    courrier.structureDepotId = courrier.structureDepotId
                    courrier.userId= this.iduser
                }

            })
            this.courrierService.updateCourriers(this.courrierss)
                .subscribe(
                    (result) => {
                        console.log(result)
                        if (result.length > 0) {
                            this.showDetails(result[0])
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Courrier Updated',
                            life: 3000,
                        });

                        // this.client = {};
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


                       // this.destinataireDialog = true;
                    }
                );
        }
        this.resetForm()
    }
    resetForm() {
        this.client = { nom: '', prenom: '', cni: '' };
        this.destinataire = { nom: '', prenom: '', cni: '' };
        this.paysOrigineId = null;
        this.codebarre = '';
        this.poids = null;
        this.montant = null;
        this.taxeDouane = null;
        this.taxePresentation = null;
        this.fraisSuivi = null;
        this.categorieId=null;
        this.typeCourrierId=null;
    }

    getPaysLibelle(paysId: number): string {
        const pays = this.pays$.find(p => p.id === paysId);
        return pays ? pays.libelle : '';
    }

    getCategorieLibelle(categorieId: string): string {
        const categorie = this.categorie$.find(c => c.id === categorieId);
        return categorie ? categorie.libelle : '';
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
                    (resultat) => {
                        this.client= resultat
                        this.formClient.patchValue({
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
                    this.formClient.patchValue({
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
                    (resultat) => {
                        this.destinataire= resultat
                        this.destinataire = { ...resultat };
                        this.formDestinataire.patchValue({
                            destinataireId: this.destinataire?.id || '',
                        });
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
                    this.formDestinataire.patchValue({
                        destinataireId: this.destinataire?.id || '',
                    });
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
                    console.log(this.destinataire)
                    this.formDestinataire.patchValue({
                        destinataireId:this.destinataire?.id || ''
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
                    console.log(client)
                    this.formClient.patchValue({
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


    searchColisByCodeBarre() {
        if (!this.codebarre || this.codebarre.length !== 13) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Attention',
                detail: 'Veuillez saisir un code-barre valide (13 caractères).',
                life: 3000
            });
            return;
        }

        this.loading = true;
        this.courrierService.getByCodeBarre(this.codebarre).subscribe(
            (result) => {
                if (result) {
                    this.courrier = result;
                    this.poids = result.poids;
                    this.client = { id: result.expediteurId, nom: result.expediteurNom, prenom: result.expediteurPrenom, cni: result.expediteurCni };
                    this.destinataire = { id: result.destinataireId, nom: result.destinataireNom, prenom: result.destinatairePrenom, cni: result.destinataireCni };
                    this.paysOrigineId = result.paysOrigineId;
                    this.categorieId = result.categorieId;
                    console.log( this.client, this.destinataire, this.poids)
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Colis trouvé',
                        detail: 'Les informations du colis ont été chargées.',
                        life: 3000
                    });
                } else {
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Aucun colis trouvé',
                        detail: 'Aucun colis ne correspond à ce code-barre.',
                        life: 3000
                    });
                }
                this.loading = false;
            },
            (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Impossible de récupérer le colis.',
                    life: 3000
                });
                console.error('Erreur lors de la récupération du colis:', error);
                this.loading = false;
            }
        );
    }


    showDetails(courrierss: CourrierCreateUpdateDto): void {
        console.log(courrierss)
        const id1 = courrierss.id
        console.log(id1)
        // pour naviger il faut aller sur app.routing pour recuperer le chemin
        this.router.navigate(['arriere/detailReceptionPacket/'+id1]);  // Passe l'ID de la fermeture dans l'URL


    }

}
