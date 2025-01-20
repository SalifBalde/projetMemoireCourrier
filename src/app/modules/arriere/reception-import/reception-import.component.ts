import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StructureDto, StructureService} from "../../../proxy/structures";
import {ColisDto, ColisService} from "../../../proxy/colis";
import {CourrierDto, CourrierService} from "../../../proxy/courrier";
import {Table} from "primeng/table";
import {TypeCourrierDto, TypeCourrierService} from "../../../proxy/type-courrier";
import {StatutCourrierService, Statutdto} from "../../../proxy/statut-courrier";
import {PdfService} from "../../../proxy/pdf/pdf.service";
import {SessionService} from "../../../proxy/auth/Session.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {SuiviCourrierService} from "../../../proxy/suivi-courrier";
import {color} from "chart.js/helpers";
import {FermetureService} from "../../../proxy/fermeture";
import {Fermeturecourrierdto, FermetureCourrierService} from "../../../proxy/fermetureCourrier";
import {co} from "@fullcalendar/core/internal-common";
import {fakeAsync} from "@angular/core/testing";
import {Noeuxdto, NouexService} from "../../../proxy/noeux";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {BureauxDouanierService} from "../../../proxy/burauex_douaniers";


@Component({
  selector: 'app-reception-import',

  templateUrl: './reception-import.component.html',
  styleUrl: './reception-import.component.scss',
    providers: [MessageService],

})
export class ReceptionImportComponent  implements  OnInit{
    form: FormGroup;
    myGroupReception:FormGroup;
    isModalOpen = false;
    montant = 0;
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    id ="";
    structure$: StructureDto[];
    colis$!: ColisDto[];
    courriers!: CourrierDto[];
    colis:ColisDto ={};
    courries: any ={};
    openColisDialog: boolean = false;
    openCourrierDialog: boolean = false;
    selectedCourriers!: any;
    selectedCourrier: any;


    @ViewChild('dt') dt: Table;
    listeCourrier: [CourrierDto];
     listeCourriers: any[] = [];

    buttonSeverity: string = 'danger';
    listeInitiale: CourrierDto[] = [];
    courriersReceptions: CourrierDto[] = [];
    listeCourriersDepos: CourrierDto[]=[];

    cities: any[] | undefined;

    selectedCity: any | undefined;
    courrier: any={};
    isVide: boolean=false
    protected readonly color = color;
    TypeCourrier:TypeCourrierDto
    statutCourrier:Statutdto[]
    idStatutFermetureCourrier: any;
    statutCourriers: Statutdto[];
    typeCourrier: TypeCourrierDto;
    user:any;
    iduser: any;
    suiviCourriers:any={}
     Listfermetures: any;
     fermetureId: number;
    fermeCour: any;
     statutCourriersarriere: Statutdto[];
    loading: boolean = false;
    selectedStatut: any;
    isSelected:boolean=true
    Bestnoeux: Noeuxdto;
    showMontantField: boolean = false;
    montants: number | null = null;




    constructor(
        private colisService: ColisService,
        private courrierService:CourrierService,
        private pdfService: PdfService,
        private sessionService: SessionService,
        private fb: FormBuilder,
        private router: Router,
        private route : ActivatedRoute,
        private structureService: StructureService,
        private messageService: MessageService,
        private  statutCourrierService: StatutCourrierService,
        private  typeCourrierService:TypeCourrierService,
        private  suiviCourrier:SuiviCourrierService,
        private fermetrureService : FermetureService,
        private fermetureCourrierService : FermetureCourrierService,
        private noeuxService: NouexService,
        private bureauxDouanier: BureauxDouanierService,


    ) {}



    load() {
        this.loading = true;

        setTimeout(() => {
            this.loading = false
        }, 2000);
    }


    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.fermetureId = +params['id'];
            console.log('ID de la fermeture:', this.fermetureId);    });


        this.structureService.findAll().subscribe(
            (result) => {
                this.structure$ = result;
            }
        );

        this.noeuxService.findNoeuxByIdstruct(this.sessionService.getAgentAttributes().structureId.toString()).subscribe(
            (result) => {
                this.Bestnoeux = result;
                console.log(this.Bestnoeux)
              //  this.getAcheminByIdNoeux()
            }
        );
        this.iduser=this.sessionService.getAgentAttributes()?.id
        console.log(this.iduser)
        this.statutCourrierService.findAll().subscribe((data)=>{
            this.statutCourriers=data;
            console.log(this.statutCourrier)
            this.statutCourriersarriere= this.statutCourriers.filter(
                (statut) => [19, 10, 23].includes(statut.id)
            );
            console.log( this.statutCourriersarriere)
            this.idStatutFermetureCourrier =this.statutCourriers = data.filter(statut => statut.id === 21);
            console.log(this.idStatutFermetureCourrier);  // Afficher les résultats filtrés
            this.getCourriersByFermetureIdAndStatut(this.fermetureId,this.idStatutFermetureCourrier[0].id)
        })


        this.getCourriersByStructure();
        this.getTypeCourrierById()

        console.log(this.fermetureId)
    }

    getCourriersByFermetureIdAndStatut(fermetureId:number , statutId:number){
        this.fermetureCourrierService.getCourriersByFermetureIdAndStatut(fermetureId, statutId).subscribe(
            (result) => {
                this.listeCourriers= result
                console.log(this.listeCourriers);
            });
    }
    getTypeCourrierById(){

        this.typeCourrierService.getById("1").subscribe(
            (result) => {
                this.typeCourrier = result;
                console.log(this.typeCourrier)
            }
        );
    }

    getCourriersByStructure(){
        console.log(this.sessionService.getAgentAttributes().structureId)

        this.courrierService.findCourrierByStrutureDepot(this.sessionService.getAgentAttributes().structureId).subscribe(
            (result) => {
                this.courriers = result;
                console.log(this.courriers)
            }
        );
    }

    isExpeditionDisabled(): boolean {

        return !this.selectedCourriers

    }

    onStructureChange(): void {
        const mystructure= Number (this.sessionService.getAgentAttributes().structureId)
        if (this.selectedStatut.id==10) {
            this.bureauxDouanier.isStructureDouaniere(mystructure).subscribe({
                next: (isDouanier: boolean) => {
                    this.showMontantField = isDouanier;
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




    openDialog(courrie: CourrierDto) {
        this.openCourrierDialog = true;
        this.courries = { ...courrie };
        console.log(courrie)
    }






    confirmReception() {
        console.log(this.selectedCourriers);
        this.openCourrierDialog = false;
        this.openColisDialog = false;
        console.log(this.selectedStatut)

        this.selectedCourriers.forEach((courrier) => {
            if (this.selectedStatut?.id) {
                courrier.statutCourrier = { id: this.selectedStatut.id };
                courrier.taxeDouane = courrier.montantTaxeDouane;

            } else {
                // Attribuer une valeur par défaut (22) si l'ID du statut n'est pas renseigné
                courrier.taxeDouane = courrier.montantTaxeDouane;
                courrier.statutCourrier = { id: 10 };
            }
            courrier.userId = this.iduser;

            console.log(courrier);

            // Créer un objet SuiviCourrier pour chaque courrier
            const suiviCourrier = {
                courrierId: courrier.id,
                idstatutCourrier: courrier.statutCourrier.id,
                userId: courrier.userId,
                structureDepotId: courrier.structureDepotId,
                structureDestinationId: courrier.structureDestinationId
            };

            // Sauvegarder les informations de suivi pour chaque courrier
            this.suiviCourrier.save(suiviCourrier).subscribe(
                (data) => {

                    console.log("Suivi courrier sauvegardé : ", data);
                },
                (error) => {
                    console.error("Erreur lors de la sauvegarde du suivi : ", error);
                }
            );
        });

        // Appel au service pour mettre à jour les courriers
        this.courrierService.updateCourriers(this.selectedCourriers).subscribe(
            (result) => {
                // Rafraîchir la liste des courriers après la mise à jour
                this.selectedStatut=[]
                this.selectedCourriers = [];
                this.getCourriersByFermetureIdAndStatut(this.fermetureId, this.idStatutFermetureCourrier)


                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Courrier réceptionné avec succès',
                    life: 3000,
                });
            },
            (error) => {
                // En cas d'erreur lors de la mise à jour des courriers
                console.error("Erreur lors de la mise à jour des courriers : ", error);

                // Message d'erreur
                this.messageService.add({
                    severity: 'danger',
                    summary: 'Erreur',
                    detail: 'Erreur de réception',
                    life: 3000,
                });
            }
        );
    }




    getBadgeSeverity(statutLibelle: string): string {
        switch (statutLibelle?.toLowerCase()) {
            case 'reexpédier':
                return 'danger'; // Rouge pour "reexpédier"
            case 'reçu bureau':
                return 'success'; // Vert pour "Reçu bureau"
            case 'en transit':
                return 'info'; // Bleu pour "En transit"
            default:
                return 'secondary'; // Gris pour les autres statuts
        }
    }

}
