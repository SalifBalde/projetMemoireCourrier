import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { EcommerceService } from 'src/app/proxy/ecommerce/ecommerce.service';
import { EcommerceDto } from 'src/app/proxy/ecommerce';
import { StructureDto, StructureService } from 'src/app/proxy/structures';
import { PdfService } from 'src/app/proxy/pdf/pdf.service';
import { SessionService } from 'src/app/proxy/auth/Session.service';

@Component({
  selector: 'app-reception-e-commerce',
  templateUrl: './reception-e-commerce.component.html',
  providers: [MessageService],
})
export class ReceptionECommerceComponent implements OnInit {
  ecommerce$: EcommerceDto[] = []; 
  structure$: StructureDto[] = [];
  structure!: StructureDto; 
  selectedEcommerce: EcommerceDto[] = []; 
  openColisDialog: boolean = false;
  loading: boolean = false;

  @ViewChild('dt') dt!: Table;
  form: any;

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
 

  
//   openDialog(colis: ColisDto) {
//     this.openColisDialog = true;
//     this.colis = { ...colis };
// }

// confirmReception() {
//     this.openColisDialog = false;
//     this.ecommerceService
//         .reception(this.colis.id, this.sessionService.getAgentAttributes().structureId)
//         .subscribe(() => this.getAllEcommerceReceptionCt());
//     this.messageService.add({
//         severity: 'success',
//         summary: 'Successful',
//         detail: 'Poids Deleted',
//         life: 3000,
//     });
//     this.ecommerce$ = {};
// }


saveReception() {
    if (this.form.invalid) {
        return;
    }

this.ecommerceService.save(this.form.value).subscribe(
            (result) => {
                this.getAllEcommerceReceptionCt();
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
}