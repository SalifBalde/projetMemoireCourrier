import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // add this
import { TypeProduitDto, TypeProduitService } from 'src/app/proxy/type-produits';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
    selector: 'app-type-produit',
    templateUrl: './type-produit.component.html',
    styleUrl: './type-produit.component.scss',
    providers: [MessageService],
})
export class TypeProduitComponent implements OnInit {
    form: FormGroup;

    isModalOpen = false;

    typeproduitDialog: boolean = false;

    deleteTypeProduitDialog: boolean = false;

    typeproduits: TypeProduitDto[] = [];

    typeproduit: TypeProduitDto = {};

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private typeproduitService: TypeProduitService,
        private fb: FormBuilder,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.getAll();

        this.cols = [
            { field: 'libelle', header: 'Libelle' },
            { field: 'description', header: 'description' },
            { field: 'status', header: 'status' },
        ];

    }


    buildForm() {
        this.form = this.fb.group({
            libelle: [this.typeproduit.libelle || '', Validators.required],
            description: [this.typeproduit.libelle || '', Validators.required],
            active: [this.typeproduit.active],
        });
    }

    openNew() {
        this.typeproduit = {};
        this.typeproduit.active = true;
        this.buildForm();
        this.typeproduitDialog = true;
    }

    editTypeProduit(typeproduit: TypeProduitDto) {
        this.typeproduitService.getOneById(typeproduit.id).subscribe((typeproduit) => {
            this.typeproduit = { ...typeproduit };
            this.buildForm();
            this.typeproduitDialog = true;
        });
    }

    deleteTypeProduit(typeproduit: TypeProduitDto) {
        this.deleteTypeProduitDialog = true;
        this.typeproduit = { ...typeproduit };
    }

    confirmDelete() {
        this.deleteTypeProduitDialog = false;
        this.typeproduitService
            .delete(this.typeproduit.id)
            .subscribe(() => this.getAll());
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'TypeProduit Deleted',
            life: 3000,
        });
        this.typeproduit = {};
    }

    hideDialog() {
        this.typeproduitDialog = false;
    }

    saveTypeProduit() {
        if (this.form.invalid) {
            return;
        }

        if (this.typeproduit.id) {
            // @ts-ignore
            this.form.value.id = this.typeproduit.id;
            this.typeproduitService
                .update(this.typeproduit.id, this.form.value)
                .subscribe(
                    () => {
                        this.typeproduitDialog = false;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'TypeProduit Updated',
                            life: 3000,
                        });
                        this.typeproduit = {};
                        this.getAll();
                    },
                    (error) => {
                        this.messageService.add({
                            severity: 'danger',
                            summary: 'Error',
                            detail: 'Erreur Modification',
                            life: 3000,
                        });
                        this.typeproduitDialog = true;
                    }
                );
        } else {
            // @ts-ignore
            this.typeproduitService.save(this.form.value).subscribe(
                () => {
                    this.typeproduitDialog = false;
                    this.getAll();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'TypeProduit Created',
                        life: 3000,
                    });
                    this.typeproduit = {};
                },
                (error) => {
                    this.messageService.add({
                        severity: 'danger',
                        summary: 'Error',
                        detail: 'Erreur enregistrement',
                        life: 3000,
                    });
                    this.typeproduitDialog = true;
                }
            );
        }

        //this.typeproduits = [...this.typeproduits];
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    getAll() {
        this.typeproduitService.findAll().subscribe(
            (result) => {
                this.typeproduits = result;
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
