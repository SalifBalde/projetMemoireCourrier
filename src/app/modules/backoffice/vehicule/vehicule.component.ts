import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // add this
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { VehiculeDto, VehiculeService } from 'src/app/proxy/vehicules';

@Component({
    selector: 'app-vehicule',
    templateUrl: './vehicule.component.html',
    styleUrls: ['./vehicule.component.scss'],
    providers: [MessageService],
})
export class VehiculeComponent implements OnInit {
    form: FormGroup;

    isModalOpen = false;

    vehiculeDialog: boolean = false;

    deleteVehiculeDialog: boolean = false;

    vehicules: VehiculeDto[] = [];

    vehicule: VehiculeDto = {};

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private vehiculeService: VehiculeService,
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
            libelle: [this.vehicule.libelle || '', Validators.required],
            description: [this.vehicule.libelle || '', Validators.required],
            active: [this.vehicule.active],
        });
    }

    openNew() {
        this.vehicule = {};
        this.vehicule.active = true;
        this.buildForm();
        this.vehiculeDialog = true;
    }

    editVehicule(vehicule: VehiculeDto) {
        this.vehiculeService.getOneById(vehicule.id).subscribe((vehicule) => {
            this.vehicule = { ...vehicule };
            this.buildForm();
            this.vehiculeDialog = true;
        });
    }

    deleteVehicule(vehicule: VehiculeDto) {
        this.deleteVehiculeDialog = true;
        this.vehicule = { ...vehicule };
    }

    confirmDelete() {
        this.deleteVehiculeDialog = false;
        this.vehiculeService
            .delete(this.vehicule.id)
            .subscribe(() => this.getAll());
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Vehicule Deleted',
            life: 3000,
        });
        this.vehicule = {};
    }

    hideDialog() {
        this.vehiculeDialog = false;
    }

    saveVehicule() {
        if (this.form.invalid) {
            return;
        }

        if (this.vehicule.id) {
            // @ts-ignore
            this.form.value.id = this.vehicule.id;
            this.vehiculeService
                .update(this.vehicule.id, this.form.value)
                .subscribe(
                    () => {
                        this.vehiculeDialog = false;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Vehicule Updated',
                            life: 3000,
                        });
                        this.vehicule = {};
                        this.getAll();
                    },
                    (error) => {
                        this.messageService.add({
                            severity: 'danger',
                            summary: 'Error',
                            detail: 'Erreur Modification',
                            life: 3000,
                        });
                        this.vehiculeDialog = true;
                    }
                );
        } else {
            // @ts-ignore
            this.vehiculeService.save(this.form.value).subscribe(
                () => {
                    this.vehiculeDialog = false;
                    this.getAll();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Vehicule Created',
                        life: 3000,
                    });
                    this.vehicule = {};
                },
                (error) => {
                    this.messageService.add({
                        severity: 'danger',
                        summary: 'Error',
                        detail: 'Erreur enregistrement',
                        life: 3000,
                    });
                    this.vehiculeDialog = true;
                }
            );
        }

        //this.vehicules = [...this.vehicules];
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    getAll() {
        this.vehiculeService.findAll().subscribe(
            (result) => {
                this.vehicules = result;
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
