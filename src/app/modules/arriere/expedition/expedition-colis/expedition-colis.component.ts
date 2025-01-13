// import {Component, OnInit, ViewChild} from '@angular/core';
// import {MessageService} from "primeng/api";
// import {ColisDto, ColisService} from "../../../../proxy/colis";
// import {ExpeditionDto, ExpeditionService} from "../../../../proxy/expeditions";
// import {PdfService} from "../../../../proxy/pdf/pdf.service";
// import {SessionService} from "../../../../proxy/auth/Session.service";
// import {FormBuilder, FormGroup} from "@angular/forms";
// import {ActivatedRoute, Router} from "@angular/router";
// import {StructureDto, StructureService} from "../../../../proxy/structures";
// import {CourrierDto, CourrierService} from "../../../../proxy/courrier";
// import {Table} from "primeng/table";
// import {color} from "chart.js/helpers";
// import {Fermeturedto, FermetureService} from "../../../../proxy/fermeture";
// import {KeycloakService} from "keycloak-angular";
// import {KeycloakProfile} from "keycloak-js";
// import {StatutCourrierService, Statutdto} from "../../../../proxy/statut-courrier";

// @Component({
//   selector: 'app-expedition-colis',
//   templateUrl: './expedition-colis.component.html',
//   styleUrl: './expedition-colis.component.scss',
//     providers: [MessageService]
// })
// export class ExpeditionColisComponent implements  OnInit{
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

//     selectedColis!: any;
//     courriersReceptions: any[] = [];
//     courries: any ={};


//     @ViewChild('dt') dt: Table;
//     openCourrierDialog: boolean=false;
//     listeCourriers: [CourrierDto];
//      openColisDialog: boolean= false;
//     colis: any={};
//     selectedStructure: any
//      fermetureData :Fermeturedto;
//     openNumExpDialog: boolean=false;
//     currentYearLastTwoDigits: string;
//     numeroDepech: any
//     structure: StructureDto;
//     public isLoggedIn = false;
//     public userProfile: KeycloakProfile | null = null;
//     fullname = "";
//      statutCourrier: Statutdto[];
//      idStatutFermetureCourrier: any;



//     constructor(
//         private colisService: ColisService,
//         private expeditionService: ExpeditionService,
//         private pdfService: PdfService,
//         private sessionService: SessionService,
//         private fb: FormBuilder,
//         private router: Router,
//         private route : ActivatedRoute,
//         private structureService: StructureService,
//         private courrierService: CourrierService,
//         private messageService: MessageService,
//         private  fermetureService: FermetureService,
//         private readonly keycloak: KeycloakService,
//         private  statutCourrierService: StatutCourrierService,
//     ) {
//         const currentYear = new Date().getFullYear();
//         this.currentYearLastTwoDigits = currentYear.toString().slice(-2);
//        // Prendre les 2 derniers chiffres
//     }

//     async ngOnInit() {
//         this.structureService.findAll().subscribe(
//             (result) => {
//                 const idRecherche = 18; // Remplacez par l'ID que vous recherchez
//                 this.structure$ = result.filter((structure: any) => structure.id === idRecherche);
//                 console.log(this.structure$);
//             },
//             (error) => {
//                 console.error("Erreur lors de la récupération des structures :", error);
//             }
//         );
//         this.getCourriers();


//         this.getStructureById()
//         this.isLoggedIn = await this.keycloak.isLoggedIn();
//         if (this.isLoggedIn) {
//             this.userProfile = await this.keycloak.loadUserProfile();
//             this.fullname = this.userProfile.firstName + " " + this.userProfile.lastName;
//             console.log(this.userProfile)
//         }
//         this.getAllSatutCourrier()
//     }

//     getAllSatutCourrier(){
//         this.statutCourrierService.findAll().subscribe((data)=>{
//             this.statutCourrier=data;
//             console.log(this.statutCourrier)

//            this.idStatutFermetureCourrier =this.statutCourrier = data.filter(statut => statut.id === 3);
//             console.log(this.idStatutFermetureCourrier);  // Afficher les résultats filtrés
//         })

//     }
//     getStructureById(){
//         this.structureService.getOne(this.sessionService.getAgentAttributes().structureId.toString()).subscribe((data)=>{
//             this.structure=data;
//             console.log(this.structure.code)
//         })
//     }
//     isExpeditionDisabled(): boolean {
//         return !this.selectedStructure
//     }
//     getBadgeSeverity(statutCourrier: string ): string {
//         switch (statutCourrier?.toLowerCase()) {
//             case 'déposé': return 'danger';  // Rouge
//             case 'reçu': return 'success';  // Vert
//             default: return 'info';         // Bleu
//         }
//     }
//     getCourriers(){
//         const idType ="2"
//         const idStatu= '2'
//         const idStructureDepo = this.sessionService.getAgentAttributes().structureId.toString()


//         this.courrierService.findCourrierByTypeCourrierAndStructureDepotAndIdStut(idType, idStructureDepo, idStatu).subscribe(
//             (result) => {
//                 this.listeCourriers = result;
//                 console.log(this.listeCourriers)
//             }
//         );
//     }
//     openDialog(courrie: CourrierDto) {
//         if (this.selectedColis.length > 0) {
//             this.openNumExpDialog=true
//         }
//         this.colis = { ...courrie };
//         console.log(courrie)
//         console.log(this.selectedColis)
//     }
//     openDialog1(courrie: CourrierDto) {
//         console.log(this.structure.code+this.numeroDepech+this.currentYearLastTwoDigits)

//             this.openColisDialog=true

//         this.colis = { ...courrie };
//         console.log(courrie)
//         console.log(this.selectedColis)
//         this.openNumExpDialog=false
//     }


//     confirmReception() {
//         // Appeler la méthode saveFermeture pour enregistrer la fermeture
//         this.saveFermetureColis();
//         this.selectedColis = []; // Réinitialiser la sélection après l'enregistrement
//         this.openColisDialog=false;


//     }

//     saveFermetureColis() {
//         try {
//             const structureDepotId = Number(this.sessionService.getAgentAttributes().structureId);
//             const numeroDepeche = `${this.structure.code}${this.numeroDepech}${this.currentYearLastTwoDigits}`;
//             console.log(numeroDepeche);
//             // Vérification des colis sélectionnés
//             if (!this.selectedColis || this.selectedColis.length === 0) {
//                 this.messageService.add({
//                     severity: 'warn',
//                     summary: 'Attention',
//                     detail: 'Veuillez sélectionner au moins un colis.',
//                     life: 3000,
//                 });
//                 return;
//             }
//             // Préparation des données pour l'enregistrement
//             this.fermetureData = {
//                 structureDepotId: structureDepotId,
//                 structureDestinationId: this.selectedStructure,
//                 numeroDepeche: numeroDepeche,
//                 date: new Date().toISOString(),
//                 userId: 1, // Vous pouvez ajuster selon l'utilisateur connecté
//                 idStatutCourrier: this.idStatutFermetureCourrier[0]?.id,
//                 fermetureCourriers: this.selectedColis.map((colis) => ({
//                     courrierId: colis.id,
//                 })),
//             };
//             const selectedColisCopy = [...this.selectedColis]; // Copie défensive
//             // Appel au service pour enregistrer la fermeture
//             this.fermetureService.saveFermeture(this.fermetureData).subscribe(
//                 (response) => {

//                     // Mise à jour des courriers après la fermeture
//                     selectedColisCopy.forEach((colis) => {
//                         const courrieId = colis.id.toString();
//                         colis.statutCourrier.id=this.idStatutFermetureCourrier[0]?.id
//                         this.courrierService.update(courrieId, colis).subscribe(
//                             () => {
//                                 this.getCourriers()
//                             },
//                             (error) => {
//                                 console.error(`Erreur lors de la mise à jour du colis ${colis.id}:`, error);
//                             }
//                         );
//                     });
//                     this.messageService.add({
//                         severity: 'success',
//                         summary: 'Succès',
//                         detail: 'Colis expédié avec succès.',
//                         life: 3000,
//                     });
//                 },
//                 (error) => {
//                     console.error('Erreur lors de l\'enregistrement de la fermeture:', error);
//                     this.messageService.add({
//                         severity: 'error',
//                         summary: 'Erreur',
//                         detail: 'Une erreur s\'est produite lors de l\'enregistrement de la fermeture.',
//                         life: 3000,
//                     });
//                 }
//             );
//         } catch (error) {
//             console.error('Erreur inattendue:', error);
//             this.messageService.add({
//                 severity: 'error',
//                 summary: 'Erreur inattendue',
//                 detail: 'Veuillez contacter l\'administrateur.',
//                 life: 3000,
//             });
//         }
//     }

// }
