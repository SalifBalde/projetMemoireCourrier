import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { KeycloakProfile } from "keycloak-js";
import { Table } from "primeng/table";
import { PdfService } from "../../../proxy/pdf/pdf.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { KeycloakService } from "keycloak-angular";
import { CourrierDto, CourrierSearchDto, CourrierService } from "../../../proxy/courrier";
import { StructureDto, StructureService } from 'src/app/proxy/structures';
import { StatutCourrierService, Statutdto } from 'src/app/proxy/statut-courrier';
import { TypeCourrierService, TypeCourrierDto } from 'src/app/proxy/type-courriers';
import { Paysdto, PaysService } from 'src/app/proxy/pays';
import { SessionService } from 'src/app/proxy/auth/Session.service';

@Component({
    selector: 'app-rapport-criteres',
    templateUrl: './rapport-criteres.component.html',
    providers: [MessageService]
})
export class RapportCriteresComponent {
    form: FormGroup;
    isModalOpen = false;
    montant = 0;
    courrier$: CourrierDto[] = [];
    courrierSearch: CourrierSearchDto = {};
    formDialog: boolean = false;
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    id = "";
    structure$: StructureDto[] = [];
    pays$: Paysdto[] = [];
    typeCourrier$: TypeCourrierDto[] = [];
    statutCourrier$: Statutdto[] = [];
    loadingcourrier: boolean = false;
    loadingReset: boolean = false;
    courrierByCriteres: string;
    date: Date;
    fullname: string;


    @ViewChild('dt') dt: Table;

    constructor(
        private courrierService: CourrierService,
        private pdfService: PdfService,
        private fb: FormBuilder,
        private router: Router,
        private statutCourrierService: StatutCourrierService,
        private tyoeCourrierService: TypeCourrierService,
        private structureService: StructureService,
        private paysService: PaysService,
        private sessionService: SessionService,
        private route: ActivatedRoute,
        private messageService: MessageService, private readonly keycloak: KeycloakService
    ) { }

    resetForm() {
        this.loadingReset = true;
        setTimeout(() => {
            this.loadingReset = false
        }, 1000);
        this.buildForm();
    }

    generatePdf(): void {
        // this.pdfService.generateAgentSalesReport(this.courrier$);
    }

    async ngOnInit(): Promise<void> {
        this.buildForm();
        this.setCourrier()
    }

    buildForm() {
        this.form = this.fb.group({
            debut: [this.courrierSearch.debut ? new Date(this.courrierSearch.debut) : new Date(), Validators.required],
            fin: [this.courrierSearch.fin ? new Date(this.courrierSearch.fin) : new Date(), Validators.required],
            structureDestinationId: [null],
            structureDepotId: [null],
            typeCourrierId: [null],
            statutCourrierId: [null],
            paysOrigineId: [null],
            paysDestinationId: [null]
        });
    }

    setCourrier() {
        this.statutCourrierService.findAll().subscribe(result => {
            this.statutCourrier$ = result;
        });

        this.tyoeCourrierService.findAll().subscribe(result => {
            this.typeCourrier$ = result;
        });

        this.structureService.findAll().subscribe(result => {
            this.structure$ = result;
            // this.structure$  = this.structure$ .filter(structure => structure.id !== this.sessionService.getAgentAttributes().structureId);
        });

        this.paysService.findAll().subscribe(result => {
            this.pays$ = result;
        })
    }

    searchcourrierByCriteres() {
        this.loadingcourrier = true;
        setTimeout(() => {
            this.loadingcourrier = false
        },
            1000);
        this.courrierService.findCourrierByCriteres(this.form.value).subscribe(courrier => {
            this.courrier$ = courrier;
            this.montant = this.courrier$.reduce((sum, item) => sum + Number(item.montant), 10);
        })
    }

    isEmpty() {
        return !this.form.value.debut && !this.form.value.fin &&
            !this.form.value.structureDepotId && !this.form.value.structureDestinationId &&
            !this.form.value.typeCourrierId && !this.form.value.statutCourrierId && !this.form.value.paysOrigineId && !this.form.value.paysDestinationId;
    }
}
