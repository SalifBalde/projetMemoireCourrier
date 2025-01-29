
import { Component, OnInit, ViewChild } from '@angular/core';

import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

//import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {ColisDto, ColisService, CreateUpdateColisDto } from 'src/app/proxy/colis';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StructureDto, StructureService } from 'src/app/proxy/structures';
import { PdfService } from 'src/app/proxy/pdf/pdf.service';
import { SessionService } from 'src/app/proxy/auth/Session.service';
import {CourrierDto, CourrierService} from "../../../proxy/courrier";
import {StatutCourrierService, Statutdto} from "../../../proxy/statut-courrier";
import {SuiviCourrierService} from "../../../proxy/suivi-courrier";

@Component({
    selector: 'app-reception',
  templateUrl: './reception.component.html',
    providers: [MessageService],
  })
  export class ReceptionComponent implements OnInit {
    form: FormGroup;
    isModalOpen = false;
    montant = 0;
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    id ="";
    structure$: StructureDto[];
    colis$!: ColisDto[];
    courriers!: CourrierDto[];
    colis:ColisDto ={};
    openColisDialog: boolean = false;
    selectedColis!: ColisDto;
    selectedStructure: any;
    selectedCourriers!: any;
    courrier: any={};
    courries: any ={};

    @ViewChild('dt') dt: Table;
     listeCourriers: [CourrierDto];
     statutCourrier: Statutdto[];
     idStatutFermetureCourrier: Statutdto[];
     listcourrier: [CourrierDto];
     mystrutct: string;
    iduser: any;
    suiviCourriers:any={}

    constructor(
        private colisService: ColisService,
        private pdfService: PdfService,
        private sessionService: SessionService,
        private fb: FormBuilder,
        private router: Router,
        private route : ActivatedRoute,
        private structureService: StructureService,
        private messageService: MessageService,
        private courrierService:CourrierService,
        private  statutCourrierService: StatutCourrierService,
        private  suiviCourrier:SuiviCourrierService

    ) {}

    loading: boolean = false;

    load() {
        this.loading = true;

        setTimeout(() => {
            this.loading = false
        }, 2000);
    }


    ngOnInit(): void {

        this.structureService.getBureaux().subscribe(
            (result) => {
                this.structure$ = result;
            }
        );
        this.mystrutct = this.sessionService.getAgentAttributes().structureId

        this.buildForm();
      //  this.getAllCourriers()

        this.getAllSatutCourrier()

        this.iduser=this.sessionService.getAgentAttributes()?.id
        console.log(this.iduser)

    }

    getAllSatutCourrier(){
        this.statutCourrierService.findAll().subscribe((data)=>{
            this.statutCourrier=data;
            console.log(this.statutCourrier)

            this.idStatutFermetureCourrier =this.statutCourrier = data.filter(statut => statut.id === 15);
            console.log(this.idStatutFermetureCourrier);
            this.getAllCourrier()// Afficher les résultats filtrés
        })

    }

    buildForm() {
        this.form = this.fb.group({
            bureauDestinataireId: [undefined, Validators.required],
        });
    }

    getAllCourrier(){
        console.log(this.idStatutFermetureCourrier[0].id.toString())
        const  idstatut=this.idStatutFermetureCourrier[0].id.toString()
        const idStructureDepo = this.sessionService.getAgentAttributes().structureId.toString()


        this.courrierService.findCourrierByStrutureDepotAndStatutId( idStructureDepo,idstatut ).subscribe(
            (result) => {
                this.listcourrier = result;
                console.log(this.listcourrier)
            }
        );
    }

    // getAllCourriers(){
    //    const  idstatut="15"
    //
    //     this.courrierService.findCourrierByStrutureDepotAndStatutId( this.sessionService.getAgentAttributes().structureId.toString(), idstatut).subscribe(
    //         (result) => {
    //             this.courriers = result;
    //             console.log(this.courriers)
    //         }
    //     );
    // }

    getBadgeSeveritycourrier(statutCourrier: string ): string {
        switch (statutCourrier?.toLowerCase()) {
            case 'Ferme Messagerie': return 'success';   // Vert
            case 'déposé': return 'danger';  // Rouge

            default: return 'info';         // Bleu
        }
    }
    getBadgeSeveritycolis(statutCourrier: string ): string {
        switch (statutCourrier?.toLowerCase()) {
            case 'Fermer CT': return 'success';   // Vert
            case 'déposé': return 'danger';  // Rouge

            default: return 'info';         // Bleu
        }
    }
    isExpeditionDisabled(): boolean {
        return !this.selectedCourriers

    }

    openDialog(courrie: CourrierDto) {
        this.openColisDialog = true;
        this.courries = { ...courrie };
        console.log(courrie)

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
            courrier.statutCourrier = { id: 16 };  // Assurez-vous que l'ID du statut existe
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
                this.getAllCourrier();

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
