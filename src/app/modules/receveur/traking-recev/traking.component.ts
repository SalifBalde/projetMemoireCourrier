import {Component, OnInit, ViewChild} from "@angular/core";
import {MessageService} from "primeng/api";
import {CourrierDto, CourrierService} from "../../../proxy/courrier";
import {Table} from "primeng/table";
import {StructureDto, StructureService} from "../../../proxy/structures";
import {TypeCourrierDto} from "../../../proxy/type-courrier";
import {Statutdto} from "../../../proxy/statut-courrier";
import {Noeuxdto} from "../../../proxy/noeux";
import {Paysdto} from "../../../proxy/pays";
import {ColisService} from "../../../proxy/colis";
import {SessionService} from "../../../proxy/auth/Session.service";
import {Router} from "@angular/router";
import {SuiviCourrierdto, SuiviCourrierService} from "../../../proxy/suiviCourrier";


@Component({
  selector: 'app-reception-colis',
  templateUrl: './traking.component.html',
  styleUrl: './reception-colis.component.scss',
    providers: [MessageService],
})
export class TrakingComponent implements  OnInit {
    listeCourrier: [CourrierDto];
    listeColis: [CourrierDto];
    openColisDialog: boolean;
    colis: any={}
    @ViewChild('dt') dt: Table;
    structure$: StructureDto[];
    selectedLettre: any;
    TypeCourrier:TypeCourrierDto
    statutCourrier:Statutdto
    statutCourriers: Statutdto[];
    idStatutFermetureCourrier: any;
    typeCourrier:TypeCourrierDto
    iduser:any
    selectedCourriers!: any;
    suiviCourriers:any={}
    fermetureId: number;
    listeLettres: any[]=[];
    statutCourriersarriere: Statutdto[];
    selectedStatut: any;
    Bestnoeux: Noeuxdto;
    paysOrigineId:Paysdto={}
    structureDestna: number;
    showMontantField: boolean = false;
    montants: number | null = null;
    listCondition: any []

    selectedCondition : any;
    codeBarre: string = '';
    suivis: SuiviCourrierdto[] = [];
    selectedSuivi: any = null; // Données du suivi sélectionné
    dialogVisible:boolean=false






    constructor( private colisService: ColisService,
                 private courrierService:CourrierService,
                 private sessionService: SessionService,
                 private router: Router,
                 private structureService: StructureService,
                 private messageService: MessageService,
                 private suiviCourrierService: SuiviCourrierService



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



        this.structureService.getBureaux().subscribe(
            (result) => {
                this.structure$ = result;
            }
        );
        this.paysOrigineId.id=210
        this.structureDestna = Number(this.sessionService.getAgentAttributes().structureId)




    }
    openDialog1(suivi: any) {
        this.selectedSuivi = suivi;
        console.log(this.selectedSuivi)// Assigner les données du suivi sélectionné
        this.dialogVisible = true; // Ouvrir le dialogue
    }

    rechercherParCodeBarre() {

        this.loading = true;
        if (this.codeBarre.trim() !== '') {
            console.log(`Recherche avec code barre: ${this.codeBarre}`);
            this.suiviCourrierService.getByCodeBarre(this.codeBarre).subscribe(
                (data: SuiviCourrierdto[]) => {
                    this.suivis = data;
                    this.codeBarre=null
                    this.openDialog1(this.suivis)
                    console.log(this.suivis)
                    if (this.suivis.length === 0) {
                        this.messageService.add({severity:'info', summary: 'Information', detail: 'Aucun suivi trouvé avec ce code barre.'});
                    }
                    this.loading = false;
                },
                (error) => {
                    console.error(error);
                    this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur lors de la récupération des données.'});
                }

            );
            this.loading = false;

        } else {
            this.messageService.add({severity:'warn', summary: 'Attention', detail: 'Veuillez saisir un code barre valide.'});
        }
        this.loading = false;

    }





}
