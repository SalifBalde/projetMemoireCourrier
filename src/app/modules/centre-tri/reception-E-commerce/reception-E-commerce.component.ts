import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PdfService } from 'src/app/proxy/pdf/pdf.service';
import { SessionService } from 'src/app/proxy/auth/Session.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StructureDto,StructureService } from 'src/app/proxy/structures';
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

   ngOnInit() {
    this.getAllEcommerceReceptionCt(); 
  }

  getAllEcommerceReceptionCt() {
    this.loading = true;
    this.ecommerceService.findEcommerceReceptionCt().subscribe(
      (result) => {
        this.ecommerce$ = result;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load e-commerce reception data.' });
        console.error('Error fetching e-commerce reception data', error);
      }
    );
  }


  openDialog(ecommerce: EcommerceDto) {
    this.openEcommerceDialog = true;
    this.ecommerce = { ...ecommerce }; 
  }

  confirmReception() {
    this.openEcommerceDialog = false;
  
    if (this.ecommerce) {
      this.ecommerceService
        .reception(this.ecommerce.id.toString(), '1')
        .subscribe(() => this.getAllEcommerceReceptionCt());
  
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
        this.getAllEcommerceReceptionCt();
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
