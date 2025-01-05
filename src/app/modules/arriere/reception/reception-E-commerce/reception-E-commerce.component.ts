import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PdfService } from '../../../../proxy/pdf/pdf.service';
import { SessionService } from '../../../../proxy/auth/Session.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StructureDto, StructureService } from '../../../../proxy/structures';
import { Table } from 'primeng/table';
import { EcommerceService } from 'src/app/proxy/ecommerce/ecommerce.service';
import { EcommerceDto } from 'src/app/proxy/ecommerce';
import { ExpeditionEcomService } from 'src/app/proxy/expeditionEcommerce';

@Component({
  selector: 'app-reception-e-commerce',
  templateUrl: './reception-e-commerce.component.html',
  providers: [MessageService],
})
export class ReceptionECommerceComponent  implements OnInit {
  form: FormGroup;
  isModalOpen = false;
  montant = 0;
  cols: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  id = "";
  structure$: StructureDto[] = [];
  ecommerce$: EcommerceDto[] = [];
  ecommerce: EcommerceDto | null = null;  // Change to a single object
  openEcommerceDialog: boolean = false;
  selectedEcommerce!: EcommerceDto;
  loading: boolean = false;

  @ViewChild('dt') dt: Table;

  constructor(
    private sessionService: SessionService,
    private fb: FormBuilder,
    private router: Router,
    private structureService: StructureService,
    private messageService: MessageService,
    private ecommerceService: EcommerceService,
    private expeditionEcomService: ExpeditionEcomService
  ) {}

  ngOnInit(): void {
    this.structureService.findAll().subscribe((result) => {
      this.structure$ = result;
    });

    this.getAllEcommerceByDestinationReception();
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      bureauDestinataireId: [undefined, Validators.required],
    });
  }

  getAllEcommerceByDestinationReception() {
    this.loading = true;
    this.ecommerceService.findEcommerceByDestinationReception(1).subscribe((result) => {
      console.log(result);  // Vérifier les données récupérées
      this.loading = false;
      this.ecommerce$ = result;
    });
  }
  

  openDialog(ecommerce: EcommerceDto) {
    this.openEcommerceDialog = true;
    this.ecommerce = { ...ecommerce };  // Copy the selected ecommerce into ecommerce object
  }

  confirmReception() {
    this.openEcommerceDialog = false;
  
    if (this.ecommerce) {
      // Assurez-vous que ecommerce est défini avant de l'utiliser
      this.ecommerceService
        .reception(this.ecommerce.id.toString(), '1')
        .subscribe(() => this.getAllEcommerceByDestinationReception());
  
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Poids Deleted',
        life: 3000,
      });
  
      this.ecommerce = null;  // Réinitialiser ecommerce à null
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Données manquantes',
        detail: 'Aucun colis sélectionné.',
        life: 3000,
      });
    }
  }
  


  saveReception() {
    if (this.form.invalid) {
      return;
    }

    this.ecommerceService.save(this.form.value).subscribe(
      (result) => {
        this.getAllEcommerceByDestinationReception();
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Colis expédié avec succès',
          life: 3000,
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'danger',
          summary: 'Erreur',
          detail: 'Erreur d\'enregistrement',
          life: 3000,
        });
      }
    );
  }
}
