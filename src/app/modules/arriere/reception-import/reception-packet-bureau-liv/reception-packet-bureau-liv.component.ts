import {Component, OnInit, ViewChild} from '@angular/core';
import {StructureDto, StructureService} from "../../../../proxy/structures";
import {ColisDto, ColisService} from "../../../../proxy/colis";
import {CourrierDto, CourrierService} from "../../../../proxy/courrier";
import {Table} from "primeng/table";
import {StatutCourrierService, Statutdto} from "../../../../proxy/statut-courrier";
import {TypeCourrierDto, TypeCourrierService} from "../../../../proxy/type-courrier";
import {Noeuxdto, NouexService} from "../../../../proxy/noeux";
import {PdfService} from "../../../../proxy/pdf/pdf.service";
import {SessionService} from "../../../../proxy/auth/Session.service";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {SuiviCourrierService} from "../../../../proxy/suivi-courrier";
import {FermetureService} from "../../../../proxy/fermeture";
import {FermetureCourrierService} from "../../../../proxy/fermetureCourrier";
import {HttpClient} from "@angular/common/http";
import {ConditionService} from "../../../../proxy/conditionReception";

@Component({
  selector: 'app-reception-packet-bureau-liv',
  templateUrl: './reception-packet-bureau-liv.component.html',
  styleUrl: './reception-packet-bureau-liv.component.scss',
    providers: [MessageService],

})
export class ReceptionPacketBureauLivComponent implements OnInit{

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
    @ViewChild('dt') dt: Table;
    listeCourriers: any[] = [];
    courrier: any={};
    statutCourrier:Statutdto
    idStatutFermetureCourrier: any;
    typeCourrier: TypeCourrierDto;
    user:any;
    iduser: any;
    suiviCourriers:any={}
    fermetureId: number;
    statutCourriersarriere: Statutdto[];
    loading: boolean = false;
    selectedStatut: any;
    Bestnoeux: Noeuxdto;
    statutCourriers: Statutdto[];
    listCondition: any []

    selectedCondition : any;






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
        private  conditionService: ConditionService,

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

        this.structureService.getBureaux().subscribe(
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
        this.statutCourrierService.findAll().subscribe((data)=>{
            this.statutCourriers=data;
            console.log(this.statutCourrier)
            console.log( this.statutCourriersarriere)
            this.idStatutFermetureCourrier =this.statutCourriers = data.filter(statut => statut.id === 21);
            console.log(this.idStatutFermetureCourrier);  // Afficher les résultats filtrés
            this.getCourriersByFermetureIdAndStatut(this.fermetureId,this.idStatutFermetureCourrier[0].id)
        })



        this.getAllCondition()
        this.getTypeCourrierById()
        console.log(this.fermetureId)
    }
    getAllCondition(){
        this.conditionService.findAll().subscribe(
            (result) => {
                this.listCondition = result;
                console.log(this.listCondition)
            }
        );
    }
    getTypeCourrierById(){

        this.typeCourrierService.getById("3").subscribe(
            (result) => {
                this.typeCourrier = result;
                console.log(this.typeCourrier)
            }
        );
    }

    getCourriersByFermetureIdAndStatut(fermetureId:number , statutId:number){
        this.fermetureCourrierService.getCourriersByFermetureIdAndStatut(fermetureId, statutId).subscribe(
            (result) => {
                this.listeCourriers= result
                console.log(this.listeCourriers);
            });
    }



    isExpeditionDisabled(): boolean {

        return !this.selectedCourriers

    }




    openDialog(courrie: CourrierDto) {
        this.openCourrierDialog = true;
        this.courries = { ...courrie };
        console.log(courrie)
    }







    confirmReception() {
        console.log(this.selectedCourriers);
        this.openColisDialog = false;
        this.selectedCourriers.forEach((courrier) => {

                // Attribuer une valeur par défaut (22) si l'ID du statut n'est pas renseigné
                courrier.taxeDouane = courrier.montantTaxeDouane;
                courrier.conditionId = this.selectedCondition
                courrier.statutCourrierId = 10;
                courrier.userId = this.iduser;

        });

        // Appel au service pour mettre à jour les courriers
        this.courrierService.updateCourriers(this.selectedCourriers).subscribe(
            (result) => {
                this.getCourriersByFermetureIdAndStatut(this.fermetureId,this.idStatutFermetureCourrier[0].id)
                this.selectedStatut=[]
                // Message de succès
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
        this.selectedCondition= " "
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
