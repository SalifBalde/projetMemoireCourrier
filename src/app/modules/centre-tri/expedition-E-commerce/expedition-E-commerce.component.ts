import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Table } from 'jspdf-autotable';
import { MessageService } from 'primeng/api';
import { SessionService } from 'src/app/proxy/auth/Session.service';
import { EcommerceDto } from 'src/app/proxy/ecommerce';
import { EcommerceService } from 'src/app/proxy/ecommerce/ecommerce.service';
import { StructureDto, StructureService } from 'src/app/proxy/structures';
import { ExpeditionEcomService, ExpeditionEcomDto } from 'src/app/proxy/expeditionEcommerce';

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
    private route: ActivatedRoute,
    private structureService: StructureService,
    private messageService: MessageService,
    private ecommerceService: EcommerceService,
    private expeditionEcomService: ExpeditionEcomService
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.loadStructures();
    this.getAllEcommerceExpeditionCt();
  }

  private initializeForm() {
    this.form = this.fb.group({
      bureauDestination: ['', Validators.required],
      details: [[], Validators.required], 
    });
  }

  private loadStructures() {
    this.structureService.findAll().subscribe(
      (result) => {
        this.structure$ = result;
      },
      (error) => {
        console.error('Erreur lors du chargement des structures', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Échec du chargement des structures',
          life: 3000,
        });
      }
    );
  }

  onBureauDestinationChange(event: any) {
    const bureauId = event.value;
    this.form.controls['bureauDestination'].setValue(bureauId);
    console.log('ID du bureau sélectionné : ', bureauId);
  }

  onSelectionChange() {
    this.form.controls['details'].setValue(this.selectedEcommerce);
    console.log('E-commerce sélectionnés : ', this.selectedEcommerce);
  }

  saveExpedition() {
    if (this.form.invalid) {
      console.log('Le formulaire est invalide.');
      return;
    }

    const detailsMapped = this.mapIdsToColis(this.selectedEcommerce);
    console.log('Détails des e-commerce mappés : ', detailsMapped);

    this.form.value.details = detailsMapped;
    this.form.value.bureauExpediteur = this.sessionService.getAgentAttributes().structureId;

    console.log('Données envoyées pour l\'expédition : ', this.form.value);

    this.expeditionEcomService.save(this.form.value).subscribe(
      (result) => {
        this.expedition = result;
        console.log('Expédition enregistrée : ', result);
        this.router.navigateByUrl('/ct/details-expedition/' + this.expedition.id);
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Le colis a bien été expédié',
          life: 3000,
        });
      },
      (error) => {
        console.error('Erreur lors de l\'enregistrement de l\'expédition', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur lors de l\'enregistrement de l\'expédition',
          life: 3000,
        });
      }
    );
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

  mapIdsToColis(selectedEcommerce: EcommerceDto[]): any[] {
    return selectedEcommerce.map((ecommerce) => {
      console.log('Mappage de l\'eCommerce : ', ecommerce);
      return {
        ecommerceId: ecommerce.id,
        ecommerceNom: `${ecommerce.prenomClient} ${ecommerce.nomClient}`,
        bureauDestinationId: ecommerce.idBureau,
      };
    });
  }
}