import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Table } from "primeng/table";
import { PdfService } from "../../../proxy/pdf/pdf.service";
import { EcommerceService } from 'src/app/proxy/ecommerce';
import { PartenaireEComService } from 'src/app/proxy/partenaireEcommerce';
import { StatusEcomService } from 'src/app/proxy/statut-ecommerce';
import { StructureService } from 'src/app/proxy/structures';
import { MessageService } from "primeng/api";
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-rapport-ecom',
  templateUrl: './rapport-ecom.component.html',
  providers: [MessageService]
})
export class RapportEcomComponent implements OnInit {
  form: FormGroup;
  ecommerce$: any[] = [];
  partenaire$: any[] = [];
  status$: any[] = [];
  structure$: any[] = [];
  loading = false;
  loadingReset = false;

  @ViewChild('dt') dt: Table;

  constructor(
    private pdfService: PdfService,
    private fb: FormBuilder,
    private ecommerceService: EcommerceService,
    private structureService: StructureService,
    private partenaireEComService: PartenaireEComService,
    private statusEcomService: StatusEcomService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.loadInitialData();
  }

  buildForm() {
    this.form = this.fb.group({
      IdbureauPartenaire: [null],
      idbureau: [null],
      partenaire_e_com_id: [null],
      etatEcomId: [null],
    });
  }

  loadInitialData() {
    this.partenaireEComService.findAll().subscribe(result => this.partenaire$ = result);
    this.ecommerceService.findAll().subscribe(result => this.ecommerce$ = result);
    this.statusEcomService.findAll().subscribe(result => this.status$ = result);
    this.structureService.findAll().subscribe(result => this.structure$ = result);
    
  }


  searchExpeditionByCriteres(): void {
    this.loading = true;
  
    const formattedCriteria = {
        ...this.form.value
    };
  
    this.ecommerceService.findEcommerceByCriteres(formattedCriteria).subscribe({
        next: (ecommerce) => {
            if (ecommerce.length > 0) {
                this.ecommerce$ = ecommerce || [];
                 this.ecommerce$.reduce((sum, item) => sum + Number(item.id), 0); 
            } else {
                this.messageService.add({
                    severity: 'info',
                    summary: 'Aucun résultat',
                    detail: 'Aucun colis trouvé pour la période sélectionnée.'
                });
                this.ecommerce$ = [];
               
            }
            this.loading = false;
        },
        error: (err) => {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: 'Une erreur est survenue lors de la récupération des données.'
            });
            this.loading = false;
        }
    });
  }
  

  resetForm() {
    this.loadingReset = true;
    setTimeout(() => {
      this.loadingReset = false;
      this.buildForm();
    }, 1000);
  }

  isEmpty() {
    return !this.form.value.IdbureauPartenaire && !this.form.value.idbureau &&
           !this.form.value.partenaire_e_com_id && !this.form.value.etatEcomId;
  }
}
