import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms'; // add this

import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import {PoidsCourrierDto, PoidsCourrierService} from "../../../proxy/poids-courrier";

@Component({
    selector:'app-poids-courrier',
    templateUrl: './poids-courrier.component.html',
    styleUrls: ['./poids-courrier.component.scss'],
    providers: [MessageService],
})
export class PoidsCourrierComponent implements OnInit {
    disableSelect = new FormControl(false);
    form: FormGroup;
    poidsCourriers: PoidsCourrierDto[] = [];
    isModalOpen = false;
    poidsCourrierDialog: boolean = false;
    deletepoidsCourrierDialog: boolean = false;

    poidsCourrier: PoidsCourrierDto = {};
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];

    constructor(

        private poidsCourrierservice:PoidsCourrierService,
        private fb: FormBuilder,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.getAll();
        this.poidsCourriers=[];

        this.cols = [
            { field: 'tranche', header: 'tranche' },
            { field: 'min', header: 'min' },
            { field: 'max', header: 'max' },
        ];
        this.buildForm();
    }


    buildForm() {
        this.form = this.fb.group({
            tranche: [this.poidsCourrier.tranche || '', Validators.required],
            min: [this.poidsCourrier.min || '', Validators.required],
            max: [this.poidsCourrier.max || '', Validators.required],

        });
    }

    openNew() {
        this.poidsCourrier = {};
        this.buildForm();
        this.poidsCourrierDialog = true;
    }

    editpoidsCourrier(poidsCourrier: PoidsCourrierDto) {
        this.poidsCourrierservice.getOneById(poidsCourrier.id).subscribe((poidsCourrier) => {
            this.poidsCourrier = { ...poidsCourrier };

            this.buildForm();
            this.poidsCourrierDialog = true;
        });
    }

    deletepoidsCourrier(poidsCourrier: PoidsCourrierDto) {
        this.deletepoidsCourrierDialog = true;
        this.poidsCourrier = { ...poidsCourrier };
    }

    confirmDelete() {
        this.deletepoidsCourrierDialog = false;
        this.poidsCourrierservice
            .delete(this.poidsCourrier.id)
            .subscribe(() => this.getAll());
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'poidsCourrier Deleted',
            life: 3000,
        });
        this.poidsCourrier = {};
    }

    hideDialog() {
        this.poidsCourrierDialog = false;
    }

    savepoidsCourrier() {
        if (this.form.invalid) {
            return;
        }

        if (this.poidsCourrier.id) {
            this.form.value.id = this.poidsCourrier.id;
            this.poidsCourrierservice
                .update(this.poidsCourrier.id, this.form.value)
                .subscribe(
                    () => {
                        this.poidsCourrierDialog = false;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'poidsCourrier Updated',
                            life: 3000,
                        });
                        this.poidsCourrier = {};
                        this.getAll();
                    },
                    (error) => {
                        this.messageService.add({
                            severity: 'danger',
                            summary: 'Error',
                            detail: 'Erreur Modification',
                            life: 3000,
                        });
                        this.poidsCourrierDialog = true;
                    }
                );
        } else {
            this.poidsCourrierservice.save(this.form.value).subscribe(
                () => {
                    this.poidsCourrierDialog = false;
                    this.getAll();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'poidsCourrier Created',
                        life: 3000,
                    });
                    this.poidsCourrier = {};
                },
                (error) => {
                    this.messageService.add({
                        severity: 'danger',
                        summary: 'Error',
                        detail: 'Erreur enregistrement',
                        life: 3000,
                    });
                    this.poidsCourrierDialog = true;
                }
            );
        }

        //this.poidsCourriers = [...this.poidsCourriers];
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    getAll() {
        this.poidsCourrierservice.findAll().subscribe(
            (result) => {
                this.poidsCourriers = result;
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
}
