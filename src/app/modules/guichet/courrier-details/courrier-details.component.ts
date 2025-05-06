import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { generate } from 'rxjs';
import { CourrierDto, CourrierService } from 'src/app/proxy/courrier';
import { Cn22Service } from 'src/app/proxy/pdf/cn22.service';
import { Cn23Service } from 'src/app/proxy/pdf/cn23.service';
import { Cn23AService } from 'src/app/proxy/pdf/cn23A.service';
import { FactureService } from 'src/app/proxy/pdf/facture.service';
import { PdfService } from 'src/app/proxy/pdf/pdf.service';
import {KeycloakProfile} from "keycloak-js";
import {KeycloakService} from "keycloak-angular";
import { SessionService } from 'src/app/proxy/auth/Session.service';

@Component({
  selector: 'app-courrier-details',
  templateUrl: './courrier-details.component.html',
})
export class CourrierDetailsComponent implements OnInit {
  courrier: CourrierDto  = {};
  fullname: string;

  constructor(
    private courrierService: CourrierService,
    private factureService: FactureService,
    private pdfService:PdfService,
    private cn23AService : Cn23AService,
    private cn23Service : Cn23Service,
    private cn22Service : Cn22Service,
     private sessionService : SessionService,
    private fb: FormBuilder,
    private router: Router,
    private route : ActivatedRoute,
) {}

ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
        const id = params['id'];

        this.courrierService.getOneById(id).subscribe((courrier) => {
            this.courrier = { ...courrier };
        });
        const agent = this.sessionService.getAgentAttributes();
        if (agent) {
          this.fullname = `${agent.prenom} ${agent.nom}`.normalize();}
      });

}

async imprimerFacture(){
    this.pdfService.generatePDF(this.courrier);
}

async cn23() {
  if (!this.courrier) {
    console.error('Aucun courrier sélectionné pour générer le PDF.');
    return;
  }

  try {
    // Appel du service pour créer le PDF
    await this.cn23AService.createPDF(this.courrier);
    console.log('PDF généré avec succès.');
  } catch (error) {
    console.error('Erreur lors de la génération du PDF :', error);
  }
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

  async cn22() {
    if (!this.courrier) {
      console.error('Aucun courrier sélectionné pour générer le PDF.');
      return;
    }

    try {
      // Appel du service pour créer le PDF
      await this.cn22Service.createPDF(this.courrier);
      console.log('PDF généré avec succès.');
    } catch (error) {
      console.error('Erreur lors de la génération du PDF :', error);
    }
  }



}
