import {Component, OnInit, ViewChild} from "@angular/core";
import {MessageService} from "primeng/api";
import {CourrierDto, CourrierService} from "../../../proxy/courrier";
import {Table} from "primeng/table";
import {StructureDto, StructureService} from "../../../proxy/structures";
import {TypeCourrierDto, TypeCourrierService} from "../../../proxy/type-courrier";
import {StatutCourrierService, Statutdto} from "../../../proxy/statut-courrier";
import {Paysdto} from "../../../proxy/pays";
import {ColisService} from "../../../proxy/colis";
import {PdfService} from "../../../proxy/pdf/pdf.service";
import {SessionService} from "../../../proxy/auth/Session.service";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {SuiviCourrierService} from "../../../proxy/suiviCourrier";
import {FermetureService} from "../../../proxy/fermeture";


@Component({
  selector: 'app-fermeture-packet-interieur',

  templateUrl: './fermeture-packet-interieur.component.html',
  styleUrl: './fermeture-packet-interieur.component.scss',
    providers: [MessageService],

})
export class FermeturePacketInterieurComponent implements  OnInit{

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

    }


    getFermetureByStructure() {
        const idstructureDest = this.sessionService.getAgentAttributes().structureId.toString();
        const idStatutCourrier = this.idStatutFermetureCourrier[0].id;
        const typeCourrierId = 3;

        console.log(idStatutCourrier);

        this.fermetrureService.getFermeturesByCriteria(idstructureDest, idStatutCourrier, typeCourrierId)
            .subscribe((data) => {
                // Filtrer les fermetures qui ont des fermetureCourriers non vides
                 this.Listfermetures = data
                console.log(this.Listfermetures);

                // Mettre à jour les libellés des structures
                this.Listfermetures.forEach(fermeture => {
                    const idStrure = fermeture?.structureDepotId.toString();
                    this.structureService.getOne(idStrure).subscribe((structure) => {
                        fermeture.libelleStructure = structure.libelle; // Mettre à jour directement dans l'objet fermeture
                    });
                });

                console.log(this.Listfermetures);
            });
    }





    // Afficher les détails d'une fermeture
    showDetails(fermeture: any): void {
        this.selectedFermeture = fermeture;
        console.log(this.selectedFermeture.id)
        const id1 = this.selectedFermeture.id
        this.router.navigate(['messageriePacket/reception-packet-import/'+id1]);  // Passe l'ID de la fermeture dans l'URL


    }


}
