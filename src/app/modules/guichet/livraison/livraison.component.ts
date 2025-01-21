import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ColisDto, ColisService } from 'src/app/proxy/colis';
import {ActivatedRoute, Router} from '@angular/router';
import {CourrierDto, CourrierService} from "../../../proxy/courrier";
import {PdfService} from "../../../proxy/pdf/pdf.service";
import {SessionService} from "../../../proxy/auth/Session.service";
import {StructureService} from "../../../proxy/structures";
import {TypeCourrierService} from "../../../proxy/type-courrier";
import {SuiviCourrierService} from "../../../proxy/suivi-courrier";
import {FermetureCourrierService} from "../../../proxy/fermetureCourrier";
import {StatutCourrierService} from "../../../proxy/statut-courrier";
import {NouexService} from "../../../proxy/noeux";
import {BureauxDouanierService} from "../../../proxy/burauex_douaniers";
@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.component.html',
})
export class LivraisonComponent implements OnInit {
  form: FormGroup;
  montant = 0;
  colis$: CourrierDto[] = [];
  loadingColis: boolean = false;
  selectedColis: any  = {};
  displayDialog: boolean = false;
  montantTotal: number = 0;
  payer: boolean = false;

  selectedColisForDeletion: Set<ColisDto> = new Set();
  allSelected: boolean = false;
    openCourrierDialog: boolean = false;
    openNumExpDialog: boolean = false;
    colis: any={}
     iduser: any;
    isTaxeValid: boolean = false;
    fraisFixes = 0;
    totalpaye:number

  constructor(
      private courrierService:CourrierService,
      private pdfService: PdfService,
      private sessionService: SessionService,
      private fb: FormBuilder,
      private router: Router,
      private route : ActivatedRoute,
      private structureService: StructureService,
      private messageService: MessageService,
      private  typeCourrierService:TypeCourrierService,
      private  suiviCourrier:SuiviCourrierService,
      private fermetureCourrierService : FermetureCourrierService,
      private  statutCourrierService: StatutCourrierService,
      private noeuxService: NouexService,
      private bureauxDouanier: BureauxDouanierService,
  ) {}

  ngOnInit(): void {
    this.buildForm();
      this.iduser=this.sessionService.getAgentAttributes()?.id
      this.getCourrierByStructureDepotAndStatutIds()
  }

  buildForm() {
    this.form = this.fb.group({
      dateDebut: [undefined, Validators.required],
      dateFin: [undefined, Validators.required],
    });
  }
    getCourrierByStructureDepotAndStatutIds() {
        const statutIds = '10';
        const structureDestination= this.sessionService.getAgentAttributes().structureId
        this.courrierService.findCourrierByStrutureDepotAndStatutId(
            structureDestination,
            statutIds).subscribe(
            (result) => {
                this.colis$ = result;
                console.log(result)
                console.log(this.colis$);
            },
            (error) => {
                console.error('Erreur lors de la récupération des courriers:', error);
            }
        );
    }

    getBadgeSeverity(typeCourrierLibelle: string): string {
        // Vérifier que la valeur n'est pas undefined ou null avant de la traiter
        if (!typeCourrierLibelle) {
            return 'secondary'; // Gris pour une valeur indéfinie
        }

        // Convertir en minuscules pour assurer que la comparaison est insensible à la casse
        const type = typeCourrierLibelle.toLowerCase();

        // Utilisation d'un switch sur la version en minuscules
        switch (type) {
            case 'paquet':
                return 'warning';  // Jaune pour "Paquet"
            case 'lettre':
                return 'success';  // Vert pour "Lettre"
            case 'colis':
                return 'help';     // Bleu pour "Colis"
            default:
                return 'danger'; // Gris pour les autres cas
        }
    }



    // getAllColis() {
  //   this.loadingColis = true;
  //   this.colisService.findAll().subscribe(
  //     (result) => {
  //       this.colis$ = result;
  //       this.montant = this.colis$.reduce((sum, item) => sum + Number(item.montant || 0), 0);
  //       this.loadingColis = false;
  //     },
  //     (error) => {
  //       console.error('Erreur lors de la récupération des colis:', error);
  //       this.loadingColis = false;
  //     }
  //   );
 // }

  voirColis(colis: CourrierDto) {
    this.selectedColis = colis;
    //this.calculerMontantTotal();
    this.montant = colis.taxeMagasinage;
    console.log('payer:', this.payer);
    this.displayDialog = true;
  }

    openDialog(colis: CourrierDto) {

            this.colis = { ...colis };
        this.openNumExpDialog = true
        console.log( this.openNumExpDialog)
    }

    closeModal() {
        this.openCourrierDialog = false;
    }

    openDialog1(colis: CourrierDto) {
        this.openCourrierDialog=true
        this.colis = { ...colis };
        this.openNumExpDialog=false
        this.calculateTotal(colis)
    }

    calculateTotal(colis:any) {
        console.log(colis)
        const taxeMagasinage = this.colis.taxeMagasinage || 0;
        const taxeDouane = this.colis.taxeDouane || 0;
        console.log(taxeDouane, taxeMagasinage)
        this.totalpaye = taxeMagasinage + taxeDouane;
    }

    confirmReception() {
        this.savecolis();
        this.selectedColis = []; // Réinitialiser la sélection après l'enregistrement
        this.openCourrierDialog=false;

    }
    validateTaxeMagasinage() {
        // Vérifie si la taxe magasinage est un nombre valide et supérieur à zéro
        this.isTaxeValid = this.colis.taxeMagasinage > 0;
        let totalpaye =this.selectedColis.taxeMagasinage+this.selectedColis.taxeDouane
    }



  supprimerSelection() {
      if (this.selectedColisForDeletion.size === 0) {
          this.messageService.add({
              severity: 'warn',
              summary: 'Avertissement',
              detail: 'Aucun colis sélectionné pour la suppression.',
          });
          return;
      }


  }

  toggleSelection(colis: ColisDto) {
    if (this.selectedColisForDeletion.has(colis)) {
      this.selectedColisForDeletion.delete(colis);
    } else {
      this.selectedColisForDeletion.add(colis);
    }
    console.log('Colis sélectionnés pour suppression:', Array.from(this.selectedColisForDeletion).map(c => c.id));
  }

  selectAll(event: any): void {
    if (event.checked) {
    //  this.colis$.forEach(colis => this.selectedColisForDeletion.add(colis));
    } else {
      this.selectedColisForDeletion.clear();
    }
    this.allSelected = event.checked;
  }

  onRowSelect(event: any) {
    const colis = event.data;
    this.toggleSelection(colis);
  }

  onRowUnselect(event: any) {
    const colis = event.data;
    this.selectedColisForDeletion.delete(colis);
    console.log("Row Unselected: ", colis);
  }



    savecolis() {
        this.openCourrierDialog=false


        // Mise à jour du courrier
        if(this.isTaxeValid){
            this.colis.taxeMagasinage= this.colis.taxeMagasinage
            this.colis.statutCourrierId= 11
            console.log( this.colis)

        this.courrierService.update( this.colis.id,  this.colis).subscribe(
            () => {
                this.getCourrierByStructureDepotAndStatutIds()
                const suiviCourrier = {
                    courrierId:  this.colis.id,
                    idstatutCourrier:  this.colis.statutCourrierId,
                    userId: this.iduser,
                    structureDepotId:  this.colis.structureDepotId,
                    structureDestinationId:  this.colis.structureDestinationId,
                    date: new Date().toISOString(),
                };

                this.suiviCourrier.save(suiviCourrier).subscribe(
                    (data) => {
                        // console.log("Suivi courrier sauvegardé : ", data);

                    },
                    (error) => {
                        console.error("Erreur lors de la sauvegarde du suivi : ", error);
                    }
                );

                // Rafraîchir la liste des courriers
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Colis livré avec succès.',
                    life: 3000,
                });

            },
            (error) => {
                console.error(`Erreur lors de la mise à jour du colis ${this.colis.id}:`, error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Une erreur s\'est produite lors de la livraison  du colis.',
                    life: 3000,
                });
            }

        );
        }
    }
}
