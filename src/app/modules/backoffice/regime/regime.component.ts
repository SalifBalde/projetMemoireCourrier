import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // add this
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import {} from "../../../proxy/type-courriers";
import {RegimeDto, RegimeService} from "../../../proxy/regime";


@Component({
    selector: 'app-regime',
    templateUrl: './regime.component.html',
    styleUrls: ['./regime.component.scss'],
    providers: [MessageService],

})
export class RegimeComponent implements OnInit {
    form: FormGroup;

    isModalOpen = false;

    regimeDialog: boolean = false;

    deleteregimeDialog: boolean = false;

    regimes: RegimeDto[] = [];

    regime: RegimeDto = {};

    cols: any[] = [];

    RegimeDto: RegimeDto;

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private regimeservice: RegimeService,
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

    // saveregime() {
    //     if (this.form.invalid) {
    //         return;
    //     }
    // }
    buildForm() {
        this.form = this.fb.group({
            libelle: [this.regime.libelle || '', Validators.required],
            // active: [this.regime.active],
        });
    }

    openNew() {
        this.regime = {};
        //  this.regime.active = true;
        this.buildForm();
        this.regimeDialog = true;
    }

    exportCSV() {

    }


    editregime(regime: RegimeDto) {
        this.regimeservice.getOneById(regime.id).subscribe((regime) => {
            this.regime = {...regime};
            this.buildForm();
            this.regimeDialog = true;
        });
    }

    deleteregime(regime: RegimeDto) {
        this.deleteregimeDialog = true;
        this.regime = {...regime};
    }

    confirmDelete() {
        this.deleteregimeDialog = false;
        this.regimeservice
            .delete(this.regime.id)
            .subscribe(() => this.getAll());
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'regime Deleted',
            life: 3000,
        });
        this.regime = {};
    }

    hideDialog() {
        this.regimeDialog = false;
    }

    saveregime() {
        if (this.form.invalid) {
            return;
        }

        if (this.regime.id) {

            console.log(this.form.value.libelle)
            console.log(this.form.value)
            // @ts-ignore
            this.form.value.id = this.regime.id;
            this.regimeservice
                .update(this.regime.id, this.form.value)
                .subscribe(
                    () => {
                        this.regimeDialog = false;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'regime Updated',
                            life: 3000,
                        });
                        this.regime = {};
                        this.getAll();
                    },
                    (error) => {
                        this.messageService.add({
                            severity: 'danger',
                            summary: 'Error',
                            detail: 'Erreur Modification',
                            life: 3000,
                        });
                        this.regimeDialog = true;
                    }
                );
        } else {
            this.RegimeDto = this.form.value
            this.regimeservice.save(this.RegimeDto).subscribe(
                () => {
                    this.regimeDialog = false;
                    this.getAll();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'regime Created',
                        life: 3000,
                    });
                    this.regime = {};
                },
                (error) => {
                    this.messageService.add({
                        severity: 'danger',
                        summary: 'Error',
                        detail: 'Erreur enregistrement',
                        life: 3000,
                    });
                    this.regimeDialog = true;
                }
            );
        }

        //this.regimes = [...this.regimes];
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    getAll() {
        this.regimeservice.findAll().subscribe(
            (result) => {
                this.regimes = result;
                console.log(this.regimes)
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
