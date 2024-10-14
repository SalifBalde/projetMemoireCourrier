
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

@Component({
    selector: 'app-reception',
  templateUrl: './reception.component.html',
    providers: [MessageService],
  })
  export class ReceptionComponent implements OnInit {
    form: FormGroup;
    isModalOpen = false;
    montant = 0;
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    id ="";
    structure$: StructureDto[];
    colis$!: ColisDto[];
    colis:ColisDto ={};
    openColisDialog: boolean = false;
    selectedColis!: ColisDto;


    @ViewChild('dt') dt: Table;

    constructor(
        private colisService: ColisService,
        private pdfService: PdfService,
        private sessionService: SessionService,
        private fb: FormBuilder,
        private router: Router,
        private route : ActivatedRoute,
        private structureService: StructureService,
        private messageService: MessageService
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

        this.getAllColis();

        this.buildForm();
    }

    buildForm() {
        this.form = this.fb.group({
            bureauDestinataireId: [undefined, Validators.required],
        });
    }

    getAllColis(){

        this.colisService.findColisByStatus("3",this.sessionService.getAgentAttributes().structureId).subscribe(
            (result) => {
                this.colis$ = result;
            }
        );
    }


    openDialog(colis: ColisDto) {
        this.openColisDialog = true;
        this.colis = { ...colis };
    }

    confirmReception() {
        this.openColisDialog = false;
        this.colisService
            .delete(this.colis.id)
            .subscribe(() => this.getAllColis());
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Poids Deleted',
            life: 3000,
        });
        this.colis = {};
    }


    saveReception() {
        if (this.form.invalid) {
            return;
        }

    this.colisService.savePoids(this.form.value).subscribe(
                (result) => {
                    this.getAllColis();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Colis expédié avec succés',
                        life: 3000,
                    });
                },
                (error) => {
                     this.messageService.add({
                        severity: 'danger',
                        summary: 'Error',
                        detail: 'Erreur enregistrement',
                        life: 3000,
                    });
                }
            );

    }



}
