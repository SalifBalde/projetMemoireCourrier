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
import {FermetureService} from "../../../../proxy/fermeture";

@Component({
  selector: 'app-fermeture-colis-import',
  templateUrl: './fermeture-colis-import.component.html',
  styleUrl: './fermeture-colis-import.component.scss',
    providers: [MessageService],

})
export class FermetureColisImportComponent implements  OnInit{
    listeCourrier: [CourrierDto];
    listeColis: [CourrierDto];
    openColisDialog: boolean;
    colis: any={}
    @ViewChild('dt') dt: Table;
    structure$: [StructureDto];
    selectedColis: any;
    TypeCourrier:TypeCourrierDto
    statutCourrier:Statutdto
    statutCourriers: Statutdto[];
    idStatutFermetureCourrier: any;
    typeCourrier:TypeCourrierDto
    iduser:any
    selectedCourriers!: any;
    suiviCourriers:any={}
    Listfermetures: any;
    libelleStructur: string
    selectedFermeture: any = null;
    searchValue: string | undefined;




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
        this.structureService.findAll().subscribe(
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

        console.log(this.iduser)
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
        this.router.navigate(['arriere/reception-import/receptionColisImport/'+id1]);  // Passe l'ID de la fermeture dans l'URL


    }
    clear(table: Table) {
        table.clear();
        this.searchValue = ''
    }





}
