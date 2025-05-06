import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { generate } from 'rxjs';
import { SessionService } from 'src/app/proxy/auth/Session.service';
import { CourrierDto, CourrierService } from 'src/app/proxy/courrier';
import { Cn22Service } from 'src/app/proxy/pdf/cn22.service';
import { Cn23Service } from 'src/app/proxy/pdf/cn23.service';
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
    private cn23Service : Cn23Service,
    private fb: FormBuilder,
    private router: Router,
    private sessionService : SessionService,
    private route : ActivatedRoute,
) {}

ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
        const id = params['id'];

        this.courrierService.getOneById(id).subscribe((courrier) => {
            this.courrier = { ...courrier };
        });

      });

}

async imprimerFacture(){
    this.pdfService.generatePDF(this.courrier);
}

async cp71() {
    if (!this.courrier) {
      console.error('Aucun courrier sélectionné pour générer le PDF.');
      return;
    }

    try {
      const agent = this.sessionService.getAgentAttributes();
      const fullname = agent ? `${agent.prenom} ${agent.nom}` : 'Nom non trouvé';

      // Appel du service pour créer le PDF en passant fullname
      await this.cn23Service.createPDF(this.courrier, fullname);
      console.log('PDF généré avec succès.');
    } catch (error) {
      console.error('Erreur lors de la génération du PDF :', error);
    }
  }

}
