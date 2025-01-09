import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { KeycloakProfile } from "keycloak-js";
import { Table } from "primeng/table";
import { PdfService } from "../../../proxy/pdf/pdf.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { KeycloakService } from "keycloak-angular";
import { SessionService } from 'src/app/proxy/auth/Session.service';
import { ExpeditionEcomDto, ExpeditionEcomService } from 'src/app/proxy/expeditionEcommerce';

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
    rowsPerPageOptions = [5, 10, 20];
    id = "";
    @ViewChild('dt') dt: Table;

    constructor(
        private expeditionEcomService: ExpeditionEcomService,
        private pdfService: PdfService,
        private sessionService: SessionService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService, private readonly keycloak: KeycloakService
    ) { }

    loadingExpedition: boolean = false;
    loadingReset: boolean = false;

    
    searchExpeditionByCriteres() {
        this.loadingExpedition = true;
        setTimeout(() => {
            this.loadingExpedition = false
        },
            1000);
        let dateDebut = this.form.get('dateDebut').value;
        let dateFin = this.form.get('dateFin').value;
        /*  this.expeditionEcomService.findExpeditionByCriteres(dateDebut,dateFin).subscribe(coli=>{this.expeditionByCriteres=coli;
             this.montant = this.expeditionByCriteres.reduce((sum, item) => sum + parseInt(item.montant), 0);
         }) */
    }
    
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

    async ngOnInit(): Promise<void> {
        this.buildForm();
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
        // this.expeditionEcomService.getAllByStrucuture(this.sessionService.getAgentAttributes().structureId).subscribe(
        this.expeditionEcomService.getAllByStrucuture(this.sessionService.getAgentAttributes().structureId.toString()).subscribe(

            (result) => {
                this.expeditions = result;
            }
        );
    }
    isEmpty() {
        return this.form.value.dateFin != null && this.form.value.dateDebut != null && this.form.value.prenom != null && this.form.value.nom != null;
    }
}
