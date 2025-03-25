import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EcommerceDto, EcommerceService } from 'src/app/proxy/ecommerce';
import { EtatEcomDto, EtatEcomService } from 'src/app/proxy/etatEcom';
import { PdfEcomService } from 'src/app/proxy/pdf/pdfEcom.service';

@Component({
    selector: 'app-ecommerce-details',
    templateUrl: './ecommerce-details.component.html',
    providers: [MessageService]
})
export class EcommerceDetailsComponent implements OnInit {
    ecommerce: EcommerceDto = {} as EcommerceDto;
    etatEcom: EtatEcomDto[] = [];
    isModalOpen = false;
    type: any;
    events1: any[] = [];
    UpdateDialog: boolean = false;
    selectedEcom!: EcommerceDto;
    etatForm!: FormGroup;

    constructor(
        private ecommerceService: EcommerceService,
        private pdfEcomService: PdfEcomService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private etatEcomService: EtatEcomService,
        private messageService: MessageService,
    ) { }

    ngOnInit(): void {
        this.getAllEtat()

        this.route.params.subscribe((params: Params) => {
            const id = params["id"];
            this.ecommerceService.getOne(id).subscribe((ecommerce) => {
                console.log('Produit Ecommerce:', ecommerce.produitEcommerces);
                this.ecommerce = ecommerce;
            });
            this.etatForm = this.fb.group({
                etatId: ['']
            });
        });

    }

    getStatusColor(statusLibelle: string): string {
        const colors = {
            'En Instance': '#03A9F4',
            'Enleve': '#4CAF50',
            'Expedié': '#FFC107',
            'traitement en cours': '#FFC107',
            'reception bureau': '#9C27B0',
            'Livré': '#4CAF50'
        };
        return colors[statusLibelle] || '#FFC107';
    }

    getNormalizedStatus(statusLibelle: string): string {
        const specialStatuses = ['En Instance', 'Enleve', 'Expedié', 'Livré'];
        return specialStatuses.includes(statusLibelle) ? statusLibelle : 'Traitement en cours';
    }

    getAllEtat() {
        this.etatEcomService.findAll().subscribe((result) => {
            this.etatEcom = result;
            console.log(result);

        })
    }


    openUpdateDialog(ecom: EcommerceDto) {
        this.selectedEcom = ecom;
        this.etatForm.patchValue({ etatId: ecom.etatEcomId });
        this.UpdateDialog = true;
    }

    hideDialog() {
        this.UpdateDialog = false;
    }
    updateEtatEcom() {
        console.log('La méthode updateEtatEcom a été appelée');
        if (this.etatForm.valid) {
            const updatedEtatId = this.etatForm.value.etatId;

            const updatedEcommerce: EcommerceDto = {
                ...this.selectedEcom,
                etatEcomId: updatedEtatId
            };
            this.ecommerceService.update(this.selectedEcom.id, updatedEcommerce).subscribe(() => {
                this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Statut mis à jour avec succès' });
                this.hideDialog();
                console.log('Données envoyées:', updatedEcommerce);
            }, error => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de la mise à jour du statut' });
                console.error('Erreur lors de la requête:', error);
            });
        } else {
            console.log('Le formulaire n\'est pas valide');
        }
    }



    openDialog() {
        this.isModalOpen = true;
        // this.updateTimeline();
    }

    //   updateTimeline() {
    //     if (!this.ecommerce || !this.ecommerce.suivisColisList) return;

    //     this.events1 = this.ecommerce.suivisColisList.map((suivi, index) => {
    //       const status = this.getNormalizedStatus(this.ecommerce.etatEcomId.toString());

    //       return {
    //         status: status,
    //         color: this.getStatusColor(status),
    //         date: suivi.createdAt, // Assuming `createdAt` exists in `suivi`
    //         agent: suivi.agent, // Assuming `agent` exists in `suivi`
    //         isActive: index === this.ecommerce.suivisColisList.length - 1 // Mark the last one as active
    //       };
    //     });
    //   }

    generatePdf(): void {
        this.pdfEcomService.generatePDF(this.ecommerce);
    }
}
