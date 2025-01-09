import { ExpeditionEcomCreateDto } from './../../../proxy/expeditionEcommerce/models';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PrimeIcons } from 'primeng/api';
import { ExpeditionEcomDto, ExpeditionEcomService } from 'src/app/proxy/expeditionEcommerce';
import { PdfService } from 'src/app/proxy/pdf/pdf.service';

@Component({
  selector: 'app-detail-expeditionEcom',
  templateUrl: './detail-expeditionEcom.component.html',
})
export class DetailExpeditionEcomComponent implements OnInit {
    expeditionEcom: ExpeditionEcomDto | null = null; 
    isModalOpen = false;
    type: any;
    events1: any[] = [];

    constructor(
        private expeditionEcomService: ExpeditionEcomService,
        private pdfService: PdfService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
    ) {}
    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            const id = params['id'];
    
            this.expeditionEcomService.getOne(id).subscribe((expeditionEcom) => {
                this.expeditionEcom = expeditionEcom;
                console.log('ExpeditionEcom data loaded:', this.expeditionEcom);  // Affichage des données dans la console
            });
        });
    }
    
    openDialog() {
        this.isModalOpen = true;
        this.events1 = [
            { status: 'Ordered', date: '15/10/2020 10:30', icon: PrimeIcons.SHOPPING_CART, color: '#9C27B0', image: 'game-controller.jpg' },
            { status: 'Processing', date: '15/10/2020 14:00', icon: PrimeIcons.COG, color: '#673AB7' },
            { status: 'Shipped', date: '15/10/2020 16:15', icon: PrimeIcons.ENVELOPE, color: '#FF9800' },
            { status: 'Delivered', date: '16/10/2020 10:00', icon: PrimeIcons.CHECK, color: '#607D8B' }
        ];
    }

    generatePdf(): void {
        // this.pdfService.generatePDF(this.expedition); 
    }
    
    // async generatePDF() {
    //     try {
    //       await this.cn23Service.createPDF();  // Appel de la méthode createPDF
    //       console.log('PDF généré avec succès.');
    //     } catch (error) {
    //       console.error('Erreur lors de la génération du PDF:', error);
    //     }
    //   }
}
