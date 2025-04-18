import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PdfService } from 'src/app/proxy/pdf/pdf.service';
import { SessionService } from 'src/app/proxy/auth/Session.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StructureDto, StructureService } from 'src/app/proxy/structures';
import { Table } from 'primeng/table';
import { EcommerceDto, EcommerceService } from 'src/app/proxy/ecommerce';
import { ExpeditionEcomService } from 'src/app/proxy/expeditionEcommerce';

@Component({
    selector: 'app-reception-e-commerce',
    templateUrl: './reception-e-commerce.component.html',
    providers: [MessageService],
})
export class ReceptionECommerceComponent implements OnInit {
    form: FormGroup;
    isModalOpen = false;
    montant = 0;
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    id = "";
    structure$: StructureDto[] = [];
    ecommerce$: EcommerceDto[] = [];
    ecommerce: EcommerceDto | null = null;
    openEcommerceDialog: boolean = false;
    selectedEcommerce: EcommerceDto[] = []; // Peut contenir un ou plusieurs colis
    loading: boolean = false;

    @ViewChild('dt') dt: Table;

    constructor(
        private sessionService: SessionService,
        private fb: FormBuilder,
        private router: Router,
        private structureService: StructureService,
        private messageService: MessageService,
        private ecommerceService: EcommerceService,
        private expeditionEcomService: ExpeditionEcomService
    ) { }

    ngOnInit() {
        this.getAllEcommerceReceptionCt();
    }

    getAllEcommerceReceptionCt() {
        this.loading = true;
        this.ecommerceService.findEcommerceReceptionCt().subscribe(
            (result) => {
                if (result && result.length > 0 && result[0].retourner === true) {
                    result.forEach(ecommerce => {
                        const temp = ecommerce.partenaireBureauLibelle;
                        ecommerce.partenaireBureauLibelle = ecommerce.bureauDestinationLibelle;
                        ecommerce.bureauDestinationLibelle = temp;
                    });
                }
                this.ecommerce$ = result;
                this.loading = false;
            },
            (error) => {
                this.loading = false;
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load e-commerce reception data.' });
                console.error('Error fetching e-commerce reception data', error);
            }
        );
    }


    // openDialog(ecommerce: EcommerceDto) {
    //     this.openEcommerceDialog = true;
    //     this.ecommerce = { ...ecommerce };
    // }

    openDialog() {
        if (!this.selectedEcommerce || this.selectedEcommerce.length === 0) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Aucun colis sélectionné',
            detail: 'Veuillez sélectionner au moins un colis.',
          });
          return;
        }
        this.openEcommerceDialog = true;
      }

      /**
       * Confirme la réception des colis sélectionnés
       */
      confirmReception() {
        this.openEcommerceDialog = false;

        if (!this.selectedEcommerce || this.selectedEcommerce.length === 0) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Données manquantes',
            detail: 'Aucun colis sélectionné.',
          });
          return;
        }

        this.loading = true;

        // Si un seul colis est sélectionné
        if (this.selectedEcommerce.length === 1) {
          this.ecommerceService
            .reception(this.selectedEcommerce[0].id.toString(), this.sessionService.getAgentAttributes().structureId)
            .subscribe(
              () => {
                this.loading = false;
                this.getAllEcommerceReceptionCt();
                this.messageService.add({
                  severity: 'success',
                  summary: 'Succès',
                  detail: 'L’envoi a été réceptionné avec succès.',
                });
              },
              (error) => {
                this.loading = false;
                this.messageService.add({
                  severity: 'error',
                  summary: 'Erreur',
                  detail: 'Une erreur est survenue lors de la réception.',
                });
                console.error('Erreur de réception', error);
              }
            );
        }
        // Si plusieurs colis sont sélectionnés
        else {
          const requests = this.selectedEcommerce.map(ecom =>
            this.ecommerceService.reception(ecom.id.toString(), this.sessionService.getAgentAttributes().structureId)
          );

          Promise.all(requests.map(req => req.toPromise()))
            .then(() => {
              this.loading = false;
              this.getAllEcommerceReceptionCt();
              this.messageService.add({
                severity: 'success',
                summary: 'Succès',
                detail: 'Tous les colis sélectionnés ont été réceptionnés.',
              });
            })
            .catch(() => {
              this.loading = false;
              this.messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: 'Une erreur est survenue lors de la réception.',
              });
            });
        }

        // Réinitialiser la sélection après la réception
        this.selectedEcommerce = [];
      }



    saveReception() {
        if (this.form.invalid) {
            return;
        }

        this.ecommerceService.save(this.form.value).subscribe(
            (result) => {
                this.getAllEcommerceReceptionCt();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Réception effectuée avec succès',
                    life: 3000,
                });
            },
            (error) => {
                this.messageService.add({
                    severity: 'danger',
                    summary: 'Erreur',
                    detail: 'Erreur d\'enregistrement',
                    life: 3000,
                });
            }
        );
    }
}
