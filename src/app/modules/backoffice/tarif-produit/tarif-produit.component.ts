import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable, map } from 'rxjs';
import { DistanceLookupDto, ProduitLookupDto, TarifProduitDto, TarifProduitService, TarifProduitdCreateUpdateDto } from 'src/app/proxy/tarif-produit';

@Component({
  selector: 'app-tarif-produit',
  templateUrl: './tarif-produit.component.html',
  styleUrls: ['./tarif-produit.component.scss'],
  providers: [MessageService],
})
export class TarifProduitComponent implements OnInit {
    form: FormGroup;

    tarifproduitDialog: boolean = false;
    deleteTarifProduitDialog: boolean = false;
    elements: TarifProduitDto[] = [];
    tarifproduit: TarifProduitdCreateUpdateDto = {};
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    produit$: ProduitLookupDto[];
    distances$: DistanceLookupDto[];

    constructor(
        private tarifProduitService: TarifProduitService,
        private fb: FormBuilder,
        private messageService: MessageService
    ) {
       // this.produit$ = tarifProduitService.getProduitLookup().pipe(map((r) => r));
        this.tarifProduitService.getProduitLookup().subscribe(
            (result) => {
                this.produit$ = result;
            }
        );
        this.tarifProduitService.getDistanceLookup().subscribe(
            (result) => {
                this.distances$ = result;
            }
        );
    }

    ngOnInit(): void {
        this.getAll();

        this.cols = [
            { field: 'produit.produit', header: 'Produit' },
            { field: 'produit.distance', header: 'Distance' },
            { field: 'produit.tarif', header: 'Tarif' },
        ];

        this.buildForm();
    }

    buildForm() {
        this.form = this.fb.group({
            tarif: [this.tarifproduit.tarif || '', Validators.required],
            produitId: [this.tarifproduit.produitId || '', Validators.required],
            distanceId: [this.tarifproduit.distanceId || '', Validators.required],
        });
    }

    openNew() {
        this.tarifproduit = {};
        this.buildForm();
        this.tarifproduitDialog = true;
    }

    editTarifProduit(tarifproduit: TarifProduitDto) {
        this.tarifProduitService.getOneById(tarifproduit.id).subscribe((result) => {
            this.tarifproduit = result;
            this.buildForm();
            this.tarifproduitDialog = true;
        });
    }

    deleteTarifProduit(tarifproduit: TarifProduitDto) {
        this.deleteTarifProduitDialog = true;
        this.tarifproduit = tarifproduit;
    }

    confirmDelete() {
        this.deleteTarifProduitDialog = false;
        this.tarifProduitService.delete(this.tarifproduit.id).subscribe(() => {
            this.getAll();
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Tarifproduit Deleted',
                life: 3000,
            });
        });
        this.tarifproduit = {};
    }

    hideDialog() {
        this.tarifproduitDialog = false;
    }

    saveTarifProduit() {
        if (this.form.invalid) {
            return;
        }

        if (this.tarifproduit.id) {
            this.form.value.id = this.tarifproduit.id;
            this.tarifProduitService.update(this.tarifproduit.id, this.form.value).subscribe(
                () => {
                    this.tarifproduitDialog = false;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Tarifproduit Updated',
                        life: 3000,
                    });
                    this.tarifproduit = {};
                    this.getAll();
                },
                (error) => {
                    this.messageService.add({
                        severity: 'danger',
                        summary: 'Error',
                        detail: 'Erreur Modification',
                        life: 3000,
                    });
                    this.tarifproduitDialog = true;
                }
            );
        } else {
            this.tarifProduitService.save(this.form.value).subscribe(
                () => {
                    this.tarifproduitDialog = false;
                    this.getAll();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Tarifproduit Created',
                        life: 3000,
                    });
                    this.tarifproduit = {};
                },
                (error) => {
                    this.messageService.add({
                        severity: 'danger',
                        summary: 'Error',
                        detail: 'Erreur enregistrement',
                        life: 3000,
                    });
                    this.tarifproduitDialog = true;
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
        this.tarifProduitService.findAll().subscribe(
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
