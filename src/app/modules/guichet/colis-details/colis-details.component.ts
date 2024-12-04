import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService, PrimeIcons } from 'primeng/api';
import { ColisDto, ColisService } from 'src/app/proxy/colis';
import { PdfService } from 'src/app/proxy/pdf/pdf.service';

@Component({
  selector: 'app-colis-details',
  templateUrl: './colis-details.component.html',
  styleUrl: './colis-details.component.scss'
})
export class ColisDetailsComponent  implements OnInit{

    colis: ColisDto = {};
    isModalOpen = false;
    type : any;
    events1: any[] = [];


    constructor(
        private colisService: ColisService,
        private pdfService:PdfService,
        private fb: FormBuilder,
        private router: Router,
        private route : ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            const id = params['id'];

            this.colisService.getOneById(id).subscribe((colis) => {
                this.colis = { ...colis };
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
     //   this.pdfService.generatePDF(this.colis);
    }

}
