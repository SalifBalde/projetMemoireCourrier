import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Table } from 'jspdf-autotable';
import { MessageService } from 'primeng/api';
import { SessionService } from 'src/app/proxy/auth/Session.service';
import { EcommerceDto, EcommerceService } from 'src/app/proxy/ecommerce';
import { StructureDto, StructureService } from 'src/app/proxy/structures';
import { ExpeditionEcomService, ExpeditionEcomDto, ExpeditionEcomDetailsDto } from 'src/app/proxy/expeditionEcommerce';


interface Structure {
    id: number;
    nom: string;
    adresse?: string;
}

@Component({
    selector: 'app-expedition-e-commerce',
    templateUrl: './expedition-e-commerce.component.html',
    providers: [MessageService],
})
export class ExpeditionECommerceComponent implements OnInit {
    structure$: Structure[] = [];
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

    // private loadStructures() {
    //   // Chargement des structures disponibles, filtrage sur celles avec l'id 16
    //   this.structureService.findAll().subscribe(
    //     (result) => {
    //       this.structure$ = result.filter((structure: StructureDto) => +structure.id === 16);
    //     },
    //     (error) => {
    //       console.error('Error loading structures', error);
    //     }
    //   );
    // }

    private loadStructures() {
        // Simulating data instead of fetching from a service
        this.structure$ = [
            { id: 1, nom: 'Structure A', adresse: 'Adresse A' },
            { id: 2, nom: 'Structure B', adresse: 'Adresse B' },
            { id: 3, nom: 'Structure C', adresse: 'Adresse C' },
        ];
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
        this.form.value.bureauExpediteur = 1;
        this.expeditionEcomService.save(this.form.value).subscribe(
            (result) => {
                //this.getAllEcommerce();
                this.expedition = result;
                this.router.navigateByUrl('/arriere/details-expeditionEcom/' + this.expedition.id);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Envoi ecommerce expédié avec succés',
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
        const id: string = '3';
        // const bureauId: number = Number(this.sessionService.getAgentAttributes().structureId);

        const bureauId: number = Number(1);

        if (isNaN(bureauId)) {
            this.loading = false;
            return;
        }

        this.ecommerceService.findEcommerceByStatus(id, bureauId).subscribe(
            (data) => {
                this.ecommerce$ = data;
                this.loading = false;
            },
            (error) => {
                this.loading = false;
                console.error('Erreur de chargement des données', error);
            }
        );
    }


    mapIdsToEcommerce(ids: any): ExpeditionEcomDetailsDto[] {
        return ids.map(id => ({ ecomId: id.id }));
    }


}
