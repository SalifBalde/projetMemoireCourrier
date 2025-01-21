import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StructureDto, StructureService} from "../../../../../proxy/structures";
import {ColisDto, ColisService} from "../../../../../proxy/colis";
import {ExpeditionDto, ExpeditionService} from "../../../../../proxy/expeditions";
import {Table} from "primeng/table";
import {Noeuxdto, NouexService} from "../../../../../proxy/noeux";
import {Acheminementdto, AcheminementService} from "../../../../../proxy/acheminement";
import {CourrierDto, CourrierService} from "../../../../../proxy/courrier";
import {Fermeturedto, FermetureService} from "../../../../../proxy/fermeture";
import {StatutCourrierService, Statutdto} from "../../../../../proxy/statut-courrier";
import {PdfService} from "../../../../../proxy/pdf/pdf.service";
import {SessionService} from "../../../../../proxy/auth/Session.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {BureauxDouanierService} from "../../../../../proxy/burauex_douaniers";
import {SuiviCourrierService} from "../../../../../proxy/suivi-courrier";
import {map} from "rxjs/operators";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-expedition-packet',
  templateUrl: './expedition-packet.component.html',
  styleUrl: './expedition-packet.component.scss',
      providers: [MessageService]
})
export class ExpeditionPacketComponent implements  OnInit{
    form: FormGroup;
    isModalOpen = false;
    montant = 0;
    //colis$: ColisDto[] = [];
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    id = "";
    structure$: StructureDto[];
    colis$!: ColisDto[];
    expedition: ExpeditionDto = {};

    selectedLettre!: any[];


    @ViewChild('dt') dt: Table;
    listnoeux: Noeuxdto[];
    listAchemin: Acheminementdto[] = [];
    Bestnoeux: Noeuxdto;
    listeCourriers: [CourrierDto];
    listcourriers: CourrierDto[];
    selectedStructure: any;
    openNumExpDialog: boolean=false;
    openCourrierDialog: boolean=false;
    structure: StructureDto;
    structures: StructureDto[]=[];
    numeroDepech: any
    currentYearLastTwoDigits: string;
    courrier: any={};
    fermetureData :Fermeturedto;
    statutCourrier: Statutdto[];
    idStatutFermetureCourrier: any;
    iduser: any;
    suiviCourriers:any={}
    showMontantField: boolean = false;
    montants: number | null = null;

    constructor(
        private colisService: ColisService,
        private expeditionService: ExpeditionService,
        private pdfService: PdfService,
        private sessionService: SessionService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private structureService: StructureService,
        private messageService: MessageService,
        private noeuxService: NouexService,
        private achemeniService: AcheminementService,
        private courrierService: CourrierService,
        private bureauxDouanier: BureauxDouanierService,
        private  fermetureService: FermetureService,
        private  statutCourrierService: StatutCourrierService,
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

        this.structureService.findAll().subscribe(
            (result) => {
                this.structure$ = result;
            }
        );
        this.structureService.getOne('16').subscribe(
            (structure: StructureDto) => {
                this.structures.push(structure);
                console.log(this.structures)
            },
            (error) => {
                console.error('Erreur lors de la récupération de la structure:', error);
            }
        );



        this.buildForm();
        this.getAllNoeux()
        this.getStructureById()
        this.getCourrierByStructureDepotAndStatutIds()
        this.iduser=this.sessionService.getAgentAttributes()?.id
        console.log(this.iduser)




    }
    getStructureById(){
        this.structureService.getOne(this.sessionService.getAgentAttributes().structureId.toString()).subscribe((data)=>{
            this.structure=data;
            console.log(this.structure.code)
        })
    }
    buildForm() {
        this.form = this.fb.group({
            bureauDestination: [undefined, Validators.required],
        });
    }

    getCourrierByStructureDepotAndStatutIds() {

        const statutIds = '14';
        const structureDepot= this.sessionService.getAgentAttributes().structureId.toString()
        const typecourrier='3'


        this.courrierService.findCourrierByTypeCourrierAndStructureDepotAndIdStut(
            typecourrier,
            structureDepot,
            statutIds,
        ).subscribe(
            (result) => {
                this.listcourriers = result;
                console.log(this.listcourriers);
            },
            (error) => {
                console.error('Erreur lors de la récupération des courriers:', error);
            }
        );
    }




    getBadgeSeverity(statutLibelle: string): string {
        switch (statutLibelle?.toLowerCase()) {
            case 'reexpédier':
                return 'danger'; // Rouge pour "reexpédier"
            // case 'reçu bureau':
            //     return 'success'; // Vert pour "Reçu bureau"
            case 'en transit':
                return 'info'; // Bleu pour "En transit"
            default:
                return 'secondary'; // Gris pour les autres statuts
        }
    }

    getAllNoeux() {
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
                const structureId = this.sessionService.getAgentAttributes().structureId;

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

    openDialog1(courrier: CourrierDto) {
        console.log(this.structure.code+this.numeroDepech+this.currentYearLastTwoDigits)

        this.openCourrierDialog=true

        this.courrier = { ...courrier };
        console.log(courrier)
        console.log(this.selectedLettre)
        this.openNumExpDialog=false
    }

    openDialog(courrier: any) {
        if (this.selectedLettre.length > 0) {
            this.openNumExpDialog=true
        }
        this.courrier = { ...courrier };
        console.log(courrier)
        console.log(this.selectedLettre)

    }




    isExpeditionDisabled(): boolean {
        return !this.selectedStructure
    }





    confirmReception() {
        this.saveFermetureCourrier();
        this.selectedLettre = []; // Réinitialiser la sélection après l'enregistrement
        this.openCourrierDialog=false;

    }
    saveFermetureCourrier() {
        try {
            for (let courri of this.selectedLettre) {

                if (courri.statutCourrierId === 14) { // Utilisez '===' pour une comparaison stricte
                    this.idStatutFermetureCourrier =2
                }
            }
            const structureDepotId = Number(this.sessionService.getAgentAttributes().structureId);
            let numeroDepeche = `${this.structure.code}${this.numeroDepech}${this.currentYearLastTwoDigits}`;
            console.log(numeroDepeche);
            console.log(this.selectedStructure);

            // Vérification des colis sélectionnés
            if (!this.selectedLettre || this.selectedLettre.length === 0) {
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
                numeroDepeche: numeroDepeche,
                date: new Date().toISOString(),
                userId: this.iduser, // ID de l'utilisateur connecté

                idstatutCourrier: this.idStatutFermetureCourrier,
                fermetureCourriers: this.selectedLettre.map((colis) => ({
                    courrierId: colis.id,
                })),
            };
            console.log(this.fermetureData);

            const selectedColisCopy = [...this.selectedLettre];
            for (let courri of selectedColisCopy) {

                if (courri.statutCourrierId=== 14) { // Utilisez '===' pour une comparaison stricte
                    this.idStatutFermetureCourrier =2
                }
            }// Copie défensive
            console.log(selectedColisCopy);

            // Appel au service pour enregistrer la fermeture
            this.fermetureService.saveFermeture(this.fermetureData).subscribe(
                (response) => {
                    // Mise à jour des courriers et ajout des suivis
                    selectedColisCopy.forEach((colis) => {
                        const courrieId = colis.id;
                        colis.statutCourrierId= this.idStatutFermetureCourrier;
                        colis.structureDestinationId = this.selectedStructure;
                        colis.taxeDouane = colis.montantTaxeDouane;

                        console.log(courrieId, colis);

                        // Mise à jour du courrier
                        this.courrierService.update(courrieId, colis).subscribe(
                            () => {
                                this.getCourrierByStructureDepotAndStatutIds()
                                this.selectedStructure=null
                                this.numeroDepech = null
                                // Ajout du suivi pour chaque courrier après mise à jour
                                const suiviCourrier = {
                                    courrierId: colis.id,
                                    idstatutCourrier: colis.statutCourrierId,
                                    userId: this.iduser,
                                    structureDepotId: structureDepotId,
                                    structureDestinationId: this.selectedStructure,
                                    date: new Date().toISOString(),
                                };

                                this.suiviCourrier.save(suiviCourrier).subscribe(
                                    (data) => {
                                        // console.log("Suivi courrier sauvegardé : ", data);

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
