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
import { PdfExportService } from 'src/app/proxy/pdf-export/pdf-export.service';
import { UserDto } from 'src/app/proxy/users';

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
    user: UserDto = {} ;
    expeditions: ExpeditionEcomDto[] = [];
    cols: any[] = [];
    structure$: StructureDto[] = [];
    expeditionSearch: ExpeditionSearchDto = {};
    rowsPerPageOptions = [5, 10, 20];
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
        private pdfExportService : PdfExportService,
        private structureService: StructureService,
        private messageService: MessageService,
        private readonly keycloak: KeycloakService
    ) { }

    async ngOnInit(): Promise<void> {
        this.buildForm();
        this.loadStructures();

        this.isLoggedIn = await this.keycloak.isLoggedIn();
        if (this.isLoggedIn) {
            this.userProfile = await this.keycloak.loadUserProfile();
            this.fullname = this.userProfile.firstName + " " + this.userProfile.lastName;
        }
    }

    buildForm() {
        const today = new Date();
        this.form = this.fb.group({
            debut: [today, Validators.required],
            fin: [today, Validators.required],
            numenvoi: [undefined],
            bureauDestination: [undefined],
            bureauExpediteur: [undefined]
        });
    }

    private loadStructures() {
        this.structureService.getBureaux().subscribe(
            (result) => {
                this.structure$ = result;
            },
            (error) => {
                console.error('Error loading structures', error);
            }
        );
    }

    searchExpeditionByCriteres(): void {
        this.loading=true;
        const debut = this.form.get('debut')?.value;
        const fin = this.form.get('fin')?.value;

        if (!debut || !fin) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Avertissement',
                detail: 'Veuillez sélectionner une période valide.'
            });
            return;
        }

        if (new Date(debut) > new Date(fin)) {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: 'La date de début ne peut pas être après la date de fin.'
            });
            return;
        }

        const bureauId = this.sessionService.getAgentAttributes().structureId.toString();

        const formattedCriteria = {
            ...this.form.value,
            debut: new Date(debut).toISOString().split('T')[0],
            fin: new Date(fin).toISOString().split('T')[0],
            bureauId: bureauId
        };

        this.loading = true;
        this.expeditionEcomService.findExpeditionByCriteres(formattedCriteria).subscribe({
            next: (expeditions) => {
                if (expeditions.length > 0) {
                    this.expeditions = expeditions || [];
                } else {
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Aucun résultat',
                        detail: 'Aucun colis trouvé pour la période sélectionnée.'
                    });
                    this.expeditions = [];
                    this.montant = 0;
                }
                this.loading = false;
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Une erreur est survenue lors de la récupération des données.'
                });
                this.loading = false;
            }
        });
    }

    resetForm() {
        this.loadingReset = true;
        setTimeout(() => {
            this.loadingReset = false;
        }, 1000);

        const today = new Date().toISOString().split('T')[0];
        this.form = this.fb.group({
            debut: [today, Validators.required],
            fin: [today, Validators.required],
            prenom: [undefined, Validators.required],
            nom: [undefined, Validators.required]
        });

        this.searchExpeditionByCriteres();
    }

    generatePdf(): void {
        const columns = [
            { header: 'Code', dataKey: 'numenvoi' },
            { header: 'Bureau Dépôt', dataKey: 'bureauExpediteurLibelle' },
            { header: 'Bureau Destination', dataKey: 'bureauDestinationLibelle' },
            { header: 'Date', dataKey: 'createdAt' }
        ];

        const dateDebut = this.form.get('debut')?.value?.toLocaleDateString('fr-FR') || 'Non spécifié';
        const dateFin = this.form.get('fin')?.value?.toLocaleDateString('fr-FR') || 'Non spécifié';
        const dateRange = `Du ${dateDebut} au ${dateFin}`;

        const bureauRange = this.user.structureLibelle
            ? `Bureau : ${this.user.structureLibelle}`
            : 'Bureau : Non spécifié';

        this.pdfExportService.exportPDF(
            this.expeditions,
            'Rapport JT3 Ecommerce',
            columns,
            dateRange,
            bureauRange
        );
    }

    isEmpty() {
        return this.form.value.fin != null && this.form.value.debut != null && this.form.value.prenom != null && this.form.value.nom != null;
    }
}
