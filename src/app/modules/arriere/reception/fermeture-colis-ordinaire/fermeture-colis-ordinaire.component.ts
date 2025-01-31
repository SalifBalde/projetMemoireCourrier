import {Component, OnInit, ViewChild} from '@angular/core';
import {CourrierDto, CourrierService} from "../../../../proxy/courrier";
import {Table} from "primeng/table";
import {StructureDto, StructureService} from "../../../../proxy/structures";
import {TypeCourrierDto, TypeCourrierService} from "../../../../proxy/type-courrier";
import {StatutCourrierService, Statutdto} from "../../../../proxy/statut-courrier";
import {ColisService} from "../../../../proxy/colis";
import {PdfService} from "../../../../proxy/pdf/pdf.service";
import {SessionService} from "../../../../proxy/auth/Session.service";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {SuiviCourrierService} from "../../../../proxy/suivi-courrier";
import {Fermeturedto, FermetureService} from "../../../../proxy/fermeture";
import {Paysdto} from "../../../../proxy/pays";

@Component({
  selector: 'app-fermeture-colis-ordinaire',
  templateUrl: './fermeture-colis-ordinaire.component.html',
  styleUrl: './fermeture-colis-ordinaire.component.scss',
    providers: [MessageService],
})
export class FermetureColisOrdinaireComponent implements OnInit{
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
    selectedCourriers!: Fermeturedto;
    suiviCourriers:any={}
    Listfermetures: any;
    paysOrigine: Paysdto={};
    libelleStructur: string
    selectedFermeture: any = null;




    constructor( private colisService: ColisService,
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
                 private fermetrureService : FermetureService

    ) {



    }


    // load() {
    //     this.loading = true;
    //
    //     setTimeout(() => {
    //         this.loading = false
    //     }, 2000);
    // }

    ngOnInit(): void {
        this.structureService.getBureaux().subscribe(
            (result) => {
                this.structure$ = result;
            }
        );
        this.iduser= this.sessionService.getAgentAttributes()?.id
        this.statutCourrierService.findAll().subscribe((data)=>{
            this.statutCourriers=data;
            console.log(this.statutCourrier)

            this.idStatutFermetureCourrier =this.statutCourriers = data.filter(statut => statut.id === 21);
            console.log(this.idStatutFermetureCourrier[0].id);
            this.getFermetureByStructure()
        })
        this.paysOrigine.id = 210
        console.log(this.iduser)
        this.getCourriers()
        this.getTypeCourrierById()

    }
    getTypeCourrierById(){

        this.typeCourrierService.getById("2").subscribe(
            (result) => {
                this.typeCourrier = result;
                console.log(this.typeCourrier)
            }
        );
    }


    getFermetureByStructure(){
        const idstructureDest= this.sessionService.getAgentAttributes().structureId.toString()
        const idStatutCourrier = this.idStatutFermetureCourrier[0].id
        const typeCourrierId = 2

        console.log(idStatutCourrier)
        this.fermetrureService.getFermeturesByCriteria(idstructureDest,idStatutCourrier,typeCourrierId).subscribe((data)=>{
            this.Listfermetures=data;
            console.log(this.Listfermetures)
            this.Listfermetures.map(fermeture => {

                const idStrure = fermeture?.structureDepotId.toString()
                return this.structureService.getOne(idStrure).subscribe((structure)=>{
                    this.libelleStructur=structure.libelle
                })
            });
            console.log(this.Listfermetures)
        })

    }



    getCourriers(){
        const idType ="2"
        const idStatu= '20'
        const idStructureDepo = this.sessionService.getAgentAttributes().structureId.toString()
        this.courrierService.findCourrierByStrutureDestinationAndStatutIdAndTypeCourrier(idStructureDepo, idStatu,idType).subscribe(
            (result) => {
                this.listeColis= result;
                console.log(this.listeColis)
            }
        );
    }



    // Afficher les détails d'une fermeture
     // Afficher les détails d'une fermeture
     showDetails(fermeture: any): void {
        console.log(fermeture);

        this.selectedFermeture = fermeture;
        console.log(fermeture.id)
        const id1 = fermeture.id
        this.router.navigate(['arriere/reception/receptionColis/'+id1]);  // Passe l'ID de la fermeture dans l'URL


    }


}
