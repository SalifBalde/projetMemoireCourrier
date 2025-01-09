import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { KeycloakProfile } from "keycloak-js";
import { Table } from "primeng/table";
import { PdfService } from "../../../proxy/pdf/pdf.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { KeycloakService } from "keycloak-angular";
import { SessionService } from 'src/app/proxy/auth/Session.service';
import { ExpeditionEcomDto, ExpeditionEcomService, ExpeditionSearchDto } from 'src/app/proxy/expeditionEcommerce';
import { StructureDto, StructureService } from 'src/app/proxy/structures';

@Component({
    selector: 'app-rapportEcommerce',
    templateUrl: './rapportEcommerce.component.html',
    providers: [MessageService]
})
export class RapportEcommerceComponent implements OnInit {
    form: FormGroup;
    public isLoggedIn = false;
    public userProfile: KeycloakProfile | null = null;
    fullname = "";
    isModalOpen = false;
    montant = 0;
    expeditions: ExpeditionEcomDto[];
    cols: any[] = [];
    structure$: StructureDto[] = [];
    expeditionSearch: ExpeditionSearchDto = {};
    rowsPerPageOptions = [5, 10, 20];
    id = "";
    loading: boolean = false;
    loadingExpedition: boolean = false;
    loadingReset: boolean = false;
    @ViewChild('dt') dt: Table;

    constructor(
        private expeditionEcomService: ExpeditionEcomService,
        private pdfService: PdfService,
        private sessionService: SessionService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private structureService : StructureService,
        private messageService: MessageService, private readonly keycloak: KeycloakService
    ) { }


    async ngOnInit(): Promise<void> {
        this.buildForm();
        this.loadStructures();

        this.getAllExpedition();
        this.isLoggedIn = await this.keycloak.isLoggedIn();
        if (this.isLoggedIn) {
            this.userProfile = await this.keycloak.loadUserProfile();
            this.fullname = this.userProfile.firstName + " " + this.userProfile.lastName;
        }
    }

    buildForm() {
        this.form = this.fb.group({
            dateDebut: [undefined, Validators.required],
            dateFin: [undefined, Validators.required],
            prenom: [undefined, Validators.required],
            nom: [undefined, Validators.required]
        });
    }

    getAllExpedition() {
        this.expeditionEcomService.getAllByStrucuture(this.sessionService.getAgentAttributes().structureId.toString()).subscribe(
            (result) => {
                this.expeditions = result;
            }
        );
    }

    private loadStructures() {
        this.structureService.findAll().subscribe(
            (result) => {
                this.structure$ = result
            },
            (error) => {
                console.error('Error loading structures', error);
            }
        );
    }
 

    // searchExpeditionByCriteres(): void {
    //     const dateDebut = this.form.get('dateDebut')?.value;
    //     const dateFin = this.form.get('dateFin')?.value;
    
    //     if (!dateDebut || !dateFin) {
    //         this.messageService.add({
    //             severity: 'warn',
    //             summary: 'Avertissement',
    //             detail: 'Veuillez sélectionner une période valide.'
    //         });
    //         return;
    //     }
    
    //     if (new Date(dateDebut) > new Date(dateFin)) {
    //         this.messageService.add({
    //             severity: 'error',
    //             summary: 'Erreur',
    //             detail: 'La date de début ne peut pas être après la date de fin.'
    //         });
    //         return;
    //     }
    
    //     this.loading = true;
    //     this.expeditionEcomService.findExpeditionByCriteres(this.form.value).subscribe({
    //         next: (expeditions) => {
    //             if (expeditions.length > 0) {
    //                 this.expeditions = expeditions || [];
    //                 this.loading = false;
    //             } else {
    //                 this.messageService.add({
    //                     severity: 'info',
    //                     summary: 'Aucun résultat',
    //                     detail: 'Aucun colis trouvé pour la période sélectionnée.'
    //                 });
    //                 this.expeditions = [];
    //                 this.montant = 0;
    //                 this.loading = false;
    //                 return;
    //             }
    //         },
    //         error: (err) => {
    //             this.messageService.add({
    //                 severity: 'error',
    //                 summary: 'Erreur',
    //                 detail: 'Une erreur est survenue lors de la récupération des données.'
    //             });
    //             this.loading = false;
    //         }
    //     });
    // }
    
    resetForm() {
        
        this.loadingReset = true;
        setTimeout(() => {
            this.loadingReset = false
        }, 1000);

        this.form = this.fb.group({
            dateDebut: [undefined, Validators.required],
            dateFin: [undefined, Validators.required],
            prenom: [undefined, Validators.required],
            nom: [undefined, Validators.required]
        });

        this.getAllExpedition();
    }

    generatePdf(): void {
        // this.pdfService.generateAgentSalesReport(this.expeditions);
    }

   
    isEmpty() {
        return this.form.value.dateFin != null && this.form.value.dateDebut != null && this.form.value.prenom != null && this.form.value.nom != null;
    }
}
