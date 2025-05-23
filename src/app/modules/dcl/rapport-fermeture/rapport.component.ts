
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import {ColisDto, ColisSearchDto, ColisService, CreateUpdateColisDto } from 'src/app/proxy/colis';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PdfService } from 'src/app/proxy/pdf/pdf.service';
import {KeycloakProfile} from "keycloak-js";
import {KeycloakService} from "keycloak-angular";
import { SessionService } from 'src/app/proxy/auth/Session.service';
import { UserDto } from 'src/app/proxy/users';
import { StructureDto, StructureService } from 'src/app/proxy/structures';
import {CourrierDto, CourrierSearchDto, CourrierService} from "../../../proxy/courrier";
import {StatutCourrierService, Statutdto} from "../../../proxy/statut-courrier";
import {TypeCourrierDto, TypeCourrierService} from "../../../proxy/type-courrier";
import {Paysdto, PaysService} from "../../../proxy/pays";
import {Fermeturedto, FermetureSearchDto, FermetureService} from "../../../proxy/fermeture";
import {ProgressSpinner} from "primeng/progressspinner";

@Component({
    selector: 'app-rapport',
  templateUrl: './rapport.component.html',
    providers: [MessageService, ProgressSpinner],
  })
  export class RapportComponent implements OnInit {
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
    fermetureSearchDto: FermetureSearchDto={}
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
            startDate: [this.fermetureSearchDto.startDate , Validators.required],
            endDate: [this.fermetureSearchDto.endDate , Validators.required],
            bureauDepotId: [null],
            userId: [this.fermetureSearchDto.userId],
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
            // Appeler le service avec les dates formatées
            this.attente=false
            this.form.value.structureDepotId= this.form.value.bureauDepotId
           // this.form.value.userId= this.user.id
            console.log(this.form.value)
            this.fermetureService.getRapport(this.form.value).subscribe(fermeture => {
                this.fermetures = fermeture;
                console.log(this.fermetures)
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
        this.router.navigate(['dcl/courrier-details-rapportt/courrierDetailArriere/'+id1]);  // Passe l'ID de la fermeture dans l'URL

    }

    generatePdf(): void{
        //this.pdfService.generateAgentSalesReport(this.colis$).then(r => "pdf généré");
  }

    isEmpty(){
        return this.form.value.debut!=null && this.form.value.fin!=null;
    }

}
