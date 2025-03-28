import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EcommerceDto, EcommerceService, SuiviEcomDto } from 'src/app/proxy/ecommerce';

@Component({
  selector: 'app-track-ecommerce',
  templateUrl: './track-ecommerce.component.html',
  providers: [MessageService]
})
export class TrackEcommerceComponent implements OnInit {
  numenvoi: string = '';
  ecommerce: EcommerceDto | null = null;
  loading: boolean = false;

  constructor(
    private ecommerceService: EcommerceService,
    private messageService: MessageService
  ) {}

  ngOnInit() {}

  rechercherParCodeBarre() {
    if (!this.numenvoi.trim()) {
      this.afficherMessage('warn', 'Attention', 'Veuillez saisir un numéro d\'envoi valide.');
      return;
    }

    this.loading = true; 
    this.ecommerceService.findByNumenvoi(this.numenvoi.toUpperCase()).subscribe(
      (data: EcommerceDto) => {
        if (data) {
          this.ecommerce = data;

          this.ecommerce.suiviEcoms?.forEach(suivi => {
            suivi.bureauLibelle = suivi.bureauLibelle || 'Non disponible';
            suivi.etatEcomLibelle = suivi.etatEcomLibelle || 'Non disponible';
          });

          this.afficherMessage('success', 'Succès', 'Données trouvées avec succès.');
        } else {
          this.ecommerce = null;
          this.afficherMessage('info', 'Information', 'Aucun suivi trouvé avec ce numéro d\'envoi.');
        }
        this.loading = false; 
      },
      (error) => {
        console.error(error);
        this.ecommerce = null;
        this.loading = false; 
        this.afficherMessage('error', 'Erreur', 'Erreur lors de la récupération des données.');
      }
    );
  }

  private afficherMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }
  
}
