import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EcommerceDto, EcommerceService } from 'src/app/proxy/ecommerce';
import { EtatEcomDto, EtatEcomService } from 'src/app/proxy/etatEcom';
import { PdfEcomService } from 'src/app/proxy/pdf/pdfEcom.service';
import { StructureDto, StructureService } from 'src/app/proxy/structures';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-ecommerce-details',
    templateUrl: './ecommerce-details.component.html',
    providers: [MessageService]
})
export class EcommerceDetailsComponent implements OnInit, OnDestroy {
    ecommerce: EcommerceDto = {} as EcommerceDto;
    etatEcom: EtatEcomDto[] = [];
    structure: StructureDto[] = [];
    isModalOpen = false;
    UpdateDialog = false;
    selectedEcom!: EcommerceDto;
    etatForm!: FormGroup;
    private subscriptions: Subscription = new Subscription();

    constructor(
        private ecommerceService: EcommerceService,
        private pdfEcomService: PdfEcomService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private etatEcomService: EtatEcomService,
        private structureService: StructureService,
        private messageService: MessageService
    ) { }

    ngOnInit(): void {
        this.getAllEtat();
        this.getAllStructure();

        this.etatForm = this.fb.group({
            etatId: [''],
            structreId: ['']
        });


        this.subscriptions.add(
            this.route.params.subscribe((params: Params) => {
                const id = params["id"];
                if (id) {
                    this.getEcommerceDetails(id);
                }
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    getEcommerceDetails(id: string) {
        this.subscriptions.add(
            this.ecommerceService.getOne(id).subscribe({
                next: (ecommerce) => {
                    this.ecommerce = ecommerce;
                    console.log(ecommerce);

                },
                error: (err) => {
                    console.error('Erreur lors de la récupération des détails', err);
                }
            })
        );
    }

    getStatusColor(statusLibelle: string): string {
        const colors: { [key: string]: string } = {
            'En Instance': '#03A9F4',
            'Enlevé': '#4CAF50',
            'Expédié': '#FFC107',
            'traitement en cours': '#FFC107',
            'réception bureau': '#9C27B0',
            'Livré': '#4CAF50'
        };
        return colors[statusLibelle] || '#FFC107';
    }

    getNormalizedStatus(statusLibelle: string): string {
        const specialStatuses = ['En Instance', 'Enlevé', 'Expédié', 'Livré'];
        return specialStatuses.includes(statusLibelle) ? statusLibelle : 'Traitement en cours';
    }

    getAllEtat() {
        this.subscriptions.add(
            this.etatEcomService.findAll().subscribe({
                next: (result) => {
                    this.etatEcom = result;
                },
                error: (err) => {
                    console.error('Erreur de récupération des états', err);
                }
            })
        );
    }

    getAllStructure() {
        this.subscriptions.add(
            this.structureService.getBureaux().subscribe({
                next: (result) => {
                    this.structure = result;
                },
                error: (err) => {
                    console.error('Erreur de récupération des structures', err);
                }
            })
        );
    }

    openUpdateDialog(ecom: EcommerceDto) {
        if (!ecom) return;
        this.selectedEcom = ecom;
        this.etatForm.patchValue({ etatId: ecom.etatEcomId });
        this.UpdateDialog = true;
    }

    hideDialog() {
        this.UpdateDialog = false;
    }

    updateEtatEcom() {
        if (!this.selectedEcom || !this.etatForm.valid) {
            console.log("Formulaire invalide ou aucun élément sélectionné");
            return;
        }

        const updatedEtatId = this.etatForm.value.etatId;
        const updatedStructureId = this.etatForm.value.structreId;

        const updatedEcommerce: EcommerceDto = {
            ...this.selectedEcom,
            etatEcomId: updatedEtatId,
            idbureau: updatedStructureId ? updatedStructureId : this.selectedEcom.idbureau,
            idbureauPartenaire: this.selectedEcom.idbureauPartenaire ?? null,
        };

        if (this.selectedEcom.produitEcommerces) {
            updatedEcommerce.produitEcommerces = this.selectedEcom.produitEcommerces;
        }

        this.subscriptions.add(
            this.ecommerceService.update(this.selectedEcom.id, updatedEcommerce).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Mise à jour réussie' });
                    this.hideDialog();
                },
                error: (error) => {
                    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de la mise à jour' });
                    console.error('Erreur lors de la mise à jour', error);
                }
            })
        );
    }


    generatePdf(): void {
        this.pdfEcomService.generatePDF(this.ecommerce);
    }
}
