import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // add this
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import {} from "../../../proxy/type-courriers";import {TypeCategorieDto, TypeCategorieService} from "../../../proxy/type-categorie";


@Component({
    selector: 'app-type-categorie',
    templateUrl: './type-categorie.component.html',
    styleUrls: ['./type-categorie.component.scss'],
    providers: [MessageService],

})
export class TypeCategorieComponent implements OnInit {
    form: FormGroup;

    isModalOpen = false;

    typeCategorieDialog: boolean = false;

    deletetypeCategorieDialog: boolean = false;

    typeCategories: TypeCategorieDto[] = [];

    typeCategorie: TypeCategorieDto = {};

    cols: any[] = [];

    TypeCategorieDto: TypeCategorieDto;

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private typeCategorieservice: TypeCategorieService,
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

    // savetypeCategorie() {
    //     if (this.form.invalid) {
    //         return;
    //     }
    // }
    buildForm() {
        this.form = this.fb.group({
            libelle: [this.typeCategorie.libelle || '', Validators.required],
            // active: [this.typeCategorie.active],
        });
    }

    openNew() {
        this.typeCategorie = {};
        //  this.typeCategorie.active = true;
        this.buildForm();
        this.typeCategorieDialog = true;
    }

    exportCSV() {

    }


    edittypeCategorie(typeCategorie: TypeCategorieDto) {
        this.typeCategorieservice.getOneById(typeCategorie.id).subscribe((typeCategorie) => {
            this.typeCategorie = {...typeCategorie};
            this.buildForm();
            this.typeCategorieDialog = true;
        });
    }

    deletetypeCategorie(typeCategorie: TypeCategorieDto) {
        this.deletetypeCategorieDialog = true;
        this.typeCategorie = {...typeCategorie};
    }

    confirmDelete() {
        this.deletetypeCategorieDialog = false;
        this.typeCategorieservice
            .delete(this.typeCategorie.id)
            .subscribe(() => this.getAll());
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'typeCategorie Deleted',
            life: 3000,
        });
        this.typeCategorie = {};
    }

    hideDialog() {
        this.typeCategorieDialog = false;
    }

    savetypeCategorie() {
        if (this.form.invalid) {
            return;
        }

        if (this.typeCategorie.id) {

            console.log(this.form.value.libelle)
            console.log(this.form.value)
            // @ts-ignore
            this.form.value.id = this.typeCategorie.id;
            this.typeCategorieservice
                .update(this.typeCategorie.id, this.form.value)
                .subscribe(
                    () => {
                        this.typeCategorieDialog = false;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'typeCategorie Updated',
                            life: 3000,
                        });
                        this.typeCategorie = {};
                        this.getAll();
                    },
                    (error) => {
                        this.messageService.add({
                            severity: 'danger',
                            summary: 'Error',
                            detail: 'Erreur Modification',
                            life: 3000,
                        });
                        this.typeCategorieDialog = true;
                    }
                );
        } else {
            this.TypeCategorieDto = this.form.value
            this.typeCategorieservice.save(this.TypeCategorieDto).subscribe(
                () => {
                    this.typeCategorieDialog = false;
                    this.getAll();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'typeCategorie Created',
                        life: 3000,
                    });
                    this.typeCategorie = {};
                },
                (error) => {
                    this.messageService.add({
                        severity: 'danger',
                        summary: 'Error',
                        detail: 'Erreur enregistrement',
                        life: 3000,
                    });
                    this.typeCategorieDialog = true;
                }
            );
        }

        //this.typeCategories = [...this.typeCategories];
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    getAll() {
        this.typeCategorieservice.findAll().subscribe(
            (result) => {
                this.typeCategories = result;
                console.log(this.typeCategories)
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
