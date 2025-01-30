
import { Component, OnInit, ViewChild } from '@angular/core';

import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

//import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {ColisDto, ColisService, CreateUpdateColisDto } from 'src/app/proxy/colis';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StructureDto, StructureService } from 'src/app/proxy/structures';
import { PdfService } from 'src/app/proxy/pdf/pdf.service';
import { ExpeditionDetailsDto, ExpeditionDto, ExpeditionService } from 'src/app/proxy/expeditions';
import { SessionService } from 'src/app/proxy/auth/Session.service';
import {Noeuxdto, NouexService} from "../../../proxy/noeux";
import {Acheminementdto, AcheminementService} from "../../../proxy/acheminement";
import {CourrierDto, CourrierService} from "../../../proxy/courrier";
import {BureauxDouanierService} from "../../../proxy/burauex_douaniers";
import {Fermeturedto, FermetureService} from "../../../proxy/fermeture";
import {StatutCourrierService, Statutdto} from "../../../proxy/statut-courrier";
import {map} from "rxjs/operators";
import {forkJoin} from "rxjs";
import {SuiviCourrierService} from "../../../proxy/suivi-courrier";

@Component({
    selector: 'app-expedition',
  templateUrl: './expedition.component.html',
        providers: [MessageService],
  })
  export class ExpeditionComponent implements OnInit {
    form: FormGroup;
    isModalOpen = false;
    montant = 0;
    //colis$: ColisDto[] = [];
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    id ="";
    structure$: StructureDto[];
    colis$!: ColisDto[];
    expedition:ExpeditionDto={};

    selectedColis!: any[];


    @ViewChild('dt') dt: Table;
     listnoeux: Noeuxdto[];
     listAchemin: Acheminementdto[]=[];
     Bestnoeux: Noeuxdto;
     listeCourriers: [CourrierDto];
     mystrutct: string;
    selectedStructure: any;
     listcolis: [CourrierDto];
    showMontantField: boolean = false; // Control visibility of montant field
    showMontantField1: boolean = false; // Control visibility of montant field
    montants: number | null = null; // Montant value
     openNumExpDialog: boolean=false;
    openCourrierDialog: boolean=false;
    colis: any={};
    fermetureData :Fermeturedto;
    structure: StructureDto;
    numeroDepech: any
    currentYearLastTwoDigits: string;
    statutCourrier: Statutdto[];
    idStatutFermetureCourrier: any;
    iduser: any;
    suiviCourriers:any={}
     numeroDepeche: any;

    constructor(
        private colisService: ColisService,
        private expeditionService: ExpeditionService,
        private pdfService: PdfService,
        private sessionService: SessionService,
        private fb: FormBuilder,
        private router: Router,
        private route : ActivatedRoute,
        private structureService: StructureService,
        private messageService: MessageService,
        private noeuxService: NouexService,
        private achemeniService: AcheminementService,
        private courrierService: CourrierService,
        private bureauxDouanier: BureauxDouanierService,
        private  statutCourrierService: StatutCourrierService,
        private  fermetureService: FermetureService,
        private  suiviCourrier:SuiviCourrierService


    ) {
        const currentYear = new Date().getFullYear();
        this.currentYearLastTwoDigits = currentYear.toString().slice(-2); // Prendre les 2 derniers chiffres
    }

    loading: boolean = false;

    load() {
        this.loading = true;

        setTimeout(() => {
            this.loading = false
        }, 2000);
    }


    ngOnInit(): void {
        console.log(this.sessionService.getAgentAttributes().structureId.toString())
        this.noeuxService.findNoeuxByIdstruct(this.sessionService.getAgentAttributes().structureId.toString()).subscribe(
            (result) => {
                this.Bestnoeux = result;
                console.log(this.Bestnoeux)
                this.getAcheminByIdNoeux()
            }
        );
        this.iduser=this.sessionService.getAgentAttributes()?.id
        this.mystrutct = this.sessionService.getAgentAttributes().structureId

        this.structureService.getBureaux().subscribe(
            (result) => {
                this.structure$ = result;
            }
        );


        this.getCourriers();

        this.buildForm();
        this.getAllNoeux()
        this.getAllColis()
        this.getAllSatutCourrier()
        this.getStructureById()



    }
    getStructureById(){
        this.structureService.getOne(this.sessionService.getAgentAttributes().structureId.toString()).subscribe((data)=>{
            this.structure=data;
            console.log(this.structure.code)
        })
    }
    getAllSatutCourrier(){
        this.statutCourrierService.findAll().subscribe((data)=>{
            this.statutCourrier=data;
            console.log(this.statutCourrier)

            this.idStatutFermetureCourrier =this.statutCourrier = data.filter(statut => statut.id === 20);
            console.log(this.idStatutFermetureCourrier);  // Afficher les résultats filtrés
        })

    }

    buildForm() {
        this.form = this.fb.group({
            bureauDestination: [undefined, Validators.required],
        });
    }
    getAllColis(){

        const  idstatut="11"

        this.courrierService.findCourrierByStrutureDepotAndStatutId( this.sessionService.getAgentAttributes().structureId.toString(), idstatut).subscribe(
            (result) => {
                this.listcolis = result;
                console.log(this.listcolis)
            }
        );
    }


    getCourriers(){
        const idStatu= '18'
        const idStructureDepo = this.sessionService.getAgentAttributes().structureId.toString()


        this.courrierService.findCourrierByStrutureDepotAndStatutId( idStructureDepo, idStatu).subscribe(
            (result) => {
                this.listeCourriers= result;
                console.log(this.listeCourriers)
            }
        );
    }
    getBadgeSeverity(statutCourrier: string ): string {
        switch (statutCourrier?.toLowerCase()) {
           // case 'déposé': return 'danger';  // Rouge
            case 'Reçu CT': return 'success';  // Vert
            default: return 'success';         // Bleu
        }
    }
getAllNoeux(){
    this.noeuxService.findAll().subscribe(
        (result) => {
            this.listnoeux = result;
            console.log(this.listnoeux)
        }
    );
}
    getAcheminByIdNoeux() {
        console.log(this.Bestnoeux?.id);
        this.achemeniService.findById(this.Bestnoeux.id).subscribe(
            (result) => {
                console.log(result);
                const structureId = this.sessionService.getAgentAttributes().structureId.toString();
                console.log(structureId)

                // Créez un tableau de promesses pour attendre toutes les requêtes asynchrones
                const structureRequests = result
                    .filter(achemine => achemine?.structureId.toString() !== structureId) // Filtrer les éléments avant de créer les observables
                    .map(achemine => {
                        console.log(achemine?.structureId);

                        return this.structureService.getOne(achemine?.structureId.toString()).pipe(
                            // Utilisez "map" pour ajouter le libellé à l'acheminement
                            map((structure: StructureDto) => {
                                achemine.libelle = structure.libelle;
                                console.log(achemine); // Affichez l'acheminement mis à jour
                                return achemine;
                            })
                        );
                    });

                // Attendez que toutes les requêtes se terminent
                forkJoin(structureRequests).subscribe(
                    (updatedAcheminements) => {
                        // Mettez à jour la liste des acheminements avec ceux dont le libellé est maintenant défini
                        this.listAchemin = updatedAcheminements;
                        console.log(this.listAchemin); // Affichez la liste mise à jour
                    },
                    (error) => {
                        console.error('Erreur lors de la récupération des structures:', error);
                    }
                );
            },
            (error) => {
                console.error('Erreur lors de la récupération des acheminements:', error);
            }
        );
    }


    mapIdsToColis(ids: any): ExpeditionDetailsDto[] {
        return ids.map(id => ({ colisId: id.id }));
    }

    // Handle structure change
    onStructureChange(structureId: number): void {
        if (structureId) {
            this.bureauxDouanier.isStructureDouaniere(structureId).subscribe({
                next: (isDouanier) => {
                    this.showMontantField = !isDouanier;
                    this.showMontantField1 = isDouanier;
                    if (isDouanier) {
                        this.montants = null; // Reset montant if not douanier
                    }
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur est survenue.' });
                },
            });
        } else {
            this.showMontantField = false;
            this.montants = null; // Reset montant if no structure selected
        }


    }


    isExpeditionDisabled(): boolean {
        return !this.selectedStructure
    }
    openDialog1(colis: CourrierDto) {
        console.log(this.structure.code+this.numeroDepech+this.currentYearLastTwoDigits)

        this.openCourrierDialog=true

        this.colis = { ...colis };
        console.log(colis)
        console.log(this.selectedColis)
        this.openNumExpDialog=false
    }

    openDialog(colis: any) {
        if (this.selectedColis.length > 0) {
            this.openNumExpDialog=true
        }
        this. colis = { ...colis };
        console.log(colis)
        console.log(this.selectedColis)

    }

    confirmReception() {
        this.saveFermetureCourrier();
        this.selectedColis = []; // Réinitialiser la sélection après l'enregistrement
        this.openCourrierDialog=false;

    }
    saveFermetureCourrier() {
        try {
            const structureDepotId = Number(this.sessionService.getAgentAttributes().structureId);
            this.numeroDepeche = `${this.structure.code}${this.numeroDepech}${this.currentYearLastTwoDigits}`;
            console.log(this.numeroDepech);
            console.log(this.selectedStructure);

            // Vérification des colis sélectionnés
            if (!this.selectedColis || this.selectedColis.length === 0) {
                this.messageService.add({
                    severity: 'warn',
                    summary: 'Attention',
                    detail: 'Veuillez sélectionner au moins un colis.',
                    life: 3000,
                });
                return;
            }

            // Préparation des données pour l'enregistrement
            this.fermetureData = {
                structureDepotId: structureDepotId,
                structureDestinationId: this.selectedStructure,
                numeroDepeche: this.numeroDepech,
                date: new Date().toISOString(),
                userId: this.iduser, // ID de l'utilisateur connecté
                statutCourrierId: this.idStatutFermetureCourrier[0]?.id,
                fermetureCourriers: this.selectedColis.map((colis) => ({
                    courrierId: colis.id,
                })),
            };
            console.log(this.fermetureData);

            const selectedColisCopy = [...this.selectedColis]; // Copie défensive
            console.log(selectedColisCopy);

            // Appel au service pour enregistrer la fermeture
            this.fermetureService.saveFermeture(this.fermetureData).subscribe(
                (response) => {
                    // Mise à jour des courriers et ajout des suivis
                    selectedColisCopy.forEach((colis) => {
                        const courrieId = colis.id;
                        colis.statutCourrier = this.idStatutFermetureCourrier[0];
                        colis.structureDestinationId = this.selectedStructure;
                        colis.taxeDouane=this.montants

                        console.log(courrieId, colis);

                        // Mise à jour du courrier
                        this.courrierService.update(courrieId, colis).subscribe(
                            () => {
                                this.getCourriers()

                                // Ajout du suivi pour chaque courrier après mise à jour
                                const suiviCourrier = {
                                    courrierId: colis.id,
                                    idstatutCourrier: colis.statutCourrier.id,
                                    userId: this.iduser,
                                    structureDepotId: structureDepotId,
                                    structureDestinationId: this.selectedStructure,
                                    date: new Date().toISOString(),
                                };

                                this.suiviCourrier.save(suiviCourrier).subscribe(
                                    (data) => {
                                        // console.log("Suivi courrier sauvegardé : ", data);
                                        this.numeroDepeche=null;
                                        this.montants=null

                                    },
                                    (error) => {
                                        console.error("Erreur lors de la sauvegarde du suivi : ", error);
                                    }
                                );

                                // Rafraîchir la liste des courriers


                            },
                            (error) => {
                                console.error(`Erreur lors de la mise à jour du colis ${colis.id}:`, error);
                            }
                        );
                    });
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Courrier expédié avec succès.',
                        life: 3000,
                    });

                    // Message de succès

                },
                (error) => {
                    console.error('Erreur lors de l\'enregistrement de la fermeture:', error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erreur',
                        detail: 'Une erreur s\'est produite lors de l\'enregistrement de la fermeture.',
                        life: 3000,
                    });
                }
            );
        } catch (error) {
            console.error('Erreur inattendue:', error);
            this.messageService.add({
                severity: 'error',
                summary: 'Erreur inattendue',
                detail: 'Veuillez contacter l\'administrateur.',
                life: 3000,
            });
        }
    }
}
