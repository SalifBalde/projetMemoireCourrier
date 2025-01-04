import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Table } from 'jspdf-autotable';
import { MessageService } from 'primeng/api';
import { SessionService } from 'src/app/proxy/auth/Session.service';
import { EcommerceDto } from 'src/app/proxy/ecommerce';
import { EcommerceService } from 'src/app/proxy/ecommerce/ecommerce.service';
import { StructureDto, StructureService } from 'src/app/proxy/structures';
import { ExpeditionEcomService, ExpeditionEcomDto, ExpeditionEcomDetailsDto } from 'src/app/proxy/expeditionEcommerce';

@Component({
  selector: 'app-expedition-e-commerce',
  templateUrl: './expedition-e-commerce.component.html',
  providers: [MessageService],
})
export class ExpeditionECommerceComponent implements OnInit {
  structure$: StructureDto[] = [];
  ecommerce$!: EcommerceDto[];  // Liste des eCommerce
  expedition!: ExpeditionEcomDto;  // Données de l'expédition créée

  @ViewChild('dt') dt!: Table;  // Table de présentation des données
  openCourrierDialog: boolean = false;
  openNumExpDialog: boolean = false;

  structure!: StructureDto;
  idStatutFermetureCourrier: any;

  loading: boolean = false;
  selectedStructure: StructureDto | null = null;
  selectedEcommerce: EcommerceDto[] = [];  // Liste des eCommerce sélectionnés
  form!: FormGroup;  // Formulaire pour l'expédition

  constructor(
    private sessionService: SessionService,
    private fb: FormBuilder,
    private router: Router,
    private structureService: StructureService,
    private messageService: MessageService,
    private ecommerceService: EcommerceService,
    private expeditionEcomService: ExpeditionEcomService
  ) {}

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
    // Chargement des structures disponibles, filtrage sur celles avec l'id 16
    this.structureService.findAll().subscribe(
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

this.form.value.details = this.mapIdsToColis(this.selectedEcommerce);
this.form.value.bureauExpediteur = this.sessionService.getAgentAttributes().structureId;
this.expeditionEcomService.save(this.form.value).subscribe(
            (result) => {
                //this.getAllColis();
                this.expedition = result;
                this.router.navigateByUrl('/arriere/details-expedition/'+this.expedition.id);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Colis expédié avec succés',
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

  getAllEcommerceByStatut() {
    this.loading = true;
    const id: string = '3';  // Statut des eCommerce à récupérer
    const bureauId: number = Number(this.sessionService.getAgentAttributes().structureId);

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


  mapIdsToColis(ids: any): ExpeditionEcomDetailsDto[] {
    return ids.map(id => ({ ecomId: id.id }));
}
}
