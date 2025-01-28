import {Component, OnInit, ViewChild} from '@angular/core';
import {ColisDto, ColisService} from "../../../../proxy/colis";
import {ExpeditionDetailsDto, ExpeditionDto, ExpeditionService} from "../../../../proxy/expeditions";
import {PdfService} from "../../../../proxy/pdf/pdf.service";
import {SessionService} from "../../../../proxy/auth/Session.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {StructureDto, StructureService} from "../../../../proxy/structures";
import {MessageService} from "primeng/api";
import {Noeuxdto, NouexService} from "../../../../proxy/noeux";
import {Acheminementdto, AcheminementService} from "../../../../proxy/acheminement";
import {CourrierDto, CourrierService} from "../../../../proxy/courrier";
import {BureauxDouanierService} from "../../../../proxy/burauex_douaniers";
import {Fermeturedto, FermetureService} from "../../../../proxy/fermeture";
import {StatutCourrierService, Statutdto} from "../../../../proxy/statut-courrier";
import {SuiviCourrierService} from "../../../../proxy/suivi-courrier";
import {Table} from "primeng/table";
import {map} from "rxjs/operators";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-expedition-courrier-import',
  templateUrl: './expedition-courrier-import.component.html',
  styleUrl: './expedition-courrier-import.component.scss',
    providers: [MessageService],
})
export class ExpeditionCourrierImportComponent  implements  OnInit{
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

    selectedColis!: any[];


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

        this.structureService.getBureaux().subscribe(
            (result) => {
                this.structure$ = result;
            }
        );



        this.buildForm();
        this.getAllNoeux()
        this.getStructureById()
        this.getAllSatutCourrier()
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

        const statutIds = [23,19];
        const structureDestination=this.sessionService.getAgentAttributes().structureId.toString()
       // console.log(structureDestination)// Statut IDs sous forme de nombres

        const typecourrier=1

        this.courrierService.findCourrierByStructureDepotAndStatutIds(
            structureDestination,
            typecourrier,
            statutIds).subscribe(
            (result) => {
                this.listcourriers = result;
                console.log(this.listcourriers);
            },
            (error) => {
                console.error('Erreur lors de la récupération des courriers:', error);
            }
        );
    }
    getAllSatutCourrier(){
        this.statutCourrierService.findAll().subscribe((data)=>{
            this.statutCourrier=data;
            console.log(this.statutCourrier)

            this.idStatutFermetureCourrier =this.statutCourrier = data.filter(statut => statut.id === 21);
            console.log(this.idStatutFermetureCourrier);  // Afficher les résultats filtrés
        })

    }
    onStructureChange(): void {
        if (this.selectedStructure) {
            this.bureauxDouanier.isStructureDouaniere(this.selectedStructure).subscribe({
                next: (isDouanier: boolean) => {
                    this.showMontantField = !isDouanier;
                    if (isDouanier) {
                        this.montants = null; // Réinitialise le champ montant si douanier
                    }
                },
                error: () => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erreur',
                        detail: 'Une erreur est survenue lors de la vérification de la structure.',
                    });
                },
            });
        } else {
            this.showMontantField = false;
            this.montants = null; // Réinitialiser si aucune structure n'est sélectionnée
        }
    }



    getBadgeSeverity(statutLibelle: string): string {
        switch (statutLibelle?.toLowerCase()) {
            case 'retourner':
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
        console.log(this.selectedColis)
        this.openNumExpDialog=false
    }

    openDialog(courrier: any) {
        if (this.selectedColis.length > 0) {
            this.openNumExpDialog=true
        }
        this.courrier = { ...courrier };
        console.log(courrier)
        console.log(this.selectedColis)

    }




    isExpeditionDisabled(): boolean {
        return !this.selectedStructure
    }





    confirmReception() {
        this.saveFermetureCourrier();
        this.selectedColis = []; // Réinitialiser la sélection après l'enregistrement
        this.openCourrierDialog=false;

    }
    saveFermetureCourrier() {


        try {
            for (let courri of this.selectedColis) {
                console.log(typeof (courri.statutCourrier.id ));

                if (courri.statutCourrier.id === 19) { // Utilisez '===' pour une comparaison stricte
                    this.idStatutFermetureCourrier =21
                } else {
                    this.idStatutFermetureCourrier = 16;
                }
            }
            const structureDepotId = Number(this.sessionService.getAgentAttributes().structureId);
            let numeroDepeche = `${this.structure.code}${this.numeroDepech}${this.currentYearLastTwoDigits}`;
            console.log(numeroDepeche);
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
                numeroDepeche: numeroDepeche,
                date: new Date().toISOString(),
                userId: this.iduser, // ID de l'utilisateur connecté

                idstatutCourrier: this.idStatutFermetureCourrier,
                fermetureCourriers: this.selectedColis.map((colis) => ({
                    courrierId: colis.id,
                })),
            };
            console.log(this.fermetureData);

            const selectedColisCopy = [...this.selectedColis];
            for (let courri of selectedColisCopy) {
                console.log(typeof (courri.statutCourrier.id ));

                if (courri.statutCourrier.id === 19) { // Utilisez '===' pour une comparaison stricte
                    this.idStatutFermetureCourrier =21
                } else {
                    this.idStatutFermetureCourrier = 16;
                }
            }// Copie défensive
            console.log(selectedColisCopy);

            // Appel au service pour enregistrer la fermeture
            this.fermetureService.saveFermetureImport(this.fermetureData).subscribe(
                (response) => {
                    // Mise à jour des courriers et ajout des suivis
                    selectedColisCopy.forEach((colis) => {
                        const courrieId = colis.id;
                        colis.statutCourrier.id = this.idStatutFermetureCourrier;
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
                                    idstatutCourrier: colis.statutCourrier.id,
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
