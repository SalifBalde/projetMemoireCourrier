
// import { Component, OnInit, ViewChild } from '@angular/core';

// import { FormGroup,FormBuilder, Validators } from '@angular/forms';
// import { MessageService } from 'primeng/api';
// import { Table } from 'primeng/table';

// //import * as jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import {ColisDto, ColisService, CreateUpdateColisDto } from 'src/app/proxy/colis';
// import { ActivatedRoute, Params, Router } from '@angular/router';
// import { StructureDto, StructureService } from 'src/app/proxy/structures';
// import { PdfService } from 'src/app/proxy/pdf/pdf.service';
// import { ExpeditionDetailsDto, ExpeditionDto, ExpeditionService } from 'src/app/proxy/expeditions';
// import { SessionService } from 'src/app/proxy/auth/Session.service';

// @Component({
//     selector: 'app-expedition',
//   templateUrl: './expedition.component.html',
//     providers: [MessageService],
//   })
//   export class ExpeditionComponent implements OnInit {
//     form: FormGroup;
//     isModalOpen = false;
//     montant = 0;
//     //colis$: ColisDto[] = [];
//     cols: any[] = [];
//     rowsPerPageOptions = [5, 10, 20];
//     id ="";
//     structure$: StructureDto[];
//     colis$!: ColisDto[];
//     expedition:ExpeditionDto={};

//     selectedColis!: ColisDto;


//     @ViewChild('dt') dt: Table;

//     constructor(
//         private colisService: ColisService,
//         private expeditionService: ExpeditionService,
//         private pdfService: PdfService,
//         private sessionService: SessionService,
//         private fb: FormBuilder,
//         private router: Router,
//         private route : ActivatedRoute,
//         private structureService: StructureService,
//         private messageService: MessageService
//     ) {}

//     loading: boolean = false;

//     load() {
//         this.loading = true;

//         setTimeout(() => {
//             this.loading = false
//         }, 2000);
//     }


//     ngOnInit(): void {

//         this.structureService.findAll().subscribe(
//             (result) => {
//                 this.structure$ = result;
//             }
//         );

//         this.getAllColis();

//         this.buildForm();
//     }

//     buildForm() {
//         this.form = this.fb.group({
//             bureauDestination: [undefined, Validators.required],
//         });
//     }

//     getAllColis(){
//         this.colisService.findColisByStatus("2","1").subscribe(
//             (result) => {
//                 this.colis$ = result;
//             }
//         );
//     }

//      mapIdsToColis(ids: any): ExpeditionDetailsDto[] {
//         return ids.map(id => ({ colisId: id.id }));
//     }

//     saveExpedition() {
//         if (this.form.invalid) {
//             return;
//         }

//     this.form.value.details = this.mapIdsToColis(this.selectedColis);
//     this.form.value.bureauExpediteur = this.sessionService.getAgentAttributes().structureId;
//     this.expeditionService.save(this.form.value).subscribe(
//                 (result) => {
//                     //this.getAllColis();
//                     this.expedition = result;
//                     this.router.navigateByUrl('/arriere/details-expedition/'+this.expedition.id);
//                     this.messageService.add({
//                         severity: 'success',
//                         summary: 'Successful',
//                         detail: 'Colis expédié avec succés',
//                         life: 3000,
//                     });
//                 },
//                 (error) => {
//                      this.messageService.add({
//                         severity: 'danger',
//                         summary: 'Error',
//                         detail: 'Erreur enregistrement',
//                         life: 3000,
//                     });
//                 }
//             );

//     }



// }
