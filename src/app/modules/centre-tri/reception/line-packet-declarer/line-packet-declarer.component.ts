import {Component, OnInit, ViewChild} from '@angular/core';
import {Paysdto, PaysService} from "../../../../proxy/pays";
import {CategorieDto, CategorieService} from "../../../../proxy/categorie";
import {ClientDto, ClientService} from "../../../../proxy/client";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {RegimeService} from "../../../../proxy/regime";
import {SessionService} from "../../../../proxy/auth/Session.service";
import {type CourrierCreateUpdateDto, CourrierDto, CourrierService} from "../../../../proxy/courrier";
import {TarifServiceService} from "../../../../proxy/TarifService";
import {TarifCourrierService} from "../../../../proxy/tarif-courrier";
import {StockService} from "../../../../proxy/stock";
import {ModePaiementService} from "../../../../proxy/mode-paiements";
import {MessageService} from "primeng/api";
import {HttpErrorResponse} from "@angular/common/http";
import {StructureDto, StructureService} from "../../../../proxy/structures";
import {ColisDto, ColisService} from "../../../../proxy/colis";
import {Table} from "primeng/table";
import {StatutCourrierService, Statutdto} from "../../../../proxy/statut-courrier";
import {PdfService} from "../../../../proxy/pdf/pdf.service";
import {SuiviCourrierService} from "../../../../proxy/suivi-courrier";
import {ExpeditionDetailsDto, ExpeditionDto, ExpeditionService} from "../../../../proxy/expeditions";
import {forkJoin} from "rxjs";
import {map} from "rxjs/operators";
import {Noeuxdto, NouexService} from "../../../../proxy/noeux";
import {Acheminementdto, AcheminementService} from "../../../../proxy/acheminement";
import {BureauxDouanierService} from "../../../../proxy/burauex_douaniers";
import {Fermeturedto, FermetureService} from "../../../../proxy/fermeture";

@Component({
  selector: 'app-line-packet-declarer',
  templateUrl: './line-packet-declarer.component.html',
  styleUrl: './line-packet-declarer.component.scss',
    providers: [MessageService],

})
export class LinePacketDeclarerComponent  implements    OnInit{
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
    listAchemin: StructureDto[]=[];
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
                console.log(this.structure$)
            }
        );




        this.buildForm();
        this.getAllNoeux()
        this.getAllCourrier()
        this.getStructureById()
        this.getAllSatutCourrier()
        this.iduser=this.sessionService.getAgentAttributes()?.id
        console.log(this.selectedStructure)




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

        const idstatut = "16"

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


    // getCourriers() {
    //     const idStatu = '16'
    //     const idStructureDepo = this.sessionService.getAgentAttributes().structureId.toString()
    //
    //
    //     this.courrierService.findCourrierByStrutureDepotAndStatutId(idStructureDepo, idStatu).subscribe(
    //         (result) => {
    //             this.listeCourriers = result;
    //             console.log(this.listeCourriers)
    //         }
    //     );
    // }

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
                const structureId = this.sessionService.getAgentAttributes().structureId;

                        return this.structureService.getOne('356').subscribe((data) => {
                            this.listAchemin.push(data)
                            console.log(this.listAchemin)
                            return this.listAchemin
                            // Affichez l'acheminement mis à jour
                        })

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
                idstatutCourrier: this.idStatutFermetureCourrier[0]?.id,
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
                          this.showDetails()
                    // Mise à jour des courriers et ajout des suivis
                    selectedColisCopy.forEach((colis) => {
                        const courrieId = colis.id;
                        colis.statutCourrier = this.idStatutFermetureCourrier[0];
                        colis.structureDestinationId = this.selectedStructure;
                        // Ajout du montantTaxeDouane dans l'objet colis
                        colis.taxeDouane = colis.montantTaxeDouane;  // Ici, le montant est récupéré du modèle de données déjà lié

                        console.log(courrieId, colis);

                        // Mise à jour du courrier
                        this.courrierService.updateCourrier(colis).subscribe(
                            () => {
                                this.getAllCourrier();
                                this.selectedColis=null


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



    showDetails(): void {
        // Vérifiez que selectedFermeture est défini avant de l'utiliser
        if (!this.selectedFermeture || !this.selectedFermeture.id) {
            console.error("selectedFermeture est indéfini ou invalide.");
            return;
        }
        const id1 = this.selectedFermeture.id
        this.router.navigate(['arriere/courrier-details/courrierDetailArriere/'+id1]);  // Passe l'ID de la fermeture dans l'URL
        this.openCourrierDialog=false;


    }


}
