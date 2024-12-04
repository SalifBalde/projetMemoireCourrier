import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // add this
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import {TypeCourrierDto, TypeCourrierService} from "../../../proxy/type-courriers";


@Component({
    selector: 'app-type-courrier',
    templateUrl: './type-courrier.component.html',
    styleUrls: ['./type-courrier.component.scss'],
    providers: [MessageService],

})
export class TypeCourrierComponent implements OnInit {
    form: FormGroup;

    isModalOpen = false;

    typeCourrierDialog: boolean = false;

    deletetypeCourrierDialog: boolean = false;

    typeCourriers: TypeCourrierDto[] = [];

    typeCourrier: TypeCourrierDto = {};

    cols: any[] = [];

    typeCourrierDto: TypeCourrierDto;

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private TypeCourrierService: TypeCourrierService,
        private fb: FormBuilder,
        private messageService: MessageService
    ) {
    }

    ngOnInit(): void {
        this.getAll();

        this.cols = [
            {field: 'libelle', header: 'Libelle'},

        ];

    }

    savetypeCourrier() {
        if (this.form.invalid) {
            return;
        }
    }
    buildForm() {
        this.form = this.fb.group({
            libelle: [this.typeCourrier.libelle || '', Validators.required],
            // active: [this.TypeCourrier.active],
        });
    }

    openNew() {
        this.typeCourrier = {};
        //  this.TypeCourrier.active = true;
        this.buildForm();
        this.typeCourrierDialog = true;
    }

    exportCSV() {

    }


    editTypeCourrier(typeCourrier: TypeCourrierDto) {
        this.TypeCourrierService.getOneById(typeCourrier.id).subscribe((TypeCourrier) => {
            this.typeCourrier = {...TypeCourrier};
            this.buildForm();
            this.typeCourrierDialog = true;
        });
    }

    deleteTypeCourrier(typeCourrier: TypeCourrierDto) {
        this.deletetypeCourrierDialog = true;
        this.typeCourrier = {...typeCourrier};
    }

    confirmDelete() {
        this.deletetypeCourrierDialog = false;
        this.TypeCourrierService
            .delete(this.typeCourrier.id)
            .subscribe(() => this.getAll());
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'TypeCourrier Deleted',
            life: 3000,
        });
        this.typeCourrier = {};
    }

    hideDialog() {
        this.typeCourrierDialog = false;
    }

    saveTypeCourrier() {
        if (this.form.invalid) {
            return;
        }

        if (this.typeCourrier.id) {

            console.log(this.form.value.libelle)
            console.log(this.form.value)
            // @ts-ignore
            this.form.value.id = this.TypeCourrier.id;
            this.TypeCourrierService
                .update(this.typeCourrier.id, this.form.value)
                .subscribe(
                    () => {
                        this.typeCourrierDialog = false;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'TypeCourrier Updated',
                            life: 3000,
                        });
                        this.typeCourrier = {};
                        this.getAll();
                    },
                    (error) => {
                        this.messageService.add({
                            severity: 'danger',
                            summary: 'Error',
                            detail: 'Erreur Modification',
                            life: 3000,
                        });
                        this.typeCourrierDialog = true;
                    }
                );
        } else {
            this.typeCourrierDto = this.form.value
            this.TypeCourrierService.save(this.typeCourrierDto).subscribe(
                () => {
                    this.typeCourrierDialog = false;
                    this.getAll();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'TypeCourrier Created',
                        life: 3000,
                    });
                    this.typeCourrier = {};
                },
                (error) => {
                    this.messageService.add({
                        severity: 'danger',
                        summary: 'Error',
                        detail: 'Erreur enregistrement',
                        life: 3000,
                    });
                    this.typeCourrierDialog = true;
                }
            );
        }

        //this.TypeCourriers = [...this.TypeCourriers];
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    getAll() {
        this.TypeCourrierService.findAll().subscribe(
            (result) => {
                this.typeCourriers = result;
                console.log(this.typeCourriers)
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
