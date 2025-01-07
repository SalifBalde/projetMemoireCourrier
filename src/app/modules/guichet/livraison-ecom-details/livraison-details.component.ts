import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { MessageService, PrimeIcons } from "primeng/api";
import { ColisDto, ColisService } from "src/app/proxy/colis";
import { EcommerceDto, EcommerceService } from "src/app/proxy/ecommerce";
import { PdfService } from "src/app/proxy/pdf/pdf.service";

@Component({
  selector: "app-livraison-details",
  templateUrl: "./livraison-details.component.html",
})
export class LivraisonDetailsComponent implements OnInit {
  ecommerce: EcommerceDto = {} as EcommerceDto;
  isModalOpen = false;
  type: any;
  events1: any[] = [];

  constructor(
    private ecommerceService: EcommerceService,
    private pdfService: PdfService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params["id"];
    //   this.updateTimeline();
      this.ecommerceService.getOne(id).subscribe((ecommerce) => {
        this.ecommerce = ecommerce; 
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
    this.pdfService.generatePDF(this.ecommerce); // Assuming `ecommerce` is correct for PDF generation
  }
}
