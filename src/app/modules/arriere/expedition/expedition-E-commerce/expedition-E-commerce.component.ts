import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'jspdf-autotable';
import { MessageService } from 'primeng/api';
import { SessionService } from 'src/app/proxy/auth/Session.service';
import { CourrierService } from 'src/app/proxy/courrier';
import { EcommerceDto } from 'src/app/proxy/ecommerce';
import { EcommerceService } from 'src/app/proxy/ecommerce/ecommerce.service';
import { StructureDto, StructureService } from 'src/app/proxy/structures';

@Component({
  selector: 'app-expedition-E-commerce',
  templateUrl: './expedition-E-commerce.component.html',
  providers: [MessageService],
})
export class ExpeditionECommerceComponent implements OnInit {
 structure$: StructureDto[];
 ecommerce$!: EcommerceDto[];

  @ViewChild('dt') dt: Table;
      openCourrierDialog: boolean=false;
      openNumExpDialog: boolean=false;
      // listeEcommerce: [EcommerceDto];
      structure: StructureDto;
     idStatutFermetureCourrier: any;
 
     loading: boolean = false;
     selectedStructure: any;
form: any;

  constructor(
     private sessionService: SessionService,
            private fb: FormBuilder,
            private router: Router,
            private route : ActivatedRoute,
            private structureService: StructureService,
            private messageService: MessageService,
            private ecommerceService : EcommerceService,
  ) {}

  ngOnInit() {
     
    this.getAllEcommerceByStatut();
    this.structureService.findAll().subscribe(
      (result) => {
          this.structure$ = result
          const idRecherche = 16;
          this.structure$ = result.filter((structure: any) => structure.id === idRecherche);
      },
  );
  
  }
  
  getAllEcommerceByStatut() {
    this.loading = true;
    const id: string = "3";  
    
    const bureauId: number = Number(this.sessionService.getAgentAttributes().structureId);
  
    if (isNaN(bureauId)) {
      this.loading = false;
      return;
    }
  
    this.ecommerceService.getAllEcommerceByStatus(id, bureauId).subscribe(
      (data) => {
        console.log("Données récupérées : ", data);
        this.ecommerce$ = data;
        this.loading = false;
      },
      (error) => {
        console.error("Erreur lors du chargement des données eCommerce", error);
        this.loading = false;
      }
    );
}

}
