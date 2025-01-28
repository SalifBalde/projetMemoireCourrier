import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { generate } from 'rxjs';
import { EcommerceDto, EcommerceService } from 'src/app/proxy/ecommerce';
import { Cn22Service } from 'src/app/proxy/pdf/cn22.service';
import { Cn23Service } from 'src/app/proxy/pdf/cn23.service';
import { Cn23AService } from 'src/app/proxy/pdf/cn23A.service';
import { FactureService } from 'src/app/proxy/pdf/facture.service';
import { PdfService } from 'src/app/proxy/pdf/pdf.service';


@Component({
  selector: 'app-ecom-details',
  templateUrl: './ecom-details.component.html',
})
export class EcomDetailsComponent implements OnInit {
  ecommerce$: EcommerceDto  = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route : ActivatedRoute,
    private ecommerceService :EcommerceService,
    private cn23AService : Cn23AService
) {}

ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
        const id = params['id'];

        this.ecommerceService.getOne(id).subscribe((ecommerce$) => {
            this.ecommerce$ = { ...ecommerce$ };
        });

      });

}

// async imprimerFacture(){
//     this.pdfService.generatePDF(this.ecommerce$);
// }

async cn23() {
  if (!this.ecommerce$) {
    console.error('Aucun ecommerce$ sélectionné pour générer le PDF.');
    return;
  }

  try {
    // Appel du service pour créer le PDF
    await this.cn23AService.createPDF(this.ecommerce$);
    console.log('PDF généré avec succès.');
  } catch (error) {
    console.error('Erreur lors de la génération du PDF :', error);
  }
}


}
