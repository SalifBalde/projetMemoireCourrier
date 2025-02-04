import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { generate } from 'rxjs';
import { CourrierDto, CourrierService } from 'src/app/proxy/courrier';
import { Cn22Service } from 'src/app/proxy/pdf/cn22.service';
import { Cn23Service } from 'src/app/proxy/pdf/cn23.service';
import { FactureService } from 'src/app/proxy/pdf/facture.service';
import { PdfService } from 'src/app/proxy/pdf/pdf.service';
import {StatutCourrierService, Statutdto} from "../../../proxy/statut-courrier";
import {FermetureService} from "../../../proxy/fermeture";
import {FermetureCourrierService} from "../../../proxy/fermetureCourrier";
import {SuiviCourrierdto, SuiviCourrierService} from "../../../proxy/suiviCourrier";
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-courrier-details',
  templateUrl: './courrier-details.component.html',
    providers: [MessageService, ],

})
export class CourrierDetailsComponent implements OnInit {
    selectedLettre: CourrierDto  []= null;
    fermetureId: number;
    listeCourriers: any[] = [];
    fermeture: any;
    statutCourrier:Statutdto
    idStatutFermetureCourrier: any;
    statutCourriers: Statutdto[];
     ladate: Date;
     ladateFormatee: string;
     nombreCourriers: number;
     trakingDialog: boolean=false;
    codeBarre: string = '';
    suivis: SuiviCourrierdto[] = [];
    loading: boolean = false;
    dialogVisible: boolean = false; // Indicateur pour afficher ou cacher le dialogue
    selectedSuivi: any = null; // Données du suivi sélectionné


  constructor(
    private courrierService: CourrierService,
    private factureService: FactureService,
    private pdfService:PdfService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router,
    private route : ActivatedRoute,
    private  fermetureService : FermetureService,
    private fermetureCourrierService : FermetureCourrierService,
    private  statutCourrierService: StatutCourrierService,
    private suiviCourrierService: SuiviCourrierService


  ) {}

ngOnInit(): void {
    this.route.params.subscribe((params) => {
        if (params['id']) {
            this.fermetureId = params['id']; // Convertir en nombre avec "+"
            console.log('ID de la fermeture:', this.fermetureId);
        } else {
            console.error('Aucun paramètre ID trouvé dans la route.');
        }
    });
    this.listeCourriers=null
    this.statutCourrierService.findAll().subscribe((data)=>{
        this.statutCourriers=data;
        this.idStatutFermetureCourrier =this.statutCourriers = data.filter(statut => statut.id ===21);
        console.log(this.idStatutFermetureCourrier);  // Afficher les résultats filtrés
        this.getCourriersByFermetureIdAndStatut(this.fermetureId,this.idStatutFermetureCourrier[0].id)
    })

    this.getFermetureById(this.fermetureId)
}
    getCourriersByFermetureIdAndStatut(fermetureId:number , statutId:number){
        this.fermetureCourrierService.getCourriersByFermetureIdAndStatut(fermetureId, statutId).subscribe(
            (result) => {
                this.listeCourriers= result
                console.log(this.listeCourriers);
                this.nombreCourriers = this.listeCourriers.length;
            });
    }
    getFermetureById(fermetureId:number ){
        this.fermetureService.findById(fermetureId).subscribe(
            (result) => {
                this.fermeture= result
                console.log(this.fermeture);
                this.ladate = new Date(this.fermeture.date);
                console.log(this.ladate)
                // Formater la date selon 'yyyy-MM-dd'
                const formatter = new Intl.DateTimeFormat('fr-FR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                });
                this.ladateFormatee = formatter.format(this.ladate);
                console.log(this.ladateFormatee); // Afficher la date formatée
            });
    }

async imprimerFacture(){
    for (const courrier of this.listeCourriers) {
        this.pdfService.generatePDF(courrier);
    }

}
    openDialog(){
        this.trakingDialog=true
        console.log(this.trakingDialog)

    }
    openDialog1(suivi: any) {
        this.selectedSuivi = suivi;
        console.log(this.selectedSuivi)// Assigner les données du suivi sélectionné
        this.dialogVisible = true; // Ouvrir le dialogue
    }

    rechercherParCodeBarre() {

        this.trakingDialog=false
        this.loading = true;
        if (this.codeBarre.trim() !== '') {
            console.log(`Recherche avec code barre: ${this.codeBarre}`);
            this.suiviCourrierService.getByCodeBarre(this.codeBarre).subscribe(
                (data: SuiviCourrierdto[]) => {
                    this.suivis = data;
                    this.codeBarre=null
                    this.openDialog1(this.suivis)
                    console.log(this.suivis)
                    if (this.suivis.length === 0) {
                        this.messageService.add({severity:'info', summary: 'Information', detail: 'Aucun suivi trouvé avec ce code barre.'});
                    }
                    this.loading = false;
                },
                (error) => {
                    console.error(error);
                    this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur lors de la récupération des données.'});
                }

            );
            this.loading = false;

        } else {
            this.messageService.add({severity:'warn', summary: 'Attention', detail: 'Veuillez saisir un code barre valide.'});
        }
        this.loading = false;

    }

async cn23() {
  if (!this.listeCourriers) {
    console.error('Aucun courrier sélectionné pour générer le PDF.');
    return;
  }

  try {
    // Appel du service pour créer le PDF
    await this.factureService .generateReceipt(this.listeCourriers , this.fermeture).then(r => "pdf généré");
    console.log('PDF généré avec succès.');
  } catch (error) {
    console.error('Erreur lors de la génération du PDF :', error);
  }
}


}
