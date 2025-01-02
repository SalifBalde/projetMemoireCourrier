import {Component, OnInit, ViewChild} from '@angular/core';
import {MessageService} from "primeng/api";
import {ColisService} from "../../../../proxy/colis";
import {CourrierDto, CourrierService} from "../../../../proxy/courrier";
import {PdfService} from "../../../../proxy/pdf/pdf.service";
import {SessionService} from "../../../../proxy/auth/Session.service";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {StructureDto, StructureService} from "../../../../proxy/structures";
import {Table} from "primeng/table";

@Component({
  selector: 'app-reception-E-commerce',
  templateUrl: './reception-E-commerce.component.html',
  providers: [MessageService],
})
export class ReceptionECommerceComponent implements OnInit {
 
    
         listeCourrier: [CourrierDto];
         listeColis: [CourrierDto];
         openColisDialog: boolean;
         colis: any={}
        @ViewChild('dt') dt: Table;
         structure$: [StructureDto];
        selectedColis: any;
    
    
        constructor( private colisService: ColisService,
                     private courrierService:CourrierService,
                     private pdfService: PdfService,
                     private sessionService: SessionService,
                     private fb: FormBuilder,
                     private router: Router,
                     private route : ActivatedRoute,
                     private structureService: StructureService,
                     private messageService: MessageService,) {
    
    
        }
        loading: boolean = false;
        cities: any;
        selectedCity: any;
    
    
        load() {
            this.loading = true;
    
            setTimeout(() => {
                this.loading = false
            }, 2000);
        }
    
        ngOnInit(): void {
            this.structureService.findAll().subscribe(
                (result) => {
                    this.structure$ = result;
                }
            );
           this.getAllCourriers()
            this.getCourriers()
    
        }
    
    
        getAllCourriers(){
    
            this.courrierService.findAll().subscribe(
                (result) => {
                    this.listeCourrier = result;
                    console.log(this.listeCourrier)
                }
            );
        }
    
        getCourriers(){
            const idType ="2"
            const idStatu= '1'
            const idStructureDepo = this.sessionService.getAgentAttributes().structureId.toString()
    
    
            this.courrierService.findCourrierByTypeCourrierAndStructureDepotAndIdStut(idType, idStructureDepo, idStatu).subscribe(
                (result) => {
                    this.listeColis = result;
                    console.log(this.listeColis)
                }
            );
        }
        openDialog(courrie: CourrierDto) {
            this.openColisDialog = true;
            this.colis = { ...courrie };
            console.log(courrie)
        }
        isExpeditionDisabled(): boolean {
            return !this.selectedColis
    
        }
    
        // confirmReception() {
        //     console.log(this.colis)
        //     const courrieId = this.colis.id.toString();
        //     console.log(courrieId)
        //     this.colis.statutCourrier.id = 2
        //     this.openColisDialog=false
        //
        //     this.courrierService.update(courrieId,this.colis).subscribe(
        //         (result) => {
        //             this.getCourriers();
        //             this.messageService.add({
        //                 severity: 'success',
        //                 summary: 'Successful',
        //                 detail: 'Colis Réceptionné avec succés',
        //                 life: 3000,
        //             });
        //         },
        //         (error) => {
        //             this.messageService.add({
        //                 severity: 'danger',
        //                 summary: 'Error',
        //                 detail: 'Erreur de Réceptionne',
        //                 life: 3000,
        //             });
        //         }
        //     );
        //
        //
        // }
        confirmReception() {
            console.log(this.selectedColis);
    
            this.openColisDialog = false;
    
            this.selectedColis.forEach((courrier) => {
                courrier.statutCourrier = { id: 2 }; // Met le statut à 'réceptionné'
            });
            console.log(this.selectedColis);
    
            // Appel au service pour mettre à jour l'élément
            this.courrierService.updateCourriers(this.selectedColis).subscribe(
                (result) => {
                    this.getCourriers();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Courrier réceptionné avec succès',
                        life: 3000,
                    });
                },
                (error) => {
                    // En cas d'erreur
                    this.messageService.add({
                        severity: 'danger',
                        summary: 'Error',
                        detail: 'Erreur de réception',
                        life: 3000,
                    });
                }
            );
        }
        getBadgeSeverity(statutCourrier: string ): string {
            switch (statutCourrier?.toLowerCase()) {
                case 'déposé': return 'danger';  // Rouge
                case 'reçu': return 'success';  // Vert
                default: return 'info';         // Bleu
            }
        }
    
    
    
    }
    