
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
import { ExpeditionDetailsDto, ExpeditionDto, ExpeditionService } from 'src/app/proxy/expeditions';
import { SessionService } from 'src/app/proxy/auth/Session.service';
import {CourrierDto, CourrierService} from "../../../proxy/courrier";
import {Fermeturedto, FermetureService} from "../../../proxy/fermeture";
import {StatutCourrierService, Statutdto} from "../../../proxy/statut-courrier";

@Component({
    selector: 'app-expedition',
  templateUrl: './expedition.component.html',
    providers: [MessageService],
  })
  export class ExpeditionComponent implements OnInit {
    form: FormGroup;
    isModalOpen = false;
    montant = 0;
    //colis$: ColisDto[] = [];
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    id ="";
    structure$: StructureDto[];
    colis$!: ColisDto[];
    expedition:ExpeditionDto={};

    selectedColis!: any;
    courriersReceptions: any[] = [];
    courries: any ={};

    numeroDepech: any
    currentYearLastTwoDigits: string;


    @ViewChild('dt') dt: Table;
     openCourrierDialog: boolean=false;
     openNumExpDialog: boolean=false;
     listeCourriers: [CourrierDto];
     structure: StructureDto;
    idStatutFermetureCourrier: any;

    loading: boolean = false;
    selectedStructure: any;
    fermetureData :Fermeturedto;
    courrier: any={};
    statutCourrier: Statutdto[];


    constructor(
        private colisService: ColisService,
        private expeditionService: ExpeditionService,
        private pdfService: PdfService,
        private sessionService: SessionService,
        private fb: FormBuilder,
        private router: Router,
        private route : ActivatedRoute,
        private structureService: StructureService,
        private courrierService: CourrierService,
        private messageService: MessageService,
        private  fermetureService: FermetureService,
        private  statutCourrierService: StatutCourrierService
    ) {
        const currentYear = new Date().getFullYear();
        this.currentYearLastTwoDigits = currentYear.toString().slice(-2); // Prendre les 2 derniers chiffres
    }



    load() {
        this.loading = true;

        setTimeout(() => {
            this.loading = false
        }, 2000);
    }


    ngOnInit(): void {

        this.structureService.findAll().subscribe(
            (result) => {
                this.structure$ = result
                const idRecherche = 16;
                console.log(this.structure$);
                this.structure$ = result.filter((structure: any) => structure.id === idRecherche);
                console.log(this.structure$);
            },
            (error) => {
                console.error("Erreur lors de la récupération des structures :", error);
            }
        );
        this.getCourriers();



        this.buildForm();
       // this.clearList()
        this.getStructureById()
        this.getAllSatutCourrier()
    }

    getAllSatutCourrier(){
        this.statutCourrierService.findAll().subscribe((data)=>{
            this.statutCourrier=data;
            console.log(this.statutCourrier)

            this.idStatutFermetureCourrier =this.statutCourrier = data.filter(statut => statut.id === 3);
            console.log(this.idStatutFermetureCourrier);  // Afficher les résultats filtrés
        })

    }
    getStructureById(){
        this.structureService.getOne(this.sessionService.getAgentAttributes().structureId.toString()).subscribe((data)=>{
            this.structure=data;
            console.log(this.structure.code)
        })
    }


    getBadgeSeverity(statutCourrier: string ): string {
        switch (statutCourrier?.toLowerCase()) {
            case 'déposé': return 'danger';  // Rouge
            case 'reçu': return 'success';  // Vert
            default: return 'info';         // Bleu
        }
    }
    openDialog(courrie: CourrierDto) {
        if (this.selectedColis.length > 0) {
            this.openNumExpDialog=true
        }
        this.courrier = { ...courrie };
        console.log(courrie)
        console.log(this.selectedColis)
    }

    openDialog1(courrie: CourrierDto) {
        console.log(this.structure.code+this.numeroDepech+this.currentYearLastTwoDigits)

        this.openCourrierDialog=true

        this.courrier = { ...courrie };
        console.log(courrie)
        console.log(this.selectedColis)
        this.openNumExpDialog=false
    }


    buildForm() {
        this.form = this.fb.group({
            bureauDestination: [undefined, Validators.required],
        });
    }
    isExpeditionDisabled(): boolean {
        return !this.selectedStructure
    }


     mapIdsToColis(ids: any): ExpeditionDetailsDto[] {
        return ids.map(id => ({ colisId: id.id }));
    }



    confirmReception() {
        // Appeler la méthode saveFermeture pour enregistrer la fermeture
        this.saveFermetureCourrier();
        this.selectedColis = []; // Réinitialiser la sélection après l'enregistrement
        this.openCourrierDialog=false;


    }
    getCourriers(){
        const idType ="1"
        const idStatu= '2'
        const idStructureDepo = this.sessionService.getAgentAttributes().structureId.toString()


        this.courrierService.findCourrierByTypeCourrierAndStructureDepotAndIdStut(idType, idStructureDepo, idStatu).subscribe(
            (result) => {
                this.listeCourriers = result;
                console.log(this.listeCourriers)
            }
        );
    }

    saveFermetureCourrier() {
        try {
            const structureDepotId = Number(this.sessionService.getAgentAttributes().structureId);
            const numeroDepeche = `${this.structure.code}${this.numeroDepech}${this.currentYearLastTwoDigits}`;
            console.log(numeroDepeche);
            // Vérification des colis sélectionnés
            if (!this.selectedColis || this.selectedColis.length === 0) {
                this.messageService.add({
                    severity: 'warn',
                    summary: 'Attention',
                    detail: 'Veuillez sélectionner au moins un colis.',
                    life: 3000,
                });
                return;
            }
            // Préparation des données pour l'enregistrement
            this.fermetureData = {
                structureDepotId: structureDepotId,
                structureDestinationId: this.selectedStructure,
                numeroDepeche: numeroDepeche,
                date: new Date().toISOString(),
                userId: 1, // Vous pouvez ajuster selon l'utilisateur connecté
                idStatutCourrier: this.idStatutFermetureCourrier[0]?.id,
                fermetureCourriers: this.selectedColis.map((colis) => ({
                    courrierId: colis.id,
                })),
            };
            const selectedColisCopy = [...this.selectedColis];
            console.log( this.fermetureData)// Copie défensive
            // Appel au service pour enregistrer la fermeture
            this.fermetureService.saveFermeture(this.fermetureData).subscribe(
                (response) => {

                    // Mise à jour des courriers après la fermeture
                    selectedColisCopy.forEach((colis) => {
                        const courrieId = colis.id.toString();
                        colis.statutCourrier.id=this.idStatutFermetureCourrier[0]?.id
                        this.courrierService.update(courrieId, colis).subscribe(
                            () => {
                                this.getCourriers()
                            },
                            (error) => {
                                console.error(`Erreur lors de la mise à jour du colis ${colis.id}:`, error);
                            }
                        );
                    });
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Colis expédié avec succès.',
                        life: 3000,
                    });
                },
                (error) => {
                    console.error('Erreur lors de l\'enregistrement de la fermeture:', error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erreur',
                        detail: 'Une erreur s\'est produite lors de l\'enregistrement de la fermeture.',
                        life: 3000,
                    });
                }
            );
        } catch (error) {
            console.error('Erreur inattendue:', error);
            this.messageService.add({
                severity: 'error',
                summary: 'Erreur inattendue',
                detail: 'Veuillez contacter l\'administrateur.',
                life: 3000,
            });
        }
    }

}
