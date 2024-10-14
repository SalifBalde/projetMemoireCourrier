
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable, map } from 'rxjs';
import {   DistanceBureauDto, DistanceBureauService } from 'src/app/proxy/distance-bureaux';
import { StructureDto, StructureService } from 'src/app/proxy/structures';

@Component({
  selector: 'app-distance-bureau',
  templateUrl: './distance-bureau.component.html',
  styleUrls: ['./distance-bureau.component.scss'],
  providers: [MessageService],
})
export class DistanceBureauComponent implements OnInit {
    form: FormGroup;

    distancebureauDialog: boolean = false;
    deleteDistanceBureauDialog: boolean = false;
    elements: DistanceBureauDto[] = [];
    distancebureau: DistanceBureauDto = {};
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    structure$: StructureDto[];

    constructor(
        private distanceBureauService: DistanceBureauService,
        private structureService: StructureService,
        private fb: FormBuilder,
        private messageService: MessageService
    ) {
        this.structureService.findAll().subscribe(
            (result) => {
                this.structure$ = result;
            }
        );
    }

    ngOnInit(): void {
        this.getAll();

        this.cols = [
            { field: 'produit.poids', header: 'Poids' },
            { field: 'produit.distance', header: 'Distance' },
            { field: 'produit.tarif', header: 'Tarif' },
        ];

        this.buildForm();
    }

    buildForm() {
        this.form = this.fb.group({
            distance: [this.distancebureau.distance || '', Validators.required],
            bureauArriveId: [this.distancebureau?.bureauArriveId || '', Validators.required],
            bureauDepotId: [this.distancebureau.bureauDepotId || '', Validators.required],
        });
    }

    openNew() {
        this.distancebureau = {};
        this.buildForm();
        this.distancebureauDialog = true;
    }

    editDistanceBureau(distancebureau: DistanceBureauDto) {
        this.distanceBureauService.getOneById(distancebureau.id).subscribe((result) => {
            this.distancebureau = result;
            this.buildForm();
            this.distancebureauDialog = true;
        });
    }

    deleteDistanceBureau(distancebureau: DistanceBureauDto) {
        this.deleteDistanceBureauDialog = true;
        this.distancebureau = distancebureau;
    }

    confirmDelete() {
        this.deleteDistanceBureauDialog = false;
        this.distanceBureauService.delete(this.distancebureau.id).subscribe(() => {
            this.getAll();
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'DistanceBureau Deleted',
                life: 3000,
            });
        });
        this.distancebureau = {};
    }

    hideDialog() {
        this.distancebureauDialog = false;
    }

    saveDistanceBureau() {
        if (this.form.invalid) {
            return;
        }

        if (this.distancebureau.id) {
            this.form.value.id = this.distancebureau.id;
            this.distanceBureauService.update(this.distancebureau.id, this.form.value).subscribe(
                () => {
                    this.distancebureauDialog = false;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'DistanceBureau Updated',
                        life: 3000,
                    });
                    this.distancebureau = {};
                    this.getAll();
                },
                (error) => {
                    this.messageService.add({
                        severity: 'danger',
                        summary: 'Error',
                        detail: 'Erreur Modification',
                        life: 3000,
                    });
                    this.distancebureauDialog = true;
                }
            );
        } else {
            this.distanceBureauService.save(this.form.value).subscribe(
                () => {
                    this.distancebureauDialog = false;
                    this.getAll();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'DistanceBureau Created',
                        life: 3000,
                    });
                    this.distancebureau = {};
                },
                (error) => {
                    this.messageService.add({
                        severity: 'danger',
                        summary: 'Error',
                        detail: 'Erreur enregistrement',
                        life: 3000,
                    });
                    this.distancebureauDialog = true;
                }
            );
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    getAll() {
        this.distanceBureauService.findAll().subscribe(
            (result) => {
                this.elements = result;
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

