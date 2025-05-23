import { Component, ViewChild } from '@angular/core';
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
import {PoidCourrierDto, PoidCourrierService} from "../../../proxy/poidCourrier";
import {PoidsCourrierService} from "../../../proxy/poids-courrier";
import {CategorieDto, CategorieService} from "../../../proxy/categorie";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {DatePipe} from "@angular/common";
import * as XLSX from 'xlsx';
import {saveAs} from "file-saver";


@Component({
    selector: 'app-rapport-criteres',
    templateUrl: './rapport-criteres.component.html',
    providers: [MessageService]
})
export class RapportCriteresComponent {
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
    categorie$: CategorieDto[] = [];
    loadingcourrier: boolean = false;
    loadingReset: boolean = false;
    courrierByCriteres: string;
    date: Date = new Date();
    fullname: StructureDto;
    poid$: PoidCourrierDto[] = [];



    @ViewChild('dt') dt: Table;

    constructor(
        private courrierService: CourrierService,
        private pdfService: PdfService,
        private fb: FormBuilder,
        private router: Router,
        private statutCourrierService: StatutCourrierService,
        private tyoeCourrierService : TypeCourrierService,
        private categorieService : CategorieService,
        private structureService: StructureService,
        private paysService : PaysService,
        private poidService: PoidsCourrierService,
        private messageService: MessageService,
        private readonly keycloak: KeycloakService,
        private datePipe: DatePipe
    ) { }


    resetForm() {
        this.loadingReset = true;
        setTimeout(() => {
            this.loadingReset = false
        }, 1000);
        this.buildForm();
    }
    /** Formatte un nombre entier en "1.234.567" */
    private formatWithPoint(num: number): string {
        const str = Math.trunc(num).toString();
        return str.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    async generatePdf() {
        const doc = new jsPDF('landscape', 'mm', 'a4');
        const pageWidth = doc.internal.pageSize.getWidth();

        // 1) Préparer les valeurs
        const date     = this.datePipe.transform(new Date(), 'dd/MM/yyyy')!;
        const debut    = this.datePipe.transform(this.form.get('debut')?.value, 'dd/MM/yyyy')!;
        const fin      = this.datePipe.transform(this.form.get('fin')?.value, 'dd/MM/yyyy')!;
        const bureau   = this.fullname?.libelle || '';
        const nombre   = this.courrier$?.length || 0;
        const total    = this.montant || 0;
        const totalText = this.formatWithPoint(total) + ' FCFA';

        // 2) Charger et dessiner le logo à gauche
        const logoDataUrl = await this.loadImage('assets/layout/images/laposte.jpeg');
        if (logoDataUrl) {
            const logoWidth  = 20;  // largeur en mm
            const logoHeight = 18;  // hauteur en mm
            doc.addImage(logoDataUrl, 'PNG', 14, 10, logoWidth, logoHeight);
        }

        // 3) En-tête texte
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        doc.text(`Date : ${date}`, pageWidth - 14, 15, { align: 'right' });

        doc.setFontSize(16);
        doc.setTextColor(0, 112, 192);
        doc.text(`Rapport : du ${debut} au ${fin}`, pageWidth / 2, 15, { align: 'center' });

        // 4) Infos complémentaires à gauche sous le logo
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        let y = 40;
        doc.text(`Bureau : ${bureau}`, 14, y);
        y += 6;
        doc.text(`Nombre : ${nombre}`, 14, y);
        y += 6;
        doc.setFont('helvetica', 'bold');
        doc.text(`Total : ${totalText}`, 14, y);
        doc.setFont('helvetica', 'normal');
        y += 10;

        // 5) Préparer le tableau
        const headers = [[
            'Code', 'Expéditeur', 'Pays Origine', 'Pays Destination',
            'Type Courrier', 'Poids', 'Catégorie', 'Statut',
            'Montant', 'Date'
        ]];

        const data = (this.courrier$ || []).map(c => [
            c.codeBarre,
            `${c.expediteurPrenom || ''} ${c.expediteurNom || ''}`.trim(),
            c.paysOrigineLibelle || '',
            c.paysDestinationLibelle || '',
            c.typeCourrierLibelle || '',
            c.poids?.toString() || '',
            c.categorieLibelle || '',
            c.statutCourrierLibelle || '',
            c.montant?.toString() || '',
            this.datePipe.transform(c.createdAt, 'dd/MM/yyyy') || ''
        ]);

        // 6) Générer la table
        autoTable(doc, {
            head: headers,
            body: data,
            startY: y,
            styles: {
                fontSize: 8,
                cellPadding: 2,
                overflow: 'linebreak',
                halign: 'left'
            },
            showHead: 'firstPage',
            columnStyles: {
                0: { cellWidth: 27 },
                1: { cellWidth: 35 },
                2: { cellWidth: 25 },
                3: { cellWidth: 25 },
                4: { cellWidth: 25 },
                5: { cellWidth: 15 },
                6: { cellWidth: 25 },
                7: { cellWidth: 25 },
                8: { cellWidth: 20 },
                9: { cellWidth: 20 }
            }
        });

        // 7) Sauvegarde
        doc.save(`rapport-courriers-${date}.pdf`);
    }


    generateExcel() {
        const headers = [
            'CodeBarre',
            'Expéditeur',
            'Pays Origine',
            'Pays Destination',
            'Type Courrier',
            'Poids',
            'Catégorie',
            'Statut Courrier',
            'Montant',
            'Date'
        ];

        const data = this.courrier$?.map(c => ({
            CodeBarre: c.codeBarre,
            Expéditeur: `${c.expediteurPrenom || ''} ${c.expediteurNom || ''}`.trim(),
            'Pays Origine': c.paysOrigineLibelle || '',
            'Pays Destination': c.paysDestinationLibelle || '',
            'Type Courrier': c.typeCourrierLibelle || '',
            Poids: c.poids,
            Catégorie: c.categorieLibelle || '',
            'Statut Courrier': c.statutCourrierLibelle || '',
            Montant: c.montant,
            Date: this.datePipe.transform(c.createdAt, 'dd/MM/yyyy')
        })) || [];

        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data, { header: headers });

        const workbook: XLSX.WorkBook = {
            Sheets: { 'Rapport Courriers': worksheet },
            SheetNames: ['Rapport Courriers']
        };
        const excelBuffer: any = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'array'
        });

        // 5. Enregistrer le fichier avec FileSaver
        const blob: Blob = new Blob([excelBuffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        saveAs(blob, `rapport-courriers-${this.datePipe.transform(new Date(), 'ddMMyyyy')}.xlsx`);
    }

    private loadImage(src: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                if (ctx) {
                    ctx.drawImage(img, 0, 0);
                    resolve(canvas.toDataURL("image/png"));
                } else {
                    reject(new Error("Failed to get canvas context"));
                }
            };
            img.onerror = () => reject(new Error("Image failed to load: " + src));
            img.src = src;
        });
    }


    async ngOnInit(): Promise<void> {
        this.buildForm();
        this.setCourrier()
    }

    buildForm() {
        this.form = this.fb.group({
            debut: [this.courrierSearch.debut , Validators.required],
            fin: [this.courrierSearch.fin , Validators.required],
            structureDestinationId: [null],
            structureDepotId: [null],
            typeCourrierId: [null],
            statutCourrierId: [null],
            paysOrigineId: [null],
            paysDestinationId:[null],
            poidsMin: [null],
            poidsMax: [null],
            bureauDepotId:[null],
            categorieId:[null]
        });
    }

    setCourrier() {
        this.statutCourrierService.findAll().subscribe(result => {
            this.statutCourrier$ = result;
        });
      this.categorieService.findAll().subscribe(result => {
            this.categorie$ = result;
        });

        this.tyoeCourrierService.findAll().subscribe(result => {
            this.typeCourrier$ = result;
        });

        this.structureService.getBureaux().subscribe(result => {
            this.structure$ = result;
        });
        this.structureService.getOne(this.form.value.bureauDepotId).subscribe(result => {
            this.fullname = result;
        });
        this.paysService.findAll().subscribe(result =>{
            this.pays$= result;
        })
        this.poidService.findAll().subscribe(result =>{
            this.poid$= result;
            console.log('result',result)
        })
    }

    searchcourrierByCriteres() {
        console.log(this.form.value.bureauDepotId)
        this.structureService.getOne(this.form.value.bureauDepotId).subscribe(result => {
            this.fullname = result;
            console.log(this.fullname)
        });

        this.form.value.structureDepotId = this.form.value.bureauDepotId
        console.log(this.form.value)
        this.loadingcourrier = true;
        setTimeout(() => {
            this.loadingcourrier = false
        },
            1000);
        this.courrierService.findCourrierByCriteresDcl(this.form.value).subscribe(courrier => {
            this.courrier$ = courrier;
            console.log(this.courrier$)
            this.montant = this.courrier$.reduce((sum, item) => sum + Number(item.montant), 0);
        })
        this.courrier$=null
        this.montant=null

    }

    isEmpty() {
        return !this.form.value.debut && !this.form.value.fin &&
           !this.form.value.structureDepotId && !this.form.value.structureDestinationId &&
           !this.form.value.typeCourrierId && !this.form.value.statutCourrierId && !this.form.value.paysOrigineId && !this.form.value.paysDestinationId;
    }
}
