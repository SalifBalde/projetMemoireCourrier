import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PdfService } from '../../../../proxy/pdf/pdf.service';
import { SessionService } from '../../../../proxy/auth/Session.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StructureDto, StructureService } from '../../../../proxy/structures';
import { Table } from 'primeng/table';
import { EcommerceService } from 'src/app/proxy/ecommerce/ecommerce.service';
import { EcommerceDto } from 'src/app/proxy/ecommerce';

@Component({
  selector: 'app-reception-e-commerce',
  templateUrl: './reception-e-commerce.component.html',
  providers: [MessageService],
})
export class ReceptionECommerceComponent implements OnInit {
  ecommerce: EcommerceDto[] = []; // Correctly named as an array
  structure$: StructureDto[] = [];
  structure!: StructureDto;
  selectedColis: EcommerceDto[] = [];
  openColisDialog: boolean = false;
  loading: boolean = false;
  selectedEcommerce: EcommerceDto | null = null; // To hold selected ecommerce
  form: FormGroup;

  @ViewChild('dt') dt!: Table;

  constructor(
    private pdfService: PdfService,
    private sessionService: SessionService,
    private fb: FormBuilder,
    private router: Router,
    private ecommerceService: EcommerceService,
    private route: ActivatedRoute,
    private structureService: StructureService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAllEcommerceByStatut();
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      bureauDestinataireId: [undefined, Validators.required],
    });
  }

  // Open a dialog for confirming reception of a specific ecommerce
  openDialog(ecommerce: EcommerceDto): void {
    this.selectedEcommerce = { ...ecommerce };
    this.openColisDialog = true;
  }

  // Confirm reception of the selected ecommerce
  confirmReception(): void {
    if (this.selectedEcommerce) {
      this.openColisDialog = false;

      const ecommerceId = this.selectedEcommerce.id.toString();

      this.ecommerceService
        .reception(ecommerceId, this.sessionService.getAgentAttributes().structureId.toString()) // Convert to string
        .subscribe(() => this.getAllEcommerceByStatut());

      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Reception confirmed',
        life: 3000,
      });

      this.selectedEcommerce = null; // Reset after confirmation
    }
  }

  // Get all ecommerce based on the current status
  getAllEcommerceByStatut(): void {
    this.loading = true;
    const bureauId: number = Number(this.sessionService.getAgentAttributes().structureId);

    if (isNaN(bureauId)) {
      this.loading = false;
      return;
    }

    this.ecommerceService.findEcommerceByDestinationReception(bureauId).subscribe(
      (data) => {
        console.log('Données récupérées : ', data);
        this.ecommerce = data;
        this.loading = false;
      },
      (error) => {
        console.error('Erreur lors du chargement des données eCommerce', error);
        this.loading = false;
      }
    );
  }

  // Save the reception details of the ecommerce item
  saveReception(): void {
    if (this.form.invalid) {
      return;
    }


    this.ecommerceService.save(this.form.value).subscribe(
      (result) => {
        this.getAllEcommerceByStatut();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Colis expédié avec succès',
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

  getBadgeSeverity(statutCourrier: string): string {
    if (!statutCourrier) return 'info';
    switch (statutCourrier.toLowerCase()) {
      case 'déposé':
        return 'danger';
      case 'reçu':
        return 'success';
      default:
        return 'info';
    }
  }
}
