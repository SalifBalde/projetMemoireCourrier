import {Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { KeycloakProfile } from "keycloak-js";
import { Table } from "primeng/table";
import { PdfService } from "../../../proxy/pdf/pdf.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { KeycloakService } from "keycloak-angular";
import { CourrierDto, CourrierSearchDto, CourrierService } from "../../../proxy/courrier";
import { StructureDto, StructureService } from 'src/app/proxy/structures';
import { StatutCourrierService, Statutdto } from 'src/app/proxy/statut-courrier';
import { TypeCourrierService,TypeCourrierDto } from 'src/app/proxy/type-courriers';
import { Paysdto, PaysService } from 'src/app/proxy/pays';
import { SessionService } from 'src/app/proxy/auth/Session.service';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {ExcelService} from "../../../proxy/pdf/ExcelService.service";

@Component({
    selector: 'app-rapport-criteres',
    templateUrl: './rapport-criteres.component.html',
    providers: [MessageService]
})
export class RapportCriteresComponent  implements  OnInit{
    form: FormGroup;
    isModalOpen = false;
    montant = 0;
    courrier$: CourrierDto[] = [];
    courrierSearch: CourrierSearchDto = {};
    formDialog: boolean = false;
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    id = "";
    structure$: StructureDto[] = [];
    pays$: Paysdto[] = [];
    typeCourrier$: TypeCourrierDto[] = [];
    statutCourrier$: Statutdto[] = [];
    loadingcourrier: boolean = false;
    loadingReset: boolean = false;
    courrierByCriteres: string;
    date: Date;
    fullname: string;
    tab = [];
    json= {CodeBarre : null, Expéditeur: null, PaysOrigine : null, PaysDestination: null, TypeCourrier: null, StatutCourrier: null, Montant: null};



    @ViewChild('dt') dt: Table;

    constructor(
        private courrierService: CourrierService,
        private pdfService: PdfService,
        private fb: FormBuilder,
        private router: Router,
        private statutCourrierService: StatutCourrierService,
        private tyoeCourrierService : TypeCourrierService,
        private structureService: StructureService,
        private paysService : PaysService,
        private sessionService : SessionService,
        private route: ActivatedRoute,
        private messageService: MessageService,
        private readonly keycloak: KeycloakService,
        public excelService: ExcelService,

    ) { }


    resetForm() {
        this.loadingReset = true;
        setTimeout(() => {
            this.loadingReset = false
        }, 1000);
        this.buildForm();
    }




    async ngOnInit(): Promise<void> {
        this.buildForm();
        this.setCourrier();

        this.cols = [
            {field: 'CodeBarre', header: 'CodeBarre'.trim()},
            {field: 'Expéditeur', header: 'Expéditeur'.trim()},
            {field: 'PaysOrigine', header: 'PaysOrigine'.trim()},
            {field: 'PaysDestination', header: 'PaysDestination'.trim()},
            {field: 'TypeCourrier', header: 'TypeCourrier'.trim()},
            {field: 'StatutCourrier', header: 'StatutCourrie'.trim()},
            {field: 'Montant', header: 'Montant'.trim()},
           // {field: 'Date', header: 'Date'.trim()},
        ];

    }
    exportPDF(courrier$ ) {
        this.tab = [];
        console.log(this.tab);

        for (let i = 0; i < this.courrier$?.length; i++) {
            const tb = {
                CodeBarre: this.courrier$[i]?.codeBarre,
                Expéditeur:this.courrier$[i]?.expediteurPrenom + " " + this.courrier$[i]?.expediteurNom,
                PaysOrigine: this.courrier$[i]?.paysOrigineLibelle,
                PaysDestination: this.courrier$[i]?.paysDestinationLibelle, // Correction ici
                TypeCourrier: this.courrier$[i]?.typeCourrierLibelle,
                StatutCourrier: this.courrier$[i]?.statutCourrierLibelle,
                Montant: this.courrier$[i]?.montant,
                // Date: this.courrier$[i].createdAt,
            };
            this.tab.push(tb); // Correction ici
        }

        console.log(this.tab);

        const columns = this.cols?.map(col => col.field);
        const data = this.tab.map(row => columns.map(col => row[col])); // Correction ici
        const dateRapport = new Date().toLocaleDateString('fr-FR'); // Date actuelle formatée en français


        console.log(data);

        const doc = new jsPDF();

        const debut = this.formatDate(this.form.value.debut);
        const fin = this.formatDate(this.form.value.fin);        // Texte principal en noir


        const structureLabel = "Structure : "; // Texte en noir
        const structureName = this.structure$[0]?.libelle; // Nom de la structure en bleu

// Afficher "Structure : " en noir
        doc.setTextColor(0, 0, 0);
        doc.text(structureLabel, 90, 20);

// Afficher le nom de la structure en bleu, juste après
        const structureWidth = doc.getTextWidth(structureLabel); // Largeur du texte noir pour l'alignement
        doc.setTextColor(0, 0, 255);
        doc.text(structureName, 90 + structureWidth, 20);

// Remettre le texte en noir pour le reste du document
        doc.setTextColor(0, 0, 0);

        doc.text(`  ${dateRapport}`, 165, 20);


        doc.setTextColor(0, 0, 0);
        doc.text("Rapport Courrier du  ", 40, 10);
// Dates en rouge
        doc.setTextColor(255, 0, 0);
        doc.text(debut + " Au " + fin, 95, 10);



        const logoImg = new Image();
       logoImg.src = "assets/layout/images/poste-removebg-preview.png";
        logoImg.onload = () => {
            doc.addImage(logoImg, 'PNG', 15, 15, 14, 14);

            autoTable(doc, {
                head: [columns],
                body: data,
                startY: 30,
            });

            console.log(this.tab);
            doc.save('Service'+ '_RapportPeriodiqueService.pdf');
        };
    }
    exportAsXLSX(courrier$):void {
        this.tab=[];
        for (let i = 0; i < this.courrier$.length; i++) {
            this.json.CodeBarre= this.courrier$[i].codeBarre,
                this.json.Expéditeur = this.courrier$[i]?.expediteurPrenom + " " + this.courrier$[i]?.expediteurNom,
                this.json.PaysOrigine = this.courrier$[i].paysOrigineLibelle,
                this.json.PaysDestination = this.courrier$[i].paysDestinationLibelle,
                this.json.TypeCourrier = this.courrier$[i].typeCourrierLibelle,
                this.json.StatutCourrier = this.courrier$[i].statutCourrierLibelle,
                this.json.Montant = this.courrier$[i].montant,


                this.tab.push({...this.json});
            // console.log(this.json)
        }
        this.excelService.exportAsExcelFile(this.tab);
        // console.log(this.tab)
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

     formatDate = (dateStr: string): string => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
    };
    setCourrier() {
        this.statutCourrierService.findAll().subscribe(result => {
            this.statutCourrier$ = result;
        });

        this.tyoeCourrierService.findAll().subscribe(result => {
            this.typeCourrier$ = result.filter(courrier => courrier?.id == '2');
        });

        this.structureService.getBureaux().subscribe(result => {
            this.structure$ = result;
            // this.structure$  = this.structure$ .filter(structure => structure.id !== this.sessionService.getAgentAttributes().structureId);
        });

        this.paysService.findAll().subscribe(result =>{
            this.pays$= result;
            console.log('result',result)
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

    isEmpty() {
        return !this.form.value.debut && !this.form.value.fin &&
           !this.form.value.structureDepotId && !this.form.value.structureDestinationId &&
           !this.form.value.typeCourrierId && !this.form.value.statutCourrierId && !this.form.value.paysOrigineId && !this.form.value.paysDestinationId;
    }
}
