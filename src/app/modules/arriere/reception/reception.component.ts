
import { Component, OnInit, ViewChild } from '@angular/core';

import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

//import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {ColisDto, ColisService, CreateUpdateColisDto } from 'src/app/proxy/colis';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StructureDto, StructureService } from 'src/app/proxy/structures';
import { PdfService } from 'src/app/proxy/pdf/pdf.service';
import { SessionService } from 'src/app/proxy/auth/Session.service';
import {CourrierDto, CourrierService} from "../../../proxy/courrier";
import {color} from "chart.js/helpers";

@Component({
    selector: 'app-reception',
  templateUrl: './reception.component.html',
    providers: [MessageService],
  })
  export class ReceptionComponent implements OnInit {
    form: FormGroup;
    myGroupReception:FormGroup;
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
    protected readonly color = color;


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

    ) {}

    loading: boolean = false;

    load() {
        this.loading = true;

        setTimeout(() => {
            this.loading = false
        }, 2000);
    }


    ngOnInit(): void {

        this.structureService.findAll().subscribe(
            (result) => {
                this.structure$ = result;
            }
        );



        this.getAllCourriers();
        this.getCourriersByStructure();
        this.getCourriers();

        this.buildForm();
    }

    buildForm() {
        this.form = this.fb.group({
            bureauDestinataireId: [undefined, Validators.required],
            listeSelect:[undefined,Validators.required]
        });
    }


    getCourriersByStructure(){
        console.log(this.sessionService.getAgentAttributes().structureId)

        this.courrierService.findCourrierByStrutureDepot(this.sessionService.getAgentAttributes().structureId).subscribe(
            (result) => {
                this.courriers = result;
                console.log(this.courriers)
            }
        );
    }
    getAllCourriers(){

        this.courrierService.findAll().subscribe(
            (result) => {
                this.listeCourrier = result;
                console.log(this.listeCourrier)
            }
        );
    }
    getCourriers(){
        const idType ="1"
        const idStatu= '1'
        const idStructureDepo = this.sessionService.getAgentAttributes().structureId.toString()
        this.courrierService.findCourrierByTypeCourrierAndStructureDepotAndIdStut(idType,idStructureDepo, idStatu).subscribe(
            (result) => {
                this.listeCourriers = result;
                console.log(this.listeCourriers)
            }
        );
    }
    isExpeditionDisabled(): boolean {
        return !this.selectedCourriers

    }


    openDialog(courrie: CourrierDto) {
        this.openCourrierDialog = true;
        this.courries = { ...courrie };
        console.log(courrie)
    }



    saveReception() {
        if (this.form.invalid) {
            return;
        }
     }




    confirmReception() {
        console.log(this.selectedCourriers);

        this.openCourrierDialog = false;

        this.selectedCourriers.forEach((courrier) => {
            courrier.statutCourrier = { id: 2 }; // Met le statut à 'réceptionné'
        });
        console.log(this.selectedCourriers);

        // Appel au service pour mettre à jour l'élément
        this.courrierService.updateCourriers(this.selectedCourriers).subscribe(
            (result) => {
                this.getCourriers();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Courrier réceptionné avec succès',
                    life: 3000,
                });
            },
            (error) => {
                // En cas d'erreur
                this.messageService.add({
                    severity: 'danger',
                    summary: 'Error',
                    detail: 'Erreur de réception',
                    life: 3000,
                });
            }
        );
    }


    getBadgeSeverity(statutCourrier: string ): string {
        switch (statutCourrier?.toLowerCase()) {
            case 'déposé': return 'danger';  // Rouge
            case 'reçu': return 'success';  // Vert
            default: return 'info';         // Bleu
        }
    }

}
