import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // add this
import { ProduitDto, ProduitService } from 'src/app/proxy/produits';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
    selector: 'app-produit',
    templateUrl: './produit.component.html',
    styleUrls: ['./produit.component.scss'],
    providers: [MessageService],
})
export class ProduitComponent implements OnInit {
    form: FormGroup;

    isModalOpen = false;

    produitDialog: boolean = false;

    deleteProduitDialog: boolean = false;

    produits: ProduitDto[] = [];

    produit: ProduitDto = {};

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private produitService: ProduitService,
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
            libelle: [this.produit.libelle || '', Validators.required],
            description: [this.produit.libelle || '', Validators.required],
            active: [this.produit.active],
        });
    }

    openNew() {
        this.produit = {};
        this.produit.active = true;
        this.buildForm();
        this.produitDialog = true;
    }

    editProduit(produit: ProduitDto) {
        this.produitService.getOneById(produit.id).subscribe((produit) => {
            this.produit = { ...produit };
            this.buildForm();
            this.produitDialog = true;
        });
    }

    deleteProduit(produit: ProduitDto) {
        this.deleteProduitDialog = true;
        this.produit = { ...produit };
    }

    confirmDelete() {
        this.deleteProduitDialog = false;
        this.produitService
            .delete(this.produit.id)
            .subscribe(() => this.getAll());
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Produit Deleted',
            life: 3000,
        });
        this.produit = {};
    }

    hideDialog() {
        this.produitDialog = false;
    }

    saveProduit() {
        if (this.form.invalid) {
            return;
        }

        if (this.produit.id) {
            // @ts-ignore
            this.form.value.id = this.produit.id;
            this.produitService
                .update(this.produit.id, this.form.value)
                .subscribe(
                    () => {
                        this.produitDialog = false;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Produit Updated',
                            life: 3000,
                        });
                        this.produit = {};
                        this.getAll();
                    },
                    (error) => {
                        this.messageService.add({
                            severity: 'danger',
                            summary: 'Error',
                            detail: 'Erreur Modification',
                            life: 3000,
                        });
                        this.produitDialog = true;
                    }
                );
        } else {
            // @ts-ignore
            this.produitService.save(this.form.value).subscribe(
                () => {
                    this.produitDialog = false;
                    this.getAll();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Produit Created',
                        life: 3000,
                    });
                    this.produit = {};
                },
                (error) => {
                    this.messageService.add({
                        severity: 'danger',
                        summary: 'Error',
                        detail: 'Erreur enregistrement',
                        life: 3000,
                    });
                    this.produitDialog = true;
                }
            );
        }

        //this.produits = [...this.produits];
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    getAll() {
        this.produitService.findAll().subscribe(
            (result) => {
                this.produits = result;
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
