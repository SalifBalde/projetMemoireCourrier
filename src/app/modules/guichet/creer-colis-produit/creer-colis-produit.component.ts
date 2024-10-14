import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/proxy/client';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { ProduitLookupDto, TarifProduitService } from 'src/app/proxy/tarif-produit';
import { ModePaiementDto, ModePaiementService } from 'src/app/proxy/mode-paiements';
import { ColisCreateUpdateProduitDto, ColisDetailsDto, ColisService } from 'src/app/proxy/colis';
import { MessageService } from 'primeng/api';
import { StructureDto, StructureService } from 'src/app/proxy/structures';
import { DistanceBureauService } from 'src/app/proxy/distance-bureaux';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProduitService } from 'src/app/proxy/produits';
import { SessionService } from 'src/app/proxy/auth/Session.service';

@Component({
    selector: 'app-creer-colis-produit',
    templateUrl: './creer-colis-produit.component.html',
    providers: [MessageService],
})
export class CreerColisProduitComponent implements OnInit {

    colis: ColisCreateUpdateProduitDto = new ColisCreateUpdateProduitDto();
    form: FormGroup;
    fraisLivraison = 0;
    fraisEnlevement = 0;
    montant = 0;
    distance : any;
    idBureau : any;
    produits$: ProduitLookupDto[];
    selectedBureauAdvanced: any;
    nom = "";
    telephone = "";
    cni = "";
    prenom = "";
    id = "";
    produits: any[] = [];
   // filteredProduits: any[] = [];
    selectedProduit: any;
    selectedQuantite: number = 0;
    modesPaiement: any;
    numberOfItems: number = 0;
    totalMontant: number = 0;
    fraisSupp: number;
    produit$: ProduitLookupDto[];
    structure$: StructureDto[];
    mode$: ModePaiementDto[];

    constructor(
        private router: Router,
        private clientService: ClientService,
        private route: ActivatedRoute,
        private TarifProduitService: TarifProduitService,
        private tarifProduitService :TarifProduitService,
        private structureService: StructureService,
        private  sessionService: SessionService,
        private colisService : ColisService,
        private produitService: ProduitService,
        private fb: FormBuilder,
        private modePaiementService:ModePaiementService,
        private distanceBureauService:DistanceBureauService,
        private messageService : MessageService
    ) { }

    ngOnInit(): void {

        this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
            this.telephone = params['telephone'];
            this.nom = params['nom'];
            this.prenom = params['prenom'];
            this.cni = params['cni'];
            this.idBureau = this.sessionService.getAgentAttributes().structureId;
        });
        this.modePaiementService.findAll().subscribe((result) => {
            this.mode$ = result;
        });

        this.structureService.findAll().subscribe(
            (result) => {
                this.structure$ = result;
            }
        );

        this.produitService.findAll().subscribe(
            (result) => {
                this.produit$ = result;
            }
        );

        this.buildForm();
    }

    buildForm() {
        this.form = this.fb.group({
             modePaiementId: [this.colis.modePaiementId || '', Validators.required],
            payer: [this.colis.payer || "true", Validators.required],
             bureauDestinataireId: [this.colis.bureauDestinataireId || '', Validators.required],
          //  contenu: [this.colis.contenu || '', Validators.required],
            nomDestinataire: [this.colis.nomDestinataire || '', Validators.required],
            prenomDestinataire: [this.colis.prenomDestinataire || '', Validators.required],
            telephoneDestinataire: [this.colis.telephoneDestinataire || '', Validators.required],
            adresseDestinataire: [this.colis.adresseDestinataire || '', Validators.required],
            livraisonDomicile: [this.colis.livraisonDomicile||false ],
            enlevementDomicile: [this.colis.enlevementDomicile || false ],
            produitId: [null],
            quantite: [1],
        });
    }

    getTarifProduit() {
        const produitId = this.form.value.produitId ;
        this.selectedProduit = this.produit$.find(p => p.id === produitId);
        //const selectedLibelle = this.selectedProduit ? this.selectedProduit.libelle : null;
        this.montant = 0;
        if (this.distance != null && produitId) {
          this.tarifProduitService.getTarif(this.distance, produitId).subscribe(
            (result) => {
              this.montant = result.tarif;
              this.form.controls['quantite'].setValue(1);
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

    saveColis() {
        if (this.form.invalid) {
            return;
        }
        this.form.value.caisseId = "1";
        this.form.value.clientId = this.id;
        this.form.value.typeId = "2";
        this.form.value.bureauDepotId = this.idBureau;
        this.form.value.fraisEnlevement = this.fraisEnlevement;
        this.form.value.fraisLivraison = this.fraisLivraison;
        this.form.value.montant = this.totalMontant;
        this.form.value.details = this.colis.details
        this.form.value.contenu = "doc"

    this.colisService.saveProduit(this.form.value).subscribe(
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

    updateMetrics() {
        this.numberOfItems = this.colis.details.length;
        this.totalMontant = this.colis.details.reduce((sum, detail) => sum + ((detail.quantite || 0) * (detail.prix || 0)), 0);
    }

    onQuantiteChange(event: any): void {
        this.checkAndAddProduct();
    }

    checkAndAddProduct(): void {
        if (this.selectedProduit && this.selectedQuantite > 0) {
            this.ajouterProduit();
        }
    }

    ajouterProduit(): void {
        const quantite = this.form.value.quantite;
        if (this.montant >0 && quantite > 0) {
            this.colis.details.push({
                produitId: this.selectedProduit.id,
                produitLibelle: this.selectedProduit.libelle,
                quantite: quantite,
                prix: this.montant,
            });
            this.updateMetrics();
            this.resetSelection();
        }
    }
    incrementQuantity(index: number): void {
        if (this.colis.details[index].quantite < 100) {
            this.colis.details[index].quantite++;
            this.updateMetrics();
        }
    }

    decrementQuantity(index: number): void {
        if (this.colis.details[index].quantite > 1) {
            this.colis.details[index].quantite--;
            this.updateMetrics();
        }
    }

    resetSelection(): void {
        this.form.get('produitId')?.reset();
        this.form.get('quantite')?.reset();
        this.selectedProduit = null;
    }

    getDistance() {
        const idb = this.form.value.bureauDestinataireId;
        this.distance ="";
        this.montant = 0;
        if (this.idBureau && idb) {
          this.distanceBureauService.getDistance(this.idBureau, idb).subscribe(
            (result) => {
              this.distance = result;
              this.getTarifProduit();
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

    addDetail() {
        this.colis.details.push(new ColisDetailsDto());
      }

      removeDetail(index: number) {
        this.colis.details.splice(index, 1);
        this.updateMetrics();
      }

    getFraisLivraison(event: any) {
        if (event.checked) {
            this.TarifProduitService.getOneById("1").subscribe((result) => {
                this.fraisLivraison = result.tarif;
            });
        } else {
            this.fraisLivraison = 0;
        }
    }

    getFraisEnlevement(event: any) {
        if (event.checked) {
            this.TarifProduitService.getOneById("1").subscribe((result) => {
                this.fraisEnlevement = result.tarif;
            });
        } else {
            this.fraisEnlevement = 0;
        }
    }
     getMontant(): number {
        return this.colis.details.reduce(
            (montant, detail) => montant + detail.quantite * detail.prix,
            0
        );
    }

    getMontantAvecFrais(): number {
        return this.getMontant() + this.fraisEnlevement + this.fraisLivraison + this.fraisSupp;
    }


}
