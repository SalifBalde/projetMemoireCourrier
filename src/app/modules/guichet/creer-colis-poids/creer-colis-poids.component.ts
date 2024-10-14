import { Component, OnInit, ViewChild } from '@angular/core';

import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

//import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ClientDto } from 'src/app/proxy/client';
import {ColisService, CreateUpdateColisDto } from 'src/app/proxy/colis';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PoidsLookupDto, TarifPoidsService } from 'src/app/proxy/tarif-poids';
import { StructureDto, StructureService } from 'src/app/proxy/structures';
import { ModePaiementDto, ModePaiementService } from 'src/app/proxy/mode-paiements';
import { DistanceBureauService } from 'src/app/proxy/distance-bureaux';
import { SessionService } from 'src/app/proxy/auth/Session.service';

@Component({
    selector: 'app-creer-colis-poids',
    templateUrl: './creer-colis-poids.component.html',
    providers: [MessageService],
  })
  export class CreerColisPoidsComponent implements OnInit {
    form: FormGroup;
    isModalOpen = false;
    nom  = "";
    telephone = "";
    montant = 0;
    distance : any;
    fraisLivraison = 0;
    fraisEnlevement = 0;
    colis: CreateUpdateColisDto = {};
    selectedDrop: ClientDto = { nom: '' };
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    poids$: PoidsLookupDto[];
    structure$: StructureDto[];
    mode$: ModePaiementDto[];
    id ="";
    idBureau ="";
    idcaisse = "";

    constructor(
        private colisService: ColisService,
        private tarifPoidsService : TarifPoidsService,
        private structureService: StructureService,
        private modePaiementService:ModePaiementService,
        private  sessionService: SessionService,
        private distanceBureauService:DistanceBureauService,
        private fb: FormBuilder,
        private router: Router,
        private route : ActivatedRoute,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
             this.id = params['id'];
            this.telephone = params['telephone'];
            this.nom = params['nom'];
            this.idBureau = this.sessionService.getAgentAttributes().structureId;
            this.idcaisse = this.sessionService.getAgentAttributes().caisseId;
          });

          this.tarifPoidsService.getPoidsLookup().subscribe(
            (result) => {
                this.poids$ = result;
            }
        );

        this.structureService.findAll().subscribe(
            (result) => {
                this.structure$ = result;
            }
        );

        this.modePaiementService.findAll().subscribe(
            (result) => {
                this.mode$ = result;
            }
        );

        this.buildForm();
    }

    buildForm() {
        this.form = this.fb.group({
            modePaiementId: [this.colis.modePaiementId || '', Validators.required],
            payer: [this.colis.payer || "true", Validators.required],
            bureauDestinataireId: [this.colis.bureauDestinataireId || '', Validators.required],
            contenu: [this.colis.contenu || '', Validators.required],
            nomDestinataire: [this.colis.nomDestinataire || '', Validators.required],
            prenomDestinataire: [this.colis.prenomDestinataire || '', Validators.required],
            telephoneDestinataire: [this.colis.telephoneDestinataire || '', Validators.required],
            adresseDestinataire: [this.colis.adresseDestinataire || '', Validators.required],
            poidsId: [this.colis.poidsId || '', Validators.required],
            livraisonDomicile: [this.colis.livraisonDomicile||false ],
            enlevementDomicile: [this.colis.enlevementDomicile || false ],
        });
    }

    getTarifPoids() {
        const poidsId = this.form.value.poidsId;
        this.montant = 0;
        if (this.distance != null && poidsId) {
          this.tarifPoidsService.getTarif(this.distance, poidsId).subscribe(
            (result) => {
              this.montant = result.tarif;
            },
            (error) => {
              console.error('Error fetching tariff:', error);
              // Handle error appropriately
            }
          );
        } else {
          console.warn('Both distance and poidsId must be provided');
          // Handle invalid parameters appropriately
        }
      }
    getDistance() {
        const idb = this.form.value.bureauDestinataireId;
        this.distance ="";
        this.montant = 0;
        if (this.idBureau && idb) {
          this.distanceBureauService.getDistance(this.idBureau, idb).subscribe(
            (result) => {
              this.distance = result;
              this.getTarifPoids();
            },
            (error) => {
              console.error('Error fetching distance:', error);

              this.messageService.add({
                severity: 'danger',
                summary: 'Error',
                detail: 'Error fetching distance',
                life: 3000,
            });
              // Handle error appropriately
            }
          );
        } else {
          console.warn('Both idBureau and bureauDestinataireId must be provided');
          this.messageService.add({
            severity: 'danger',
            summary: 'Error',
            detail: 'Both idBureau and bureauDestinataireId must be provided',
            life: 3000,
        });
          // Handle invalid parameters appropriately
        }
      }



    getFraisLivraison(event: any) {
        if (event.checked) {
        this.tarifPoidsService.getOneById("1").subscribe((result) => {
            this.fraisLivraison = result.tarif;
        });
    }else {
        this.fraisLivraison = 0;
        }
    }

    getFraisEnlevement(event: any) {
        if (event.checked) {
        this.tarifPoidsService.getOneById("1").subscribe((result) => {
            this.fraisEnlevement = result.tarif;
        });
    }else {
        this.fraisEnlevement = 0;
        }
    }

    saveColis() {
        if (this.form.invalid) {
            return;
        }
        this.form.value.caisseId = "1";
        this.form.value.clientId = this.id;
        this.form.value.typeId = "1";
        this.form.value.bureauDepotId = this.idBureau;
        this.form.value.fraisEnlevement = this.fraisEnlevement;
        this.form.value.fraisLivraison = this.fraisLivraison;
        this.form.value.montant = this.montant;

    this.colisService.savePoids(this.form.value).subscribe(
                (result) => {
                  this.colis = result;
                this.router.navigateByUrl('/guichet/colisDetails/'+this.colis.id);

                },
                (error) => {
                     this.messageService.add({
                        severity: 'danger',
                        summary: 'Error',
                        detail: 'Erreur enregistrement',
                        life: 3000,
                    });
                }
            );

    }


    getBureaux() {
        this.colisService.findAll().subscribe(
            (result) => {
               // this.coliss = result;
            },
            (error) => {
                 this.messageService.add({
                     severity: 'danger',
                    summary: 'Error',
                     detail: 'Erreur Serveur',
                     life: 3000,
                 });
            }
        );
    }

}
