import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService, PrimeIcons } from 'primeng/api';
import { ExpeditionDto, ExpeditionService } from 'src/app/proxy/expeditions';
import { PdfService } from 'src/app/proxy/pdf/pdf.service';

@Component({
    selector: 'app-details-expedition',
    templateUrl: './details-expedition.component.html',
})
export class DetailsExpeditionComponent  implements OnInit{

    expedition: ExpeditionDto = {};
    isModalOpen = false;
    type : any;
    events1: any[] = [];


    constructor(
        private expeditionService: ExpeditionService,
        private pdfService:PdfService,
        private fb: FormBuilder,
        private router: Router,
        private route : ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            const id = params['id'];

            this.expeditionService.getOneById(id).subscribe((expedition) => {
                this.expedition = { ...expedition };
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

    generatePdf() : void{
        //this.pdfService.generatePDF(this.expedition);
    }

}
