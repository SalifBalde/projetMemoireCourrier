import {Component, OnInit, ViewChild} from '@angular/core';
import {ColisDto, ColisService} from "../../../../proxy/colis";
import {CourrierDto, CourrierService} from "../../../../proxy/courrier";
import {PdfService} from "../../../../proxy/pdf/pdf.service";
import {SessionService} from "../../../../proxy/auth/Session.service";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {StructureDto, StructureService} from "../../../../proxy/structures";
import {MessageService} from "primeng/api";
import {StatutCourrierService, Statutdto} from "../../../../proxy/statut-courrier";
import {TypeCourrierDto, TypeCourrierService} from "../../../../proxy/type-courrier";
import {SuiviCourrierService} from "../../../../proxy/suivi-courrier";
import {FermetureService} from "../../../../proxy/fermeture";
import {Table} from "primeng/table";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-fermeture-courrier-import',
  templateUrl: './fermeture-courrier-import.component.html',
  styleUrl: './fermeture-courrier-import.component.scss',
    providers: [MessageService],

})
export class FermetureCourrierImportComponent implements OnInit{
    statutCourrier:Statutdto
    idStatutFermetureCourrier: any;
    statutCourriers: Statutdto[];
    typeCourrier: TypeCourrierDto;
    user:any;
    iduser: any;
    suiviCourriers:any={}
    Listfermetures: any[]=[];
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
    listeCourriers: [CourrierDto];

    buttonSeverity: string = 'danger';
    listeInitiale: CourrierDto[] = [];
    courriersReceptions: CourrierDto[] = [];
    listeCourriersDepos: CourrierDto[]=[];

    cities: any[] | undefined;

    selectedCity: any | undefined;
    courrier: any={};
    isVide: boolean=false
    selectedFermeture: any = null;
    libelleStructur: string




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
        private fermetrureService : FermetureService

    ) {}

    ngOnInit(): void {

        this.structureService.getBureaux().subscribe(
            (result) => {
                this.structure$ = result;
            }
        );
        this.iduser=this.sessionService.getAgentAttributes()?.id
        console.log(this.iduser)


        this.statutCourrierService.findAll().subscribe((data)=>{
            this.statutCourriers=data;


            this.idStatutFermetureCourrier =this.statutCourriers = data.filter(statut => statut.id === 21);
            console.log(this.idStatutFermetureCourrier[0].id);
            this.getFermetureByStructure()
        })




    }

    getFermetureByStructure(){
        const idstructureDest= this.sessionService.getAgentAttributes().structureId.toString()
        const idStatutCourrier = this.idStatutFermetureCourrier[0].id
        const typeCourrierId =  1
        console.log(typeCourrierId)
        this.fermetrureService.getFermeturesByStructureDestination(idstructureDest,idStatutCourrier,typeCourrierId).subscribe((data)=>{
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

    // Afficher les détails d'une fermeture
    showDetails(fermeture: any): void {
        this.selectedFermeture = fermeture;
        console.log(this.selectedFermeture.id)
        const id1 = this.selectedFermeture.id
       console.log('Navigating to:', ['/reception/receptionCourrierImport/'+id1]);
        this.router.navigate(['arriere/reception-import/receptionCourrierImport/'+id1]);  // Passe l'ID de la fermeture dans l'URL


    }
}
