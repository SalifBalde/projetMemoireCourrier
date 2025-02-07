import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // add this
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import {ZoneDto, ZoneService} from "../../../proxy/zones";
import {Paysdto, PaysService} from "../../../proxy/pays";


@Component({
    selector: 'app-zone',
    templateUrl: './pays.component.html',
    styleUrl: './pays.component.scss',
    providers: [MessageService],
})
export class PaysComponent implements OnInit {
    form: FormGroup;

    isModalOpen = false;

    zoneDialog: boolean = false;

    deletezoneDialog: boolean = false;

    payss: Paysdto[] = [];
    zones: ZoneDto[] = [];

    pays: Paysdto = {};

    cols: any[] = [];
    paysDto: Paysdto;

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private zoneService: ZoneService,
        private fb: FormBuilder,
        private messageService: MessageService,
        private paysService : PaysService
    ) {}

    ngOnInit(): void {
        this.getAll();
        this.getAllzone()

        this.cols = [
            { field: 'libelle', header: 'Libelle' },

        ];

    }


    buildForm() {
        this.form = this.fb.group({
            libelle: [this.pays.libelle || '', Validators.required],
            capital: [this.pays.capital || '', Validators.required],
            code: [this.pays.code || '', Validators.required],
            zone: [this.pays.zoneId || '', Validators.required],
            maxKgAutorise: [this.pays.maxKgAutorise || ''],
            active: [this.pays.active],
        });
    }

    openNew() {
        this.pays = {};
      //  this.zone.active = true;
        this.buildForm();
        this.zoneDialog = true;
    }
    exportCSV() {

    }

    editpays(pays: Paysdto) {
        const idpays = pays.id.toString()
        this.paysService.getOneById(idpays).subscribe((zone) => {
            this.pays = { ...pays };
            this.buildForm();
            this.zoneDialog = true;
        });
    }

    deletepays(pays: Paysdto) {
        this.deletezoneDialog = true;
        this.pays = { ...pays };
    }

    confirmDelete() {
        this.deletezoneDialog = false;
        const idpays = this.pays.id.toString()

        this.paysService
            .delete(idpays)
            .subscribe(() => this.getAll());
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'zone Deleted',
            life: 3000,
        });
        this.pays = {};
    }

    hideDialog() {
        this.zoneDialog = false;
    }
    getAllzone() {
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

    savezone() {
        if (this.form.invalid) {
            return;
        }

        if (this.pays.id) {
            const idpays = this.pays.id.toString()
            this.form.value.zoneId= this.form.value.zone
            this.form.value.maxKgAutorise = this.form.value.maxKgAutorise
            console.log( this.form.value.libelle)
            console.log( this.form.value)
            console.log( idpays)
            // @ts-ignore
            this.form.value.id = this.pays.id;
            this.paysService
                .update(idpays,  this.form.value)
                .subscribe(
                    () => {
                        this.zoneDialog = false;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'zone Updated',
                            life: 3000,
                        });
                        this.pays = {};
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
            this.paysDto= this.form.value
            this.paysDto.zoneId= this.form.value.zone
            console.log(this.paysDto)
            this.paysService.save(this.paysDto).subscribe(
                () => {
                    this.zoneDialog = false;
                    this.getAll();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'zone Created',
                        life: 3000,
                    });
                    this.pays = {};
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
        this.paysService.findAll().subscribe(
            (result) => {
                this.payss = result;
                console.log(this.payss)
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
