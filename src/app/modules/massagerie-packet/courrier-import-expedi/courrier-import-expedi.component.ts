import {Component, OnInit, ViewChild} from '@angular/core';
import {MessageService} from "primeng/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StructureDto, StructureService} from "../../../proxy/structures";
import {ColisDto, ColisService} from "../../../proxy/colis";
import {ExpeditionDetailsDto, ExpeditionDto, ExpeditionService} from "../../../proxy/expeditions";
import {Table} from "primeng/table";
import {Noeuxdto, NouexService} from "../../../proxy/noeux";
import {Acheminementdto, AcheminementService} from "../../../proxy/acheminement";
import {CourrierDto, CourrierService} from "../../../proxy/courrier";
import {Fermeturedto, FermetureService} from "../../../proxy/fermeture";
import {StatutCourrierService, Statutdto} from "../../../proxy/statut-courrier";
import {PdfService} from "../../../proxy/pdf/pdf.service";
import {SessionService} from "../../../proxy/auth/Session.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BureauxDouanierService} from "../../../proxy/burauex_douaniers";
import {SuiviCourrierService} from "../../../proxy/suivi-courrier";
import {map} from "rxjs/operators";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-courrier-import-expedi',
  templateUrl: './courrier-import-expedi.component.html',
  styleUrl: './courrier-import-expedi.component.scss',
    providers: [MessageService],

})
export class CourrierImportExpediComponent  implements  OnInit{
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
    listcourriers: [CourrierDto];
    selectedStructure: any;
    showMontantField: boolean = false; // Control visibility of montant field
    montants: number | null = null;
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
    selectedFermeture: any ;



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
     structureId: string;

    load() {
        this.loading = true;

        setTimeout(() => {
            this.loading = false
        }, 2000);
    }


    ngOnInit(): void {
        console.log(this.sessionService.getAgentAttributes().structureId.toString())
        this.structureId = this.sessionService.getAgentAttributes().structureId.toString()
        // this.noeuxService.findNoeuxByIdstruct(this.sessionService.getAgentAttributes().structureId.toString()).subscribe(
        //     (result) => {
        //         this.Bestnoeux = result;
        //         console.log(this.Bestnoeux)
        //
        //
        //     }
        // );
        this.getAcheminByIdNoeux()
        this.structureService.getBureaux().subscribe(
            (result) => {
                this.structure$ = result;
                console.log(this.structure$)
            }
        );



        this.getAcheminByIdNoeux()
        this.buildForm();
        this.getAllNoeux()
        this.getAllCourrier()
        this.getStructureById()
        this.getAllSatutCourrier()
        this.iduser=this.sessionService.getAgentAttributes()?.id
        console.log(this.iduser)




    }
    getStructureById(){
        this.structureService.getOne(this.structureId).subscribe((data)=>{
            this.structure=data;
            console.log(this.structure.code)
        })
    }
    buildForm() {
        this.form = this.fb.group({
            bureauDestination: [undefined, Validators.required],
        });
    }

    getAllCourrier() {

        const idstatut = "7"

        this.courrierService.findCourrierByStrutureDepotAndStatutId(this.sessionService.getAgentAttributes().structureId.toString(), idstatut).subscribe(
            (result) => {
                this.listcourriers = result;
                console.log(this.listcourriers)
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


    getBadgeSeverity(statutCourrier: string): string {
        switch (statutCourrier?.toLowerCase()) {
            // case 'déposé': return 'danger';  // Rouge
            case 'Reçu CT':
                return 'success';  // Vert
            default:
                return 'success';         // Bleu
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
        this.achemeniService.findById(18).subscribe(
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

    mapIdsToColis(ids: any): ExpeditionDetailsDto[] {
        return ids.map(id => ({ colisId: id.id }));
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



    confirmReception() {
        this.saveFermetureCourrier();
        this.selectedColis = []; // Réinitialiser la sélection après l'enregistrement
        this.openCourrierDialog=false;

    }
    saveFermetureCourrier() {
        try {
            const structureDepotId = Number(this.sessionService.getAgentAttributes().structureId);
            const numeroDepeche = `${this.structure.code}${this.numeroDepech}${this.currentYearLastTwoDigits}`;
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
                    this.selectedFermeture = response;
                    this.showDetails()
                    // Mise à jour des courriers et ajout des suivis
                    selectedColisCopy.forEach((colis) => {
                        const courrieId = colis.id;
                        colis.statutCourrierId = this.idStatutFermetureCourrier[0]?.id;
                        colis.structureDestinationId = this.selectedStructure.id;
                        // Ajout du montantTaxeDouane dans l'objet colis
                        colis.taxeDouane = colis.montantTaxeDouane;
                        console.log(colis);

                        // Mise à jour du courrier
                        this.courrierService.updateCourrier(selectedColisCopy).subscribe(
                            () => {
                                this.getAllCourrier();
                                this.selectedColis=null


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
    showDetails(): void {
        // Vérifiez que selectedFermeture est défini avant de l'utiliser
        if (!this.selectedFermeture || !this.selectedFermeture.id) {
            console.error("selectedFermeture est indéfini ou invalide.");
            return;
        }
        const id1 = this.selectedFermeture.id
        this.router.navigate(['messageriePacket/courrier-details-packet/courrierDetailMessagPacketArriere/'+id1]);  // Passe l'ID de la fermeture dans l'URL
        this.openCourrierDialog=false;


    }

}
