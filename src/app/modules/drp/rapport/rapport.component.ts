
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

@Component({
    selector: 'app-rapport',
  templateUrl: './rapport.component.html',
    providers: [MessageService],
  })
  export class RapportComponent implements OnInit {
    form: FormGroup;
    public isLoggedIn = false;
    public userProfile: KeycloakProfile | null = null;
    user: UserDto = {};
    fullname = "";
    isModalOpen = false;
    montant = 0;
    colisSearch: ColisSearchDto={};
    colis$: ColisDto[]=[];
    structure$: StructureDto[];
    status$ : any;
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    id ="";
    @ViewChild('dt') dt: Table;

    constructor(
        private colisService: ColisService,
        private pdfService: PdfService,
        private sessionService: SessionService,
        private structureService: StructureService,
      //  private statusService: StatusService,
        private fb: FormBuilder,
        private router: Router,
        private route : ActivatedRoute,
        private messageService: MessageService,private readonly keycloak: KeycloakService
    ) {}

    loadingColis: boolean = false;
    loadingReset: boolean = false;



    async ngOnInit(): Promise<void> {
        this.user = this.sessionService.getAgentAttributes();
        this.isLoggedIn = await this.keycloak.isLoggedIn();
        this.fullname = this.user.prenom + " " + this.user.nom;
        this.buildForm();
        this.structureService.findAll().subscribe(
            (result) => {
                this.structure$ = result;
            }
        );

        this.structureService.findAll().subscribe(
            (result) => {
                this.structure$ = result;
            }
        );

        this.getAllColis();
    }

    resetForm(){
        this.loadingReset = true;
        setTimeout(() => {
                this.loadingReset = false
            },1000);
        this.buildForm();
        this.getAllColis();
    }

    buildForm() {
        this.form = this.fb.group({
            debut: [this.colisSearch.debut ? new Date(this.colisSearch.debut) : new Date(), Validators.required],
            fin: [this.colisSearch.fin ? new Date(this.colisSearch.fin) : new Date(), Validators.required],
            bureauDepotId: [this.colisSearch.bureauDepotId],
        });
    }

    searchColisByPeriod() {
        this.loadingColis = true;
        setTimeout(() => {
            this.loadingColis = false
        },
            1000);
       this.form.value.userId = this.user.id;
       this.colisSearch.debut =new Date( this.form.value.debut).toISOString().substring(0, 10);
       this.colisSearch.fin = new Date( this.form.value.fin).toISOString().substring(0, 10);
        this.colisService.findColisByCriteres(this.form.value).subscribe(coli=>{this.colis$=coli;
            this.montant = this.colis$.reduce((sum, item) => sum + parseInt(item.montant), 0);
        });
    }

    getAllColis(){

        this.form.value.userId = this.user.id;
        this.colisService.findColisByCriteres(this.form.value).subscribe(coli=>{this.colis$=coli;
            this.montant = this.colis$.reduce((sum, item) => sum + parseInt(item.montant), 0);
        });
    }

    generatePdf(): void{
        this.pdfService.generateAgentSalesReport(this.colis$).then(r => "pdf généré");
  }

    isEmpty(){
        return this.form.value.debut!=null && this.form.value.fin!=null;
    }

}
