import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // add this
import { TypeVehiculeDto, TypeVehiculeService } from 'src/app/proxy/type-vehicules';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
    selector: 'app-type-vehicule',
  templateUrl: './type-vehicule.component.html',
  styleUrl: './type-vehicule.component.scss',
    providers: [MessageService],
})
export class TypeVehiculeComponent implements OnInit {
    form: FormGroup;

    isModalOpen = false;

    typevehiculeDialog: boolean = false;

    deleteTypeVehiculeDialog: boolean = false;

    typevehicules: TypeVehiculeDto[] = [];

    typevehicule: TypeVehiculeDto = {};

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private typevehiculeService: TypeVehiculeService,
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
            libelle: [this.typevehicule.libelle || '', Validators.required],
            description: [this.typevehicule.libelle || '', Validators.required],
            active: [this.typevehicule.active],
        });
    }

    openNew() {
        this.typevehicule = {};
        this.typevehicule.active = true;
        this.buildForm();
        this.typevehiculeDialog = true;
    }

    editTypeVehicule(typevehicule: TypeVehiculeDto) {
        this.typevehiculeService.getOneById(typevehicule.id).subscribe((typevehicule) => {
            this.typevehicule = { ...typevehicule };
            this.buildForm();
            this.typevehiculeDialog = true;
        });
    }

    deleteTypeVehicule(typevehicule: TypeVehiculeDto) {
        this.deleteTypeVehiculeDialog = true;
        this.typevehicule = { ...typevehicule };
    }

    confirmDelete() {
        this.deleteTypeVehiculeDialog = false;
        this.typevehiculeService
            .delete(this.typevehicule.id)
            .subscribe(() => this.getAll());
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'TypeVehicule Deleted',
            life: 3000,
        });
        this.typevehicule = {};
    }

    hideDialog() {
        this.typevehiculeDialog = false;
    }

    saveTypeVehicule() {
        if (this.form.invalid) {
            return;
        }

        if (this.typevehicule.id) {
            // @ts-ignore
            this.form.value.id = this.typevehicule.id;
            this.typevehiculeService
                .update(this.typevehicule.id, this.form.value)
                .subscribe(
                    () => {
                        this.typevehiculeDialog = false;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'TypeVehicule Updated',
                            life: 3000,
                        });
                        this.typevehicule = {};
                        this.getAll();
                    },
                    (error) => {
                        this.messageService.add({
                            severity: 'danger',
                            summary: 'Error',
                            detail: 'Erreur Modification',
                            life: 3000,
                        });
                        this.typevehiculeDialog = true;
                    }
                );
        } else {
            // @ts-ignore
            this.typevehiculeService.save(this.form.value).subscribe(
                () => {
                    this.typevehiculeDialog = false;
                    this.getAll();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'TypeVehicule Created',
                        life: 3000,
                    });
                    this.typevehicule = {};
                },
                (error) => {
                    this.messageService.add({
                        severity: 'danger',
                        summary: 'Error',
                        detail: 'Erreur enregistrement',
                        life: 3000,
                    });
                    this.typevehiculeDialog = true;
                }
            );
        }

        //this.typevehicules = [...this.typevehicules];
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    getAll() {
        this.typevehiculeService.findAll().subscribe(
            (result) => {
                this.typevehicules = result;
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
