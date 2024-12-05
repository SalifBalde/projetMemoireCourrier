import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { generate } from 'rxjs';
import { ColisService } from 'src/app/proxy/colis';
import { CourrierDto, CourrierService } from 'src/app/proxy/courrier';
import { FactureService } from 'src/app/proxy/pdf/facture.service';
import { PdfService } from 'src/app/proxy/pdf/pdf.service';

@Component({
  selector: 'app-courrier-details',
  templateUrl: './courrier-details.component.html',
})
export class CourrierDetailsComponent implements OnInit {
  courrier: CourrierDto  = null;

  constructor(
    private courrierService: CourrierService,
    private factureService: FactureService,
    private pdfService:PdfService,
    private fb: FormBuilder,
    private router: Router,
    private route : ActivatedRoute,
) {}

ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
        const id = params['id'];

        this.courrierService.getOneById(id).subscribe((colis) => {
            this.courrier = { ...colis };
        });

      });

}

async imprimerFacture(){
    this.factureService.generateReceipt(this.courrier);
}


}
