import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { KeycloakProfile } from "keycloak-js";
import { KeycloakService } from "keycloak-angular";
import { ColisService } from 'src/app/proxy/colis';
import { ColisDto } from 'src/app/proxy/colis/models';
import { VersementDto, VersementService } from 'src/app/proxy/versement';
import { SessionService } from 'src/app/proxy/auth/Session.service';
import { UserDto } from 'src/app/proxy/users';
import { LayoutService } from 'src/app/layout/service/app.layout.service';


@Component({
  selector: 'app-versement',
  templateUrl: './versement.component.html',
})
export class VersementComponent {
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;

  fullname = "";
  searchCode: string = '';
  selectedColis: Partial<ColisDto> | null = null;
  displayDialog: boolean = false;
  selectedVersement: Partial<VersementDto> = {
    verserPar: ''
  };
  user: UserDto;
  loading: boolean = false;


  constructor(

    private colisService: ColisService,
    private versementService: VersementService,
    private sessionService: SessionService,
    private messageService: MessageService,
    public layoutService: LayoutService,
    private readonly keycloak: KeycloakService,
  ) { }

  rechercherColis(): void {
    const trimmedCode = this.searchCode.trim();
    this.loading = true;
    if (trimmedCode) {
      this.colisService.findByCode(trimmedCode).subscribe(
        (data: any) => {
          if (data && typeof data === 'object' && data.code) {
            this.selectedColis = {
              code: data.code,
              montant: data.montant,

            };
            this.displayDialog = true;
          } else {

            this.selectedColis = null;
            this.displayDialog = false;
            this.messageService.add({
              severity: 'info',
              summary: 'Information',
              detail: 'Aucun colis trouvé pour ce numéro.'
            });
          }
        },
        (error) => {
          console.error('Une erreur est survenue :', error);
          if (error.status === 404) {

            this.messageService.add({
              severity: 'warn',
              summary: 'Attention',
              detail: ''
            });
          } else {
            this.messageService.add({
              severity: 'warn',
              summary: 'Attention',
              detail: 'Aucun colis trouvé pour ce numéro, veuillez saisir un numéro de colis valide.'
            });
          }
        }
      );
    }
  }


  

  verser(): void {

    if (this.selectedColis) {
      console.log('Données de versement:', this.selectedColis);
      const versementData: VersementDto = {
        id: '0',
        colisId: String(this.selectedColis?.id || 0),
        numero: this.selectedColis?.code || '',
        montant: Number(this.selectedColis?.montant || 0),
        verserPar: this.selectedVersement.verserPar || '',
        structureId: '',
        structureLibelle: '',
        caisseId: '0'
      };

      this.versementService.verser(versementData).subscribe(
        (response) => {
          console.log('Versement effectué:', response);
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Le versement a été effectué avec succès.'
          });
          this.displayDialog = false;
          this.searchCode = '';
        },
        (error) => {
          console.error('Erreur lors du versement :', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Une erreur est survenue lors du versement.'
          });
        }
      );
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Attention',
        detail: 'Veuillez sélectionner un colis.'
      });
    }
  }

}
