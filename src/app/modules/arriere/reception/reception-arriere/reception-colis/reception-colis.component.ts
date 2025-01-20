import {Component, OnInit, ViewChild} from '@angular/core';
import {CourrierDto, CourrierService} from "../../../../../proxy/courrier";
import {Table} from "primeng/table";
import {StructureDto, StructureService} from "../../../../../proxy/structures";
import {TypeCourrierDto, TypeCourrierService} from "../../../../../proxy/type-courrier";
import {StatutCourrierService, Statutdto} from "../../../../../proxy/statut-courrier";
import {Noeuxdto} from "../../../../../proxy/noeux";
import {Paysdto} from "../../../../../proxy/pays";
import {ColisService} from "../../../../../proxy/colis";
import {PdfService} from "../../../../../proxy/pdf/pdf.service";
import {SessionService} from "../../../../../proxy/auth/Session.service";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {SuiviCourrierService} from "../../../../../proxy/suivi-courrier";

@Component({
  selector: 'app-reception-colis',
  templateUrl: './reception-colis.component.html',
  styleUrl: './reception-colis.component.scss',
      providers: [MessageService],

})
export class ReceptionColisComponent  implements  OnInit{
    listeCourrier: [CourrierDto];
    listeColis: [CourrierDto];
    openColisDialog: boolean;
    lettre: any={}
    @ViewChild('dt') dt: Table;
    structure$: [StructureDto];
    selectedColis: any;
    TypeCourrier:TypeCourrierDto
    statutCourrier:Statutdto
    statutCourriers: Statutdto[];
    idStatutFermetureCourrier: any= {};
    typeCourrier:TypeCourrierDto
    iduser:any
    selectedCourriers!: any;
    suiviCourriers:any={}
    fermetureId: number;
    listeColiss: any[]=[];
    statutCourriersarriere: Statutdto[];
    selectedStatut: any;
    Bestnoeux: Noeuxdto;
    paysOrigineId:Paysdto={}
    structureDestna: number;
    showMontantField: boolean = false;
    montants: number | null = null;





    constructor( private colisService: ColisService,
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
                 private  statutCourrierService: StatutCourrierService,

    ) {



    }





    ngOnInit(): void {


        this.structureService.findAll().subscribe(
            (result) => {
                this.structure$ = result;
            }
        );
        this.statutCourrierService.findAll().subscribe((data)=>{
            this.statutCourriers=data;
            console.log(data)
            this.idStatutFermetureCourrier = data.filter(statut => statut.id === 1);
            console.log(this.idStatutFermetureCourrier);
            this.getCourriersArriere()// Afficher les résultats filtrés
        })


        this.iduser= this.sessionService.getAgentAttributes()?.id
        console.log(this.iduser)




    }



    getCourriersArriere(){
        const typeId= '2'
        const structureDepotId=this.sessionService.getAgentAttributes().structureId.toString()
        console.log(this.idStatutFermetureCourrier)
        const statutId= this.idStatutFermetureCourrier[0].id.toString()
        console.log(statutId)

        this.courrierService.findCourrierByTypeCourrierAndStructureDepotAndIdStut(typeId,structureDepotId,statutId).subscribe(
            (result) => {
                this.listeCourrier = result;
                console.log(this.listeCourrier)
            }
        );
    }



    openDialog(courrie: CourrierDto) {
        this.openColisDialog = true;
        this.lettre = { ...courrie };
        console.log(courrie)
    }
    isExpeditionDisabled(): boolean {
        return !this.selectedCourriers

    }


    confirmReception() {
        console.log(this.selectedColis);

        this.openColisDialog = false;

        this.selectedCourriers.forEach((courrier) => {

            courrier.statutCourrier = { id:14 };
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
                this.getCourriersArriere()

                // Message de succès
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Courrier réceptionné avec succès',
                    life: 3000,
                });
            },
            (error) => {
                // En cas d'erreur lors de la mise à jour des courriers
                console.error("Erreur lors de la mise à jour des courriers : ", error);

                // Message d'erreur
                this.messageService.add({
                    severity: 'danger',
                    summary: 'Erreur',
                    detail: 'Erreur de réception',
                    life: 3000,
                });
            }
        );
    }

    getBadgeSeverity(statutLibelle: string): string {
        switch (statutLibelle?.toLowerCase()) {
            case 'reexpédier':
                return 'danger'; // Rouge pour "reexpédier"
            case 'reçu bureau':
                return 'success'; // Vert pour "Reçu bureau"
            case 'en transit':
                return 'info'; // Bleu pour "En transit"
            default:
                return 'secondary'; // Gris pour les autres statuts
        }
    }



}
