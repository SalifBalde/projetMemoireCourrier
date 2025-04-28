import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Table } from 'jspdf-autotable';
import { MessageService } from 'primeng/api';
import { SessionService } from 'src/app/proxy/auth/Session.service';
import { EcommerceDto, EcommerceService } from 'src/app/proxy/ecommerce';
import { StructureDto, StructureService } from 'src/app/proxy/structures';
import { ExpeditionEcomService, ExpeditionEcomDto, ExpeditionEcomDetailsDto } from 'src/app/proxy/expeditionEcommerce';


@Component({
    selector: 'app-expedition-e-commerce',
    templateUrl: './expedition-e-commerce.component.html',
    providers: [MessageService],
})
export class ExpeditionECommerceComponent implements OnInit {
    structure$: StructureDto[] = [];
    ecommerce$!: EcommerceDto[];
    expedition!: ExpeditionEcomDto;

    @ViewChild('dt') dt!: Table;
    openCourrierDialog: boolean = false;
    openNumExpDialog: boolean = false;

    structure!: StructureDto;
    idStatutFermetureCourrier: any;

    loading: boolean = false;
    selectedStructure: StructureDto | null = null;
    selectedEcommerce: EcommerceDto[] = [];
    form!: FormGroup;

    constructor(
        private sessionService: SessionService,
        private fb: FormBuilder,
        private router: Router,
        private structureService: StructureService,
        private messageService: MessageService,
        private ecommerceService: EcommerceService,
        private expeditionEcomService: ExpeditionEcomService
    ) { }

    ngOnInit() {
        this.initializeForm();
        this.loadStructures();
        this.getAllEcommerceByStatut();
    }

    private initializeForm() {
        this.form = this.fb.group({
            bureauDestination: ['', Validators.required],
        });
    }

    private loadStructures() {
      this.structureService.getBureaux().subscribe(
        (result) => {
          this.structure$ = result.filter((structure: StructureDto) => +structure.id === 16);
        },

        (error) => {
          console.error('Error loading structures', error);
        }
      );
    }


    buildForm() {
        this.form = this.fb.group({
            bureauDestination: [undefined, Validators.required],
        });
    }


    saveExpedition() {
        if (this.form.invalid) {
            return;
        }

        this.form.value.details = this.mapIdsToEcommerce(this.selectedEcommerce);
        this.form.value.bureauExpediteur = this.sessionService.getAgentAttributes().structureId.toString();
        this.expeditionEcomService.save(this.form.value).subscribe(
            (result) => {
                //this.getAllEcommerce();
                this.expedition = result;
                this.router.navigateByUrl('/arriere/details-expeditionEcom/' + this.expedition.id);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Envoi e-commerce expédié avec succés',
                    life: 3000,
                });
            },
            (error) => {
                this.messageService.add({
                    severity: 'danger',
                    summary: 'Error',
                    detail: 'Erreur enregistrement',
                    life: 3000,
                });
            }
        );

    }

    onSelectEcommerce(ecommerce: EcommerceDto) {
        if (this.selectedEcommerce.includes(ecommerce)) {
            this.selectedEcommerce = this.selectedEcommerce.filter(item => item !== ecommerce);
        } else {
            this.selectedEcommerce.push(ecommerce);
        }
    }

    getAllEcommerceByStatut() {
        this.loading = true;
        const id: string = '5';
        const bureauId: number = Number(this.sessionService.getAgentAttributes().structureId.toString());

        if (isNaN(bureauId)) {
            this.loading = false;
            return;
        }

        this.ecommerceService.findEcommerceByStatus(id, bureauId).subscribe(
            (data) => {
                this.ecommerce$ = data.map(e =>
                    e.retourner
                        ? {
                            ...e,
                            partenaireBureauLibelle: e.bureauDestinationLibelle,
                            bureauDestinationLibelle: e.partenaireBureauLibelle
                        }
                        : e
                );
                this.loading = false;
            },
            (error) => {
                this.loading = false;
            }
        );

    }

    mapIdsToEcommerce(selectedEcommerce: EcommerceDto[]): ExpeditionEcomDetailsDto[] {
        return selectedEcommerce.map(ecommerce => ({
            ecommerceId: ecommerce.id,
            ecommerceNumenvoie: ecommerce.numenvoi,
            ecommerceNomClient: ecommerce.nomClient,
            ecommercePrenomClient: ecommerce.prenomClient,
            ecommerceIdbureau: ecommerce.idbureau,
            valider: true
        }));
    }

}
