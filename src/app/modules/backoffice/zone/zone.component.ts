import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // add this
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import {ZoneDto, ZoneService} from "../../../proxy/zones";


@Component({
    selector: 'app-zone',
    templateUrl: './zone.component.html',
    styleUrl: './zone.component.scss',
    providers: [MessageService],
})
export class ZoneComponent implements OnInit {
    form: FormGroup;

    isModalOpen = false;

    zoneDialog: boolean = false;

    deletezoneDialog: boolean = false;

    zones: ZoneDto[] = [];

    zone: ZoneDto = {};

    cols: any[] = [];
    zoneDto: ZoneDto;

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private zoneService: ZoneService,
        private fb: FormBuilder,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.getAll();

        this.cols = [
            { field: 'libelle', header: 'Libelle' },

        ];

    }


    buildForm() {
        this.form = this.fb.group({
            libelle: [this.zone.libelle || '', Validators.required],
           // active: [this.zone.active],
        });
    }

    openNew() {
        this.zone = {};
      //  this.zone.active = true;
        this.buildForm();
        this.zoneDialog = true;
    }
    exportCSV() {

    }

    editzone(zone: ZoneDto) {
        this.zoneService.getOneById(zone.id).subscribe((zone) => {
            this.zone = { ...zone };
            this.buildForm();
            this.zoneDialog = true;
        });
    }

    deletezone(zone: ZoneDto) {
        this.deletezoneDialog = true;
        this.zone = { ...zone };
    }

    confirmDelete() {
        this.deletezoneDialog = false;
        this.zoneService
            .delete(this.zone.id)
            .subscribe(() => this.getAll());
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'zone Deleted',
            life: 3000,
        });
        this.zone = {};
    }

    hideDialog() {
        this.zoneDialog = false;
    }

    savezone() {
        if (this.form.invalid) {
            return;
        }

        if (this.zone.id) {

            console.log( this.form.value.libelle)
            console.log( this.form.value)
            // @ts-ignore
            this.form.value.id = this.zone.id;
            this.zoneService
                .update(this.zone.id, this.form.value)
                .subscribe(
                    () => {
                        this.zoneDialog = false;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'zone Updated',
                            life: 3000,
                        });
                        this.zone = {};
                        this.getAll();
                    },
                    (error) => {
                        this.messageService.add({
                            severity: 'danger',
                            summary: 'Error',
                            detail: 'Erreur Modification',
                            life: 3000,
                        });
                        this.zoneDialog = true;
                    }
                );
        } else {
            this.zoneDto= this.form.value
            this.zoneService.save(this.zoneDto).subscribe(
                () => {
                    this.zoneDialog = false;
                    this.getAll();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'zone Created',
                        life: 3000,
                    });
                    this.zone = {};
                },
                (error) => {
                    this.messageService.add({
                        severity: 'danger',
                        summary: 'Error',
                        detail: 'Erreur enregistrement',
                        life: 3000,
                    });
                    this.zoneDialog = true;
                }
            );
        }

        //this.zones = [...this.zones];
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    getAll() {
        this.zoneService.findAll().subscribe(
            (result) => {
                this.zones = result;
                console.log(this.zones)
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
