
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PdfService } from 'src/app/proxy/pdf/pdf.service';
import {KeycloakProfile} from "keycloak-js";
import {KeycloakService} from "keycloak-angular";
import { SessionService } from 'src/app/proxy/auth/Session.service';
import { UserDto } from 'src/app/proxy/users';
import { CourrierDto, CourrierSearchDto, CourrierService } from 'src/app/proxy/courrier';

@Component({
    selector: 'app-rapport-agent',
  templateUrl: './rapport-agent.component.html',
    providers: [MessageService],
  })
  export class RapportAgentComponent implements OnInit {
    form: FormGroup;
    public isLoggedIn = false;
    public userProfile: KeycloakProfile | null = null;
    user: UserDto = {};
    fullname = "";
    isModalOpen = false;
    montant = 0;
    courrierSearch: CourrierSearchDto={};
    courrier$: CourrierDto[]=[];
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    id ="";
    loadingCourrier: boolean = false;
    loadingReset: boolean = false;


    @ViewChild('dt') dt: Table;

    constructor(
        private pdfService: PdfService,
        private sessionService: SessionService,
        private courrierService: CourrierService,
        private fb: FormBuilder,
        private router: Router,
        private route : ActivatedRoute,
        private messageService: MessageService,private readonly keycloak: KeycloakService
    ) {}

    resetForm(){
        this.loadingReset = true;
        setTimeout(() => {
                this.loadingReset = false
            },1000);
        this.buildForm();
        this.getAllCourrier();
    }

    async ngOnInit(): Promise<void> {
        this.user = this.sessionService.getAgentAttributes();
        this.isLoggedIn = await this.keycloak.isLoggedIn();
        this.fullname = this.user.prenom + " " + this.user.nom;
        this.buildForm();
        this.getAllCourrier();


    }

    buildForm() {
        this.form = this.fb.group({
            debut: [this.courrierSearch.debut ? new Date(this.courrierSearch.debut) : new Date(), Validators.required],
            fin: [this.courrierSearch.fin ? new Date(this.courrierSearch.fin) : new Date(), Validators.required],
            structureDepotId: [this.sessionService.getAgentAttributes().structureId],
        });
    }

    searchCourrierByPeriod() {
        this.loadingCourrier = true;
        setTimeout(() => {
            this.loadingCourrier = false
        },
            1000);
       this.form.value.userId = this.user.id;
        this.courrierService.findCourrierByAgent(this.form.value).subscribe(courrier=>{
            this.courrier$=courrier.filter(c => c.statutCourrierId !==27);
            this.montant = this.courrier$.reduce((sum, item) => sum + Number(item.montant), 0);
        });
    }

    getAllCourrier(){

        this.form.value.userId = this.user.id;
        this.courrierService.findCourrierByAgent(this.form.value).subscribe(courrier=>{
            this.courrier$=courrier.filter(c => c.statutCourrierId !==27);
            this.montant = this.courrier$.reduce((sum, item) => sum + Number(item.montant), 0);
        });
    }

    generatePdf(): void{
       // this.pdfService.generateAgentSalesReport(this.courrier$).then(r => "pdf généré");
  }

    isEmpty(){
        return this.form.value.debut!=null && this.form.value.fin!=null;
    }

}
