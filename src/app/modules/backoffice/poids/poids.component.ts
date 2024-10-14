import { Component, OnInit, ViewChild } from '@angular/core';

import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { PoidsDto, PoidsService } from 'src/app/proxy/poids';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

//import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
    selector: 'app-poids',
    templateUrl: './poids.component.html',
    styleUrls: ['./poids.component.scss'],
    providers: [MessageService],
})
export class PoidsComponent implements OnInit {
    form: FormGroup;
    isModalOpen = false;
    poidsDialog: boolean = false;
    deletePoidsDialog: boolean = false;
    poidss: PoidsDto[] = [];
    poids: PoidsDto = {};
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];

    @ViewChild('dt') dt: Table;

    constructor(
        private poidsService: PoidsService,
        private fb: FormBuilder,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.getAll();

        this.cols = [
            { field: 'libelle', header: 'Libelle' },
            { field: 'description', header: 'Description' },
            { field: 'status', header: 'Status' },
        ];

        this.buildForm();
    }

    buildForm() {
        this.form = this.fb.group({
            libelle: [this.poids.libelle || '', Validators.required],
            description: [this.poids.description || '', Validators.required],
            active: [this.poids.active],
        });
    }

    openNew() {
        this.poids = {};
        this.poids.active = true;
        this.buildForm();
        this.poidsDialog = true;
    }

    editPoids(poids: PoidsDto) {
        this.poidsService.getOneById(poids.id).subscribe((poids) => {
            this.poids = { ...poids };
            this.buildForm();
            this.poidsDialog = true;
        });
    }

    deletePoids(poids: PoidsDto) {
        this.deletePoidsDialog = true;
        this.poids = { ...poids };
    }

    confirmDelete() {
        this.deletePoidsDialog = false;
        this.poidsService
            .delete(this.poids.id)
            .subscribe(() => this.getAll());
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Poids Deleted',
            life: 3000,
        });
        this.poids = {};
    }

    hideDialog() {
        this.poidsDialog = false;
    }

    savePoids() {
        if (this.form.invalid) {
            return;
        }

        if (this.poids.id) {
            this.form.value.id = this.poids.id;
            this.poidsService
                .update(this.poids.id, this.form.value)
                .subscribe(
                    () => {
                        this.poidsDialog = false;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Poids Updated',
                            life: 3000,
                        });
                        this.poids = {};
                        this.getAll();
                    },
                    (error) => {
                        this.messageService.add({
                            severity: 'danger',
                            summary: 'Error',
                            detail: 'Erreur Modification',
                            life: 3000,
                        });
                        this.poidsDialog = true;
                    }
                );
        } else {
            this.poidsService.save(this.form.value).subscribe(
                () => {
                    this.poidsDialog = false;
                    this.getAll();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Poids Created',
                        life: 3000,
                    });
                    this.poids = {};
                },
                (error) => {
                    this.messageService.add({
                        severity: 'danger',
                        summary: 'Error',
                        detail: 'Erreur enregistrement',
                        life: 3000,
                    });
                    this.poidsDialog = true;
                }
            );
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    getAll() {
        this.poidsService.findAll().subscribe(
            (result) => {
                this.poidss = result;
            },
            (error) => {
                this.messageService.add({
                    severity: 'danger',
                    summary: 'Error',
                    detail: 'Erreur Serveur',
                    life: 3000,
                });
            }
        );
    }

   // exportPDF() {
     //   if (this.dt) {
       //     const columns = this.cols.map(col => col.field);
         //   const data = this.poidss.map(row => columns.map(col => row[col]));

           // const doc = new jsPDF();
            //autoTable(doc,{
              //  head: [columns],
                //body: data,
           // })
            //doc.save('table.pdf');
        //}
    //}

}
