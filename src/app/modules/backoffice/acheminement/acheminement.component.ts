import {Component, OnInit} from '@angular/core';
import {ColisService} from "../../../proxy/colis";
import {ExpeditionService} from "../../../proxy/expeditions";
import {PdfService} from "../../../proxy/pdf/pdf.service";
import {SessionService} from "../../../proxy/auth/Session.service";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {StructureDto, StructureService} from "../../../proxy/structures";
import {MessageService} from "primeng/api";
import {Noeuxdto, NouexService} from "../../../proxy/noeux";
import {Acheminementdto, AcheminementService} from "../../../proxy/acheminement";
import {CourrierDto, CourrierService} from "../../../proxy/courrier";
import {BureauxDouanierService} from "../../../proxy/burauex_douaniers";
import {FermetureService} from "../../../proxy/fermeture";
import {StatutCourrierService} from "../../../proxy/statut-courrier";
import {SuiviCourrierService} from "../../../proxy/suivi-courrier";
import {catchError, forkJoin} from "rxjs";
import {Table} from "primeng/table";

@Component({
  selector: 'app-acheminement',
  templateUrl: './acheminement.component.html',
  styleUrl: './acheminement.component.scss',
    providers: [MessageService],

})
export class AcheminementComponent implements  OnInit{
     Bestnoeux: Noeuxdto={};
     structure$: StructureDto[];
   noeux$: Noeuxdto[];
    selectedBureaux: any[]=[];
    achemin: Acheminementdto;
    iduser: any;
    selectedNoeud: Noeuxdto;
    acheminChoisi: StructureDto[]=[];
    cols: any[] = [];
    noeudd: any={};
     selectedBureau:StructureDto[]=[]
     noeudchoisi: Noeuxdto;
    openCourrierDialog: boolean=false;
    noeudDialog: boolean =false;

    rowsPerPageOptions = [10, 20, 30];

    constructor(
        private sessionService: SessionService,
        private structureService: StructureService,
        private messageService: MessageService,
        private noeuxService: NouexService,
        private achemeniService: AcheminementService,
        private courrierService: CourrierService,
        private bureauxDouanier: BureauxDouanierService,

    ) {

    }

    ngOnInit(): void {
        console.log(this.sessionService.getAgentAttributes().structureId.toString())
        this.iduser= this.sessionService.getAgentAttributes()?.id
        this.noeuxService.findNoeuxByIdstruct(this.sessionService.getAgentAttributes().structureId.toString()).subscribe(
            (result) => {
                this.Bestnoeux = result;
                console.log(this.Bestnoeux)

            }
        );

        this.structureService.getBureaux().subscribe(
            (result) => {
                this.structure$ = result;

            }
        );

        this.noeuxService.findAll().subscribe(
            (result) => {
                this.noeux$ = result;
            }
        );
        this.cols = [
            { field: 'libelle', header: 'libelle' },

        ];
        this.findAcheminementsByNoeud()
    }


    save() {
        if (!this.selectedBureaux?.length) {
            console.warn("Aucun bureau sélectionné !");
            return;
        }
        console.log(this.selectedNoeud)
        // Construction de la liste d'acheminements


        const acheminements = this.selectedBureaux.map(bureau => ({
            structureId: bureau.id,
            iduser: this.iduser ?? null,
            libelle: bureau.libelle ?? "Libellé par défaut",
            noeud:this.selectedNoeud,
        }));

        console.log("Données envoyées :", acheminements);

        // Envoi en une seule requête
        this.achemeniService.saveMultipleAcheminements(acheminements).subscribe({
            next: (result) =>{
                this.acheminChoisi=result,
                    this.findAcheminementsByNoeud()
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Bureau ajouté avec succès',
                    life: 3000,
                });
            },
            error: (error) => console.error("Erreur lors de l'enregistrement :", error)
        });
        this.acheminChoisi=null
    }

    findAcheminementsByNoeud() {
        console.log(this.selectedNoeud);

        if (!this.selectedNoeud) {
            console.warn("Aucun nœud sélectionné !");
            return;
        }

        // Réinitialiser la liste avant de récupérer de nouvelles données
        this.acheminChoisi = [];

        this.achemeniService.findById(this.selectedNoeud.id).subscribe({
            next: (result) => {
                console.log("Acheminements trouvés :", result);
                for (const acheminementdto of result) {
                    this.structureService.getOne(acheminementdto.structureId.toString()).subscribe((data) => {
                        console.log(data);
                        this.acheminChoisi.push(data);
                        console.log(this.acheminChoisi);
                    });
                }
            },
            error: (error) => {
                console.error("Erreur lors de la récupération des acheminements :", error);
            }
        });
    }


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }
    openDialog1(noeud: Noeuxdto) {
        this.openCourrierDialog=true
        this.noeudd = { ...noeud };
        console.log(this.noeudd)

    }



    confirmReception() {
        this.openCourrierDialog=false;
        if(this.noeudd){
            console.log(this.noeudd)
                    this.achemeniService.deleteByStructureId(this.noeudd.id).subscribe({
                        next: (result) => {
                            this.findAcheminementsByNoeud()
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Bureau supprimé avec succès',
                                life: 3000,
                            });
                        },
                        error: (error) => {
                            console.error("Erreur lors de la récupération des acheminements :", error);
                        }
                    });


            }
        }


    openNew() {
        this.noeudDialog=true

    }
}
