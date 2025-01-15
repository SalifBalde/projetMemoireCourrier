








import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Table } from 'jspdf-autotable';
import { MessageService } from 'primeng/api';
import { SessionService } from 'src/app/proxy/auth/Session.service';
import { EcommerceDto, EcommerceService } from 'src/app/proxy/ecommerce';
import { StructureDto, StructureService } from 'src/app/proxy/structures';
import { ExpeditionEcomDetailsDto, ExpeditionEcomDto, ExpeditionEcomService } from 'src/app/proxy/expeditionEcommerce';

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
        this.getAllEcommerceExpeditionCt()
        this.form.get('bureauDestination')?.valueChanges.subscribe((value) => {
            this.selectedStructure = this.structure$.find((structure) => structure.id === value) || null;
            console.log('Structure synchronisée:', this.selectedStructure);
        });
    }

    private initializeForm() {
        this.form = this.fb.group({
            bureauDestination: ['', Validators.required],
        });
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

    buildForm() {
        this.form = this.fb.group({
            bureauDestination: [undefined, Validators.required],
        });
    }


    onSelectEcommerce(ecommerce: EcommerceDto) {
        if (this.selectedEcommerce.includes(ecommerce)) {

            this.selectedEcommerce = this.selectedEcommerce.filter(item => item !== ecommerce);
        } else {

            this.selectedEcommerce.push(ecommerce);
        }
    }

    getAllEcommerceExpeditionCt() {
        this.loading = true;
        this.ecommerceService.findEcommerceExpeditionCt().subscribe(
            (data) => {
                console.log('Données d\'expédition récupérées : ', data);
                this.ecommerce$ = data;
                this.loading = false;
            },
            (error) => {
                console.error('Erreur lors du chargement des données d\'expédition', error);
                this.loading = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Échec du chargement des données d\'expédition',
                    life: 3000,
                });
            }
        );
    }
    saveExpedition() {
        if (this.form.invalid) {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: 'Veuillez remplir tous les champs obligatoires.',
                life: 3000,
            });
            return;
        }

        if (!this.selectedStructure) {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: 'Veuillez sélectionner une destination valide.',
                life: 3000,
            });
            return;
        }

        const invalidEcommerce = this.selectedEcommerce.find(
            (ecommerce) => String(ecommerce.idbureau).trim() !== String(this.selectedStructure?.id).trim()
        );

        if (invalidEcommerce) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Attention',
                detail: 'Vous n\'avez pas choisi la bonne destination pour l\'envoi sélectionné.',
                life: 3000,
            });
            return;
        }

        this.form.value.details = this.mapIdsToEcommerce(this.selectedEcommerce);
        this.form.value.bureauExpediteur = this.selectedStructure?.id;

        this.expeditionEcomService.save(this.form.value).subscribe(
            (result) => {
                this.expedition = result;
                this.router.navigateByUrl('/ct/details-expeditionEcom/' + this.expedition.id);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Envoi ecommerce expédié avec succès.',
                    life: 3000,
                });
            },
            (error) => {
                console.error('Erreur lors de l\'enregistrement:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Erreur lors de l\'enregistrement.',
                    life: 3000,
                });
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
