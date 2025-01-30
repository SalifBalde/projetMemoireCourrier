import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {KeycloakProfile} from "keycloak-js";
import {Table} from "primeng/table";
import {PdfService} from "../../../proxy/pdf/pdf.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {KeycloakService} from "keycloak-angular";
import { ExpeditionDto, ExpeditionService } from 'src/app/proxy/expeditions';
import { SessionService } from 'src/app/proxy/auth/Session.service';
import {UserDto} from "../../../proxy/users";
import {CourrierDto, CourrierSearchDto, CourrierService} from "../../../proxy/courrier";
import {ColisDto} from "../../../proxy/colis";
import {StructureDto, StructureService} from "../../../proxy/structures";
import {StatutCourrierService, Statutdto} from "../../../proxy/statut-courrier";
import {TypeCourrierDto, TypeCourrierService} from "../../../proxy/type-courrier";
import {Paysdto, PaysService} from "../../../proxy/pays";
import {Fermeturedto, FermetureService} from "../../../proxy/fermeture";
import {ProgressSpinner} from "primeng/progressspinner";

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrl: './rapport.component.scss',
    providers:[MessageService, ProgressSpinner]
})
export class RapportComponent {
    form: FormGroup;
    public isLoggedIn = false;
    public userProfile: KeycloakProfile | null = null;
    user: UserDto = {};
    userId:number
    fullname = "";
    isModalOpen = false;
    montant = 0;
    courrierSearch: CourrierSearchDto={};
    colis$: ColisDto[]=[];
    structure$: StructureDto[];
    status$ : any;
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    id ="";
    @ViewChild('dt') dt: Table;
    statutCourrier$: Statutdto[];
    typeCourrier$: [TypeCourrierDto];
    pays$: Paysdto[];
    loadingcourrier: boolean = false;
    courrier$: CourrierDto[];
    fermetures: Fermeturedto[]=[];
    selectedFermeture: any;
    attente: boolean=true
    loadingReset: boolean = false;
    datedebut: any ;
    datefin: any;
    structureId: number
    constructor(
        private courrierService: CourrierService,
        private paysService: PaysService,
        private sessionService: SessionService,
        private structureService: StructureService,
        private statutCourrierService: StatutCourrierService,
        private typeCourrierService: TypeCourrierService,
        private fermetureService: FermetureService,
        private fb: FormBuilder,
        private router: Router,
        private route : ActivatedRoute,
        private messageService: MessageService,private readonly keycloak: KeycloakService
    ) {}




    async ngOnInit(): Promise<void> {
        this.user = this.sessionService.getAgentAttributes();
        this.userId= Number(this.sessionService.getAgentAttributes().id)
        this.structureId = Number(this.sessionService.getAgentAttributes().structureId)

        this.isLoggedIn = await this.keycloak.isLoggedIn();
        this.fullname = this.user.prenom + " " + this.user.nom;
        this.buildForm();
        this.setCourrier()


    }

    resetForm(){
        this.loadingReset = true;
        setTimeout(() => {
            this.loadingReset = false
            this.datedebut =null;
            this.datefin =null;
        },1000);
        this.buildForm();

    }

    buildForm() {
        this.form = this.fb.group({
            debut: [this.courrierSearch.debut ? new Date(this.courrierSearch.debut) : new Date(), Validators.required],
            fin: [this.courrierSearch.fin ? new Date(this.courrierSearch.fin) : new Date(), Validators.required],
            structureDestinationId: [null],
            structureDepotId: [null],
            typeCourrierId: [null],
            statutCourrierId: [null],
            paysOrigineId: [null],
            paysDestinationId:[null]
        });
    }
    setCourrier() {
        this.statutCourrierService.findAll().subscribe(result => {
            this.statutCourrier$ = result;
        });

        this.typeCourrierService.findAll().subscribe(result => {
            this.typeCourrier$ = result;
        });

        this.structureService.getBureaux().subscribe(result => {
            this.structure$ = result;
        });

        this.paysService.findAll().subscribe(result =>{
            this.pays$= result;
        })
    }
    searchcourrierByCriteres() {
        this.loadingcourrier = true;
        setTimeout(() => {
                this.loadingcourrier = false
            },
            1000);
        this.courrierService.findCourrierByCriteres(this.form.value).subscribe(courrier => {
            this.courrier$ = courrier;
            console.log(this.courrier$)
            this.montant = this.courrier$.reduce((sum, item) => sum + Number(item.montant), 10);
        })
    }
    searchfermeture() {
        setTimeout(() => {
            console.log(this.datedebut , this.datefin ,this.structureId)
            // Formater les dates au format yyyy-MM-dd
            const formattedDebut = this.datedebut.toISOString().split('T')[0];
            const formattedFin = this.datefin.toISOString().split('T')[0];

            console.log (typeof formattedDebut, formattedFin);

            // Appeler le service avec les dates formatées
            this.attente=false
            this.fermetureService.getRapport(formattedDebut, formattedFin , this.structureId,this.userId).subscribe(fermeture => {
                this.fermetures = fermeture;
                if(this.fermetures.length > 0){
                    this.attente=true
                }


                console.log(this.fermetures);
            });
        }, 1000);
    }

    showDetails(fermeture: any): void {
        // Vérifiez que selectedFermeture est défini avant de l'utiliser
        if (!fermeture || !fermeture.id) {
            console.error("selectedFermeture est indéfini ou invalide.");
            return;
        }
        const id1 = fermeture.id
        this.router.navigate(['arriere/courrier-details-rapport/courrierDetailArriere/'+id1]);  // Passe l'ID de la fermeture dans l'URL



    }

    generatePdf(): void{
        //this.pdfService.generateAgentSalesReport(this.colis$).then(r => "pdf généré");
    }

    isEmpty(){
        return this.form.value.debut!=null && this.form.value.fin!=null;
    }

}
