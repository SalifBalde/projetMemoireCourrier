import {Component, OnInit} from '@angular/core';
import {Noeuxdto, NouexService} from "../../../proxy/noeux";
import {StructureDto, StructureService} from "../../../proxy/structures";
import {CourrierDto, CourrierService} from "../../../proxy/courrier";
import {ColisService} from "../../../proxy/colis";
import {ExpeditionDetailsDto, ExpeditionService} from "../../../proxy/expeditions";
import {PdfService} from "../../../proxy/pdf/pdf.service";
import {SessionService} from "../../../proxy/auth/Session.service";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {AcheminementService} from "../../../proxy/acheminement";
import {SuiviCourrierService} from "../../../proxy/suivi-courrier";

@Component({
  selector: 'app-colis-import',
  templateUrl: './colis-import.component.html',
  styleUrl: './colis-import.component.scss',
    providers: [MessageService],
})
export class ColisImportComponent  implements  OnInit{

    Bestnoeux: Noeuxdto;
    structure$: StructureDto[];
    listcolis: [CourrierDto];
    listnoeux: Noeuxdto[];
    listAchemin: any[]=[];
    selectedStructure: any;
    openColisDialog: boolean = false;
    courries: any ={};
    courrier: any ={};
    selectedCourriers!: any;
    iduser: any;
    suiviCourriers:any={}

    constructor(
        private colisService: ColisService,
        private expeditionService: ExpeditionService,
        private pdfService: PdfService,
        private sessionService: SessionService,
        private fb: FormBuilder,
        private router: Router,
        private route : ActivatedRoute,
        private structureService: StructureService,
        private messageService: MessageService,
        private noeuxService: NouexService,
        private achemeniService: AcheminementService,
        private courrierService: CourrierService,
        private  suiviCourrier:SuiviCourrierService

    ) {

    }
    loading: boolean = false;

    load() {
        this.loading = true;

        setTimeout(() => {
            this.loading = false
        }, 2000);
    }

    ngOnInit(): void {


        this.noeuxService.findNoeuxByIdstruct(this.sessionService.getAgentAttributes().structureId.toString()).subscribe(
            (result) => {
                this.Bestnoeux = result;
                console.log(this.Bestnoeux)
                this.getAcheminByIdNoeux()
            }
        );

        this.structureService.getBureaux().subscribe(
            (result) => {
                this.structure$ = result;
            }
        );


        // this.getCourriers();

        this.getAllNoeux()
        this.getAllColis()
        this.iduser=this.sessionService.getAgentAttributes()?.id
        console.log(this.iduser)

    }

    getAllColis(){

        const  idstatut="6"
        const  idtype="2"
        const idstructure= this.sessionService.getAgentAttributes().structureId.toString()
        console.log(idstructure)


        this.courrierService.findCourrierByTypeCourrierAndStructureDepotAndIdStut( idtype,idstructure, idstatut).subscribe(
            (result) => {
                this.listcolis = result;
                console.log(this.listcolis)
            }
        );
    }
    openDialog(courrie: CourrierDto) {
        this.openColisDialog = true;
        this.courries = { ...courrie };
        console.log(courrie)

    }


    // getCourriers(){
    //   const idStatu= '14'
    //   const idStructureDepo = this.sessionService.getAgentAttributes().structureId.toString()
    //
    //
    //   this.courrierService.findCourrierByStrutureDepotAndStatutId( idStructureDepo, idStatu).subscribe(
    //       (result) => {
    //         this.listeCourriers= result;
    //         console.log(this.listeCourriers)
    //       }
    //   );
    // }

    getBadgeSeverity(statutCourrier: string ): string {
        switch (statutCourrier?.toLowerCase()) {
            // case 'déposé': return 'danger';  // Rouge
            case 'Fermé Messagerie': return 'success';  // Vert
            default: return 'info';         // Bleu
        }
    }
    getAllNoeux(){
        this.noeuxService.findAll().subscribe(
            (result) => {
                this.listnoeux = result;
                console.log(this.listnoeux)
            }
        );
    }
    getAcheminByIdNoeux(){
        console.log(this.Bestnoeux?.id)
        this.achemeniService.findById(this.Bestnoeux.id).subscribe(
            (result) => {
                result.forEach(acheminement => {
                    //   console.log(acheminement.structure_id)
                    this.structureService.getOne(acheminement?.structureId.toString()).subscribe(
                        (structure: StructureDto) => {
                            acheminement.libelle = structure.libelle;
                            this.listAchemin.push(acheminement)
                            //    console.log(this.listAchemin)// Mise à jour du libelle
                        },
                        (error) => {
                            console.error('Erreur lors de la récupération de la structure:', error);
                        }
                    );
                    // }
                });
            }
        );
    }

    isExpeditionDisabled(): boolean {
        return !this.selectedCourriers
    }

    mapIdsToColis(ids: any): ExpeditionDetailsDto[] {
        return ids.map(id => ({ colisId: id.id }));
    }

    confirmReception() {
        if (!this.selectedCourriers || this.selectedCourriers.length === 0) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Avertissement',
                detail: 'Aucun courrier sélectionné',
                life: 3000,
            });
            return;
        };
        this.openColisDialog = false;

        // Met à jour le statut des courriers sélectionnés
        this.selectedCourriers.forEach((courrier) => {
            // Mettre à jour le statut du courrier et l'ID de l'utilisateur
            courrier.statutCourrier = { id: 7 };  // Assurez-vous que l'ID du statut existe
            courrier.userId = this.iduser;

            console.log(courrier);

            // Créer un objet SuiviCourrier pour chaque courrier
            const suiviCourrier = {
                courrierId: courrier.id,
                idstatutCourrier: courrier.statutCourrier.id,
                userId: courrier.userId,
                structureDepotId: courrier.structureDepotId,
                structureDestinationId: courrier.structureDestinationId
            };

            // Sauvegarder les informations de suivi pour chaque courrier
            this.suiviCourrier.save(suiviCourrier).subscribe(
                (data) => {
                    console.log("Suivi courrier sauvegardé : ", data);
                },
                (error) => {
                    console.error("Erreur lors de la sauvegarde du suivi : ", error);
                }
            );
        });
        // Appel au service pour mettre à jour les courriers
        this.courrierService.updateCourriers(this.selectedCourriers).subscribe(
            (result) => {
                // Recharger la liste des courriers après la mise à jour réussie
                this.getAllColis();

                // Affiche un message de succès
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Courrier réceptionné avec succès',
                    life: 3000,
                });
            },
            (error) => {
                // Affiche un message d'erreur
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Erreur lors de la réception des courriers',
                    life: 3000,
                });
            }
        );
    }



}
