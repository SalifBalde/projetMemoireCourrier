import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // add this
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import {PartenaireDto, PartenaireService} from "../../../proxy/partenaires";

@Component({
    selector: 'app-partenaire',
    templateUrl: './partenaire.component.html',
    styleUrl: './partenaire.component.scss',
    providers: [MessageService],
})
export class PartenaireComponent implements OnInit {
    form: FormGroup;

    isModalOpen = false;

    partenaireDialog: boolean = false;

    deletePartenaireDialog: boolean = false;

    partenaires: PartenaireDto[] = [];

    partenaire: PartenaireDto = {};

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private partenaireService: PartenaireService,
        private fb: FormBuilder,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.getAll();

        this.cols = [
            { field: 'nom', header: 'Nom' },
            { field: 'telephone', header: 'telephone' },
            { field: 'adresse', header: 'adresse' },
        ];

    }


    buildForm() {
        this.form = this.fb.group({
            nom: [this.partenaire.nom || '', Validators.required],
            telephone: [this.partenaire.telephone || '', Validators.required],
            adresse: [this.partenaire.adresse || '', Validators.required],

            // active: [this.partenaire.active],
        });
    }

    openNew() {
        this.partenaire = {};
        //this.partenaire.active = true;
        this.buildForm();
        this.partenaireDialog = true;
    }

    editPartenaire(partenaire: PartenaireDto) {
        this.partenaireService.getOneById(partenaire.id).subscribe((partenaire) => {
            this.partenaire = { ...partenaire };
            this.buildForm();
            this.partenaireDialog = true;
        });
    }

    deletePartenaire(partenaire: PartenaireDto) {
        this.deletePartenaireDialog = true;
        this.partenaire = { ...partenaire };
    }

    confirmDelete() {
        this.deletePartenaireDialog = false;
        this.partenaireService
            .delete(this.partenaire.id)
            .subscribe(() => this.getAll());
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Partenaire Deleted',
            life: 3000,
        });
        this.partenaire = {};
    }

    hideDialog() {
        this.partenaireDialog = false;
    }

    savePartenaire() {
        if (this.form.invalid) {
            return;
        }

        if (this.partenaire.id) {
            // @ts-ignore
            this.form.value.id = this.partenaire.id;
            this.partenaireService
                .update(this.partenaire.id, this.form.value)
                .subscribe(
                    () => {
                        this.partenaireDialog = false;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Partenaire Updated',
                            life: 3000,
                        });
                        this.partenaire = {};
                        this.getAll();
                    },
                    (error) => {
                        this.messageService.add({
                            severity: 'danger',
                            summary: 'Error',
                            detail: 'Erreur Modification',
                            life: 3000,
                        });
                        this.partenaireDialog = true;
                    }
                );
        } else {
            // @ts-ignore
            this.partenaireService.save(this.form.value).subscribe(
                () => {
                    this.partenaireDialog = false;
                    this.getAll();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Partenaire Created',
                        life: 3000,
                    });
                    this.partenaire = {};
                },
                (error) => {
                    this.messageService.add({
                        severity: 'danger',
                        summary: 'Error',
                        detail: 'Erreur enregistrement',
                        life: 3000,
                    });
                    this.partenaireDialog = true;
                }
            );
        }

        //this.partenaires = [...this.partenaires];
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    getAll() {
        this.partenaireService.findAll().subscribe(
            (result) => {
                this.partenaires = result;
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
