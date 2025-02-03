import {Component, OnInit, ViewChild} from '@angular/core';
import {CourrierDto, CourrierService} from "../../../../proxy/courrier";
import {Table} from "primeng/table";
import {StructureDto, StructureService} from "../../../../proxy/structures";
import {TypeCourrierDto, TypeCourrierService} from "../../../../proxy/type-courrier";
import {StatutCourrierService, Statutdto} from "../../../../proxy/statut-courrier";
import {Noeuxdto, NouexService} from "../../../../proxy/noeux";
import {Paysdto} from "../../../../proxy/pays";
import {ColisService} from "../../../../proxy/colis";
import {PdfService} from "../../../../proxy/pdf/pdf.service";
import {SessionService} from "../../../../proxy/auth/Session.service";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {SuiviCourrierService} from "../../../../proxy/suivi-courrier";
import {FermetureCourrierService} from "../../../../proxy/fermetureCourrier";
import {BureauxDouanierService} from "../../../../proxy/burauex_douaniers";
import {ConditionService} from "../../../../proxy/conditionReception";

@Component({
  selector: 'app-reception-packet',
  templateUrl: './reception-packet.component.html',
  styleUrl: './reception-packet.component.scss',
    providers: [MessageService],

})
export class ReceptionPacketComponent implements OnInit{

    listeCourrier: [CourrierDto];
    listeColis: [CourrierDto];
    openColisDialog: boolean;
    colis: any={}
    @ViewChild('dt') dt: Table;
    structure$: StructureDto[];
    selectedColis: any;
    TypeCourrier:TypeCourrierDto
    statutCourrier:Statutdto
    statutCourriers: Statutdto[];
    idStatutFermetureCourrier: any;
    typeCourrier:TypeCourrierDto
    iduser:any
    selectedCourriers!: any;
    suiviCourriers:any={}
    fermetureId: number;
    listeColiss: any[]=[];
    statutCourriersarriere: Statutdto[];
    selectedStatut: any;
    Bestnoeux: Noeuxdto;
    paysOrigineId:Paysdto={}
    structureDestna:number
    showMontantField: boolean = false;
    montants: number | null = null;
    listCondition: any []

    selectedCondition : any;





    constructor( private colisService: ColisService,
                 private courrierService:CourrierService,
                 private pdfService: PdfService,
                 private sessionService: SessionService,
                 private fb: FormBuilder,
                 private router: Router,
                 private route : ActivatedRoute,
                 private structureService: StructureService,
                 private messageService: MessageService,
                 private  typeCourrierService:TypeCourrierService,
                 private  suiviCourrier:SuiviCourrierService,
                 private fermetureCourrierService : FermetureCourrierService,
                 private  statutCourrierService: StatutCourrierService,
                 private noeuxService: NouexService,
                 private bureauxDouanier: BureauxDouanierService,
                 private  conditionService: ConditionService,

    ) {



    }
    loading: boolean = false;
    cities: any;
    selectedCity: any;


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
        this.structureDestna = Number(this.sessionService.getAgentAttributes().structureId)
        this.statutCourrierService.findAll().subscribe((data)=>{
            this.statutCourriers=data;
            console.log(this.statutCourrier)
            this.statutCourriersarriere= this.statutCourriers.filter(
                (statut) => [19, 10, 23].includes(statut.id)
            );
            console.log( this.statutCourriersarriere)
            this.idStatutFermetureCourrier =this.statutCourriers = data.filter(statut => statut.id === 21);
            console.log(this.idStatutFermetureCourrier);  // Afficher les résultats filtrés
            this.getCourriersByFermetureIdAndStatut(this.fermetureId,this.idStatutFermetureCourrier[0].id,this.structureDestna)
        })
        this.noeuxService.findNoeuxByIdstruct(this.sessionService.getAgentAttributes().structureId.toString()).subscribe(
            (result) => {
                this.Bestnoeux = result;
                console.log(this.Bestnoeux)
                //  this.getAcheminByIdNoeux()
            }
        );
        this.iduser= this.sessionService.getAgentAttributes()?.id
        console.log(this.iduser)
        this.getAllCourriers()

        this.getAllCondition()

    }

    getAllCondition(){
        this.conditionService.findAll().subscribe(
            (result) => {
                this.listCondition = result;
                console.log(this.listCondition)
            }
        );
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




    getAllCourriers(){

        this.courrierService.findAll().subscribe(
            (result) => {
                this.listeCourrier = result;
                console.log(this.listeCourrier)
            }
        );
    }
    getCourriersByFermetureIdAndStatut(fermetureId:number , statutId:number, structureDestna:number){
        this.fermetureCourrierService.getCourriersByFermetureIdAndStatutAndPaysOrigin(fermetureId, statutId,structureDestna).subscribe(
            (result) => {
                this.listeColiss= result
                console.log(this.listeColiss);
            });
    }


    openDialog(courrie: CourrierDto) {
        this.openColisDialog = true;
        this.colis = { ...courrie };
        console.log(courrie)
    }
    isExpeditionDisabled(): boolean {
        return !this.selectedColis

    }


    confirmReception() {
        console.log(this.selectedColis);
        this.openColisDialog = false;
        this.selectedColis.forEach((courrier) => {
            // Mettre à jour le statut du courrier et l'ID de l'utilisateur
            // Vérifier si l'ID du statut est renseigné
            if (this.selectedStatut?.id) {
                courrier.statutCourrierId =this.selectedStatut.id ;
                courrier.taxeDouane = courrier.montantTaxeDouane;
                courrier.conditionId = this.selectedCondition


            } else {
                // Attribuer une valeur par défaut (22) si l'ID du statut n'est pas renseigné
                courrier.taxeDouane = courrier.montantTaxeDouane;
                courrier.conditionId = this.selectedCondition
                courrier.statutCourrierId = 10;
            }
            courrier.userId = this.iduser;

        });

        // Appel au service pour mettre à jour les courriers
        this.courrierService.updateCourriers(this.selectedColis).subscribe(
            (result) => {
                this.getCourriersByFermetureIdAndStatut(this.fermetureId,this.idStatutFermetureCourrier[0].id, this.structureDestna)                // Rafraîchir la liste des courriers après la mise à jour
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
