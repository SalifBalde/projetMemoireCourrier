import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms'; // add this
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import {ServiceCourrierDto, ServiceCourrierService} from "../../../proxy/service-courrier";
import {TypeCategorieDto, TypeCategorieService} from "../../../proxy/type-categorie";
import {RegimeDto, RegimeService} from "../../../proxy/regime";
import {ProduitDto} from "../../../proxy/produits";

@Component({
    selector: 'app-service-courrier',
    templateUrl: './service-courrier.component.html',
    styleUrls: ['./service-courrier.component.scss'],
    providers: [MessageService],
})
export class ServiceCourrierComponent implements OnInit {
    disableSelect = new FormControl(false);
    form: FormGroup;
    regimes: RegimeDto[] = [];
    typesCategories: TypeCategorieDto[] = [];
    isModalOpen = false;
    serviceCourrierDialog: boolean = false;
    deleteserviceCourrierDialog: boolean = false;
    serviceCourriers: ServiceCourrierDto[] = [];
    serviceCourrier: ServiceCourrierDto = {};
    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private serviceCourrierservice: ServiceCourrierService,
        private regimeservice:RegimeService,
        private typeCategorieService:TypeCategorieService,
        private fb: FormBuilder,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.getAll();
        this.loadregimes();
        this.regimes=[];
        this.typesCategories=[];
        this.loadTypeCategorie();
        this.cols = [
            { field: 'Service-Courrier', header: 'Service-Courrier' },
            { field: 'Regime', header: 'Regime' },
            { field: 'type-categorie', header: 'type-categorie' },
        ];
        this.buildForm();
    }
    loadregimes() {

        this.regimeservice.findAll().subscribe((data) => {
            this.regimes= data;
            //console.log(this.regimes)
        });
    }

    loadTypeCategorie() {
        this.typeCategorieService.findAll().subscribe((data) => {
            this.typesCategories = data;
            //console.log(this.typesCategories)

        });
    }

    buildForm() {
        this.form = this.fb.group({
            libelle: [this.serviceCourrier.libelle || '', Validators.required],
            regime: [this.serviceCourrier.libelle || '', Validators.required],
            typeCategorie: [this.serviceCourrier.libelle || '', Validators.required],

        });
    }

    openNew() {
        this.serviceCourrier = {};
        this.buildForm();
        this.serviceCourrierDialog = true;
    }

    editserviceCourrier(serviceCourrier: ServiceCourrierDto) {
        this.serviceCourrierservice.getOneById(serviceCourrier.id).subscribe((serviceCourrier) => {
            this.serviceCourrier = { ...serviceCourrier };

            this.buildForm();
            this.serviceCourrierDialog = true;
        });
    }

    deleteserviceCourrier(serviceCourrier: ServiceCourrierDto) {
        this.deleteserviceCourrierDialog = true;
        this.serviceCourrier = { ...serviceCourrier };
    }

    confirmDelete() {
        this.deleteserviceCourrierDialog = false;
        this.serviceCourrierservice
            .delete(this.serviceCourrier.id)
            .subscribe(() => this.getAll());
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'serviceCourrier Deleted',
            life: 3000,
        });
        this.serviceCourrier = {};
    }

    hideDialog() {
        this.serviceCourrierDialog = false;
    }

    saveserviceCourrier() {
        if (this.form.invalid) {
            return;
        }

        if (this.serviceCourrier.id) {
            this.form.value.id = this.serviceCourrier.id;
            this.serviceCourrierservice
                .update(this.serviceCourrier.id, this.form.value)
                .subscribe(
                    () => {
                        this.serviceCourrierDialog = false;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'serviceCourrier Updated',
                            life: 3000,
                        });
                        this.serviceCourrier = {};
                        this.getAll();
                    },
                    (error) => {
                        this.messageService.add({
                            severity: 'danger',
                            summary: 'Error',
                            detail: 'Erreur Modification',
                            life: 3000,
                        });
                        this.serviceCourrierDialog = true;
                    }
                );
        } else {
            this.serviceCourrierservice.save(this.form.value).subscribe(
                () => {
                    this.serviceCourrierDialog = false;
                    this.getAll();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'serviceCourrier Created',
                        life: 3000,
                    });
                    this.serviceCourrier = {};
                },
                (error) => {
                    this.messageService.add({
                        severity: 'danger',
                        summary: 'Error',
                        detail: 'Erreur enregistrement',
                        life: 3000,
                    });
                    this.serviceCourrierDialog = true;
                }
            );
        }

        //this.serviceCourriers = [...this.serviceCourriers];
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    getAll() {
        this.serviceCourrierservice.findAll().subscribe(
            (result) => {
                this.serviceCourriers = result;
                console.log( this.serviceCourriers)
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
