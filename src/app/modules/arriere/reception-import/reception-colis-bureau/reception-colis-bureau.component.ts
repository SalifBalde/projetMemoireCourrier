import {Component, OnInit, ViewChild} from '@angular/core';
import {StructureDto, StructureService} from "../../../../proxy/structures";
import {ColisDto, ColisService} from "../../../../proxy/colis";
import {CourrierDto, CourrierService} from "../../../../proxy/courrier";
import {Table} from "primeng/table";
import {StatutCourrierService, Statutdto} from "../../../../proxy/statut-courrier";
import {TypeCourrierDto, TypeCourrierService} from "../../../../proxy/type-courrier";
import {Noeuxdto, NouexService} from "../../../../proxy/noeux";
import {PdfService} from "../../../../proxy/pdf/pdf.service";
import {SessionService} from "../../../../proxy/auth/Session.service";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {SuiviCourrierService} from "../../../../proxy/suivi-courrier";
import {FermetureService} from "../../../../proxy/fermeture";
import {FermetureCourrierService} from "../../../../proxy/fermetureCourrier";

@Component({
  selector: 'app-reception-colis-bureau',
  templateUrl: './reception-colis-bureau.component.html',
  styleUrl: './reception-colis-bureau.component.scss',
    providers: [MessageService],
})
export class ReceptionColisBureauComponent implements  OnInit{
    isModalOpen = false;
    montant = 0;
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    id ="";
    structure$: StructureDto[];
    colis$!: ColisDto[];
    courriers!: CourrierDto[];
    colis:ColisDto ={};
    courries: any ={};
    openColisDialog: boolean = false;
    openCourrierDialog: boolean = false;
    selectedCourriers!: any;
    @ViewChild('dt') dt: Table;
    listeCourriers: any[] = [];
    courrier: any={};
    statutCourrier:Statutdto
    idStatutFermetureCourrier: any;
    typeCourrier: TypeCourrierDto;
    user:any;
    iduser: any;
    suiviCourriers:any={}
    fermetureId: number;
    statutCourriersarriere: Statutdto[];
    loading: boolean = false;
    selectedStatut: any;
    Bestnoeux: Noeuxdto;
    statutCourriers: Statutdto[];





    constructor(
        private colisService: ColisService,
        private courrierService:CourrierService,
        private pdfService: PdfService,
        private sessionService: SessionService,
        private fb: FormBuilder,
        private router: Router,
        private route : ActivatedRoute,
        private structureService: StructureService,
        private messageService: MessageService,
        private  statutCourrierService: StatutCourrierService,
        private  typeCourrierService:TypeCourrierService,
        private  suiviCourrier:SuiviCourrierService,
        private fermetrureService : FermetureService,
        private fermetureCourrierService : FermetureCourrierService,
        private noeuxService: NouexService

    ) {}



    load() {
        this.loading = true;

        setTimeout(() => {
            this.loading = false
        }, 2000);
    }


    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.fermetureId = +params['id'];
            console.log('ID de la fermeture:', this.fermetureId);    });


        this.structureService.findAll().subscribe(
            (result) => {
                this.structure$ = result;
            }
        );

        this.noeuxService.findNoeuxByIdstruct(this.sessionService.getAgentAttributes().structureId.toString()).subscribe(
            (result) => {
                this.Bestnoeux = result;
                console.log(this.Bestnoeux)
                //  this.getAcheminByIdNoeux()
            }
        );
        this.iduser=this.sessionService.getAgentAttributes()?.id

        this.statutCourrierService.findAll().subscribe((data)=>{
            this.statutCourriers=data;
            console.log(this.statutCourrier)
            console.log( this.statutCourriersarriere)
            this.idStatutFermetureCourrier =this.statutCourriers = data.filter(statut => statut.id === 21);
            console.log(this.idStatutFermetureCourrier);  // Afficher les résultats filtrés
            this.getCourriersByFermetureIdAndStatut(this.fermetureId,this.idStatutFermetureCourrier[0].id)
        })



        console.log(this.fermetureId)
    }



    getCourriersByFermetureIdAndStatut(fermetureId:number , statutId:number){
        this.fermetureCourrierService.getCourriersByFermetureIdAndStatut(fermetureId, statutId).subscribe(
            (result) => {
                this.listeCourriers= result
                console.log(this.listeCourriers);
            });
    }



    isExpeditionDisabled(): boolean {

        return !this.selectedCourriers

    }




    openDialog(courrie: CourrierDto) {
        this.openCourrierDialog = true;
        this.courries = { ...courrie };
        console.log(courrie)
    }






    confirmReception() {
        console.log(this.selectedCourriers);
        this.openCourrierDialog = false;
        this.openColisDialog = false;
        console.log(this.selectedStatut)

        this.selectedCourriers.forEach((courrier) => {
                courrier.statutCourrier = { id: 10 };

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
                // Rafraîchir la liste des courriers après la mise à jour
                console.log(this.fermetureId)
                this.selectedStatut=[]
                this.selectedCourriers = [];
                this.listeCourriers=[]
                this.getCourriersByFermetureIdAndStatut(this.fermetureId,this.idStatutFermetureCourrier[0]?.id)
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
