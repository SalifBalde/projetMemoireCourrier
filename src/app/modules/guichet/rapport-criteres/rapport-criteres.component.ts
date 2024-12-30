import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {KeycloakProfile} from "keycloak-js";
import {Table} from "primeng/table";
import {PdfService} from "../../../proxy/pdf/pdf.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {KeycloakService} from "keycloak-angular";
import {CourrierDto} from "../../../proxy/courrier";
import {ColisDto, ColisSearchDto, ColisService} from "../../../proxy/colis";

@Component({
  selector: 'app-rapport-criteres',
  templateUrl: './rapport-criteres.component.html',
    providers:[MessageService]
})
export class RapportCriteresComponent {
    form: FormGroup;
    isModalOpen = false;
    montant = 0;
    colis$ : ColisDto[]=[];
    colisSearch : ColisSearchDto= {};
    formDialog : boolean = false;
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    id ="";
    @ViewChild('dt') dt: Table;

    constructor(
        private colisService: ColisService,
        private pdfService: PdfService,
        private fb: FormBuilder,
        private router: Router,
        private route : ActivatedRoute,
        private messageService: MessageService,private readonly keycloak: KeycloakService
    ) {}

    loadingColis: boolean = false;
    loadingReset: boolean = false;
    colisByCriteres: string;
    date: Date;
    fullname: string;

    resetForm(){
        this.loadingReset = true;
        setTimeout(() => {
            this.loadingReset = false
        },1000);
       this.buildForm();
    }

    generatePdf(): void{
       // this.pdfService.generateAgentSalesReport(this.colis$);
    }

    async ngOnInit(): Promise<void> {
        this.buildForm();
    }

    buildForm() {
        this.form = this.fb.group({
            debut: [this.colisSearch.debut || new Date().toISOString().substring(0, 10), Validators.required],
            fin: [this.colisSearch.fin || new Date().toISOString().substring(0, 10), Validators.required],
            prenom:[this.colisSearch.prenom],
            nom:[this.colisSearch.nom]
        });
    }


    searchColisByCriteres() {
        this.loadingColis = true;
        setTimeout(() => {
                this.loadingColis = false
            },
            1000);
        this.colisService.findColisByCriteres(this.form.value).subscribe(colis=>{
            this.colis$=colis;
            this.montant = this.colis$.reduce((sum, item) => sum + parseInt(item.montant), 0);
        })
    }

    isEmpty(){
        return this.form.value.dateFin!=null && this.form.value.dateDebut!=null&& this.form.value.prenom!=null && this.form.value.nom!=null;
    }
}
