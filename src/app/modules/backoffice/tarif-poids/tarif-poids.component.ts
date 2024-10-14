import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable, map } from 'rxjs';
import { DistanceLookupDto, PoidsLookupDto, TarifPoidsDto, TarifPoidsService } from 'src/app/proxy/tarif-poids';

@Component({
  selector: 'app-tarif-poids',
  templateUrl: './tarif-poids.component.html',
  styleUrls: ['./tarif-poids.component.scss'],
  providers: [MessageService],
})
export class TarifPoidsComponent implements OnInit {
    form: FormGroup;

    tarifpoidsDialog: boolean = false;
    deleteTarifPoidsDialog: boolean = false;
    elements: TarifPoidsDto[] = [];
    tarifpoids: Partial<TarifPoidsDto> = {};

    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    poids$: PoidsLookupDto[];
    distances$: DistanceLookupDto[];

    constructor(
        private tarifPoidsService: TarifPoidsService,
        private fb: FormBuilder,
        private messageService: MessageService
    ) {
       // this.poids$ = tarifPoidsService.getPoidsLookup().pipe(map((r) => r));
        this.tarifPoidsService.getPoidsLookup().subscribe(
            (result) => {
                this.poids$ = result;
            }
        );
        this.tarifPoidsService.getDistanceLookup().subscribe(
            (result) => {
                this.distances$ = result;
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
            tarif: [this.tarifpoids.tarif || '', Validators.required],
            poidsId: [this.tarifpoids.poids?.id || '', Validators.required],
            distanceId: [this.tarifpoids.distance?.id || '', Validators.required],
        });
    }

    openNew() {
        this.tarifpoids = {};
        this.buildForm();
        this.tarifpoidsDialog = true;
    }

    editTarifPoids(tarifpoids: TarifPoidsDto) {
        this.tarifPoidsService.getOneById(tarifpoids.id).subscribe((result) => {
            this.tarifpoids = result;
            this.buildForm();
            this.tarifpoidsDialog = true;
        });
    }

    deleteTarifPoids(tarifpoids: TarifPoidsDto) {
        this.deleteTarifPoidsDialog = true;
        this.tarifpoids = tarifpoids;
    }

    confirmDelete() {
        this.deleteTarifPoidsDialog = false;
        this.tarifPoidsService.delete(this.tarifpoids.id).subscribe(() => {
            this.getAll();
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Tarifpoids Deleted',
                life: 3000,
            });
        });
        this.tarifpoids = {};
    }

    hideDialog() {
        this.tarifpoidsDialog = false;
    }

    saveTarifPoids() {
        if (this.form.invalid) {
            return;
        }

        if (this.tarifpoids.id) {
            this.form.value.id = this.tarifpoids.id;
            this.tarifPoidsService.update(this.tarifpoids.id, this.form.value).subscribe(
                () => {
                    this.tarifpoidsDialog = false;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Tarifpoids Updated',
                        life: 3000,
                    });
                    this.tarifpoids = {};
                    this.getAll();
                },
                (error) => {
                    this.messageService.add({
                        severity: 'danger',
                        summary: 'Error',
                        detail: 'Erreur Modification',
                        life: 3000,
                    });
                    this.tarifpoidsDialog = true;
                }
            );
        } else {
            this.tarifPoidsService.save(this.form.value).subscribe(
                () => {
                    this.tarifpoidsDialog = false;
                    this.getAll();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Tarifpoids Created',
                        life: 3000,
                    });
                    this.tarifpoids = {};
                },
                (error) => {
                    this.messageService.add({
                        severity: 'danger',
                        summary: 'Error',
                        detail: 'Erreur enregistrement',
                        life: 3000,
                    });
                    this.tarifpoidsDialog = true;
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
        this.tarifPoidsService.findAll().subscribe(
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
