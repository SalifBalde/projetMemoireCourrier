import {Component, OnInit} from '@angular/core';
import {type CourrierCreateUpdateDto, CourrierDto, CourrierService} from "../../../../proxy/courrier";
import {FactureService} from "../../../../proxy/pdf/facture.service";
import {PdfService} from "../../../../proxy/pdf/pdf.service";
import {MessageService} from "primeng/api";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {FermetureService} from "../../../../proxy/fermeture";
import {FermetureCourrierService} from "../../../../proxy/fermetureCourrier";
import {StatutCourrierService} from "../../../../proxy/statut-courrier";
import {SessionService} from "../../../../proxy/auth/Session.service";
import {SuiviCourrierService} from "../../../../proxy/suiviCourrier";
import {ButtonModule} from "primeng/button";
import {CategorieDto, CategorieService} from "../../../../proxy/categorie";
import {ClientDto} from "../../../../proxy/client";
import {Paysdto} from "../../../../proxy/pays";
import {TypeCourrierDto} from "../../../../proxy/type-courrier";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-detail-packet',
  standalone: true,
    imports: [
        ButtonModule,
        NgIf
    ],
  templateUrl: './detail-packet.component.html',
  styleUrl: './detail-packet.component.scss',
    providers: [MessageService],

})
export class DetailPacketComponent implements  OnInit{
     courrierId: any;
     Courrier: CourrierDto;
    courrier: CourrierDto;
    label: string
    paysDestinationId: any;
    categorieId: any;
    poids: number;
    codebarre: string;
    expediteurId: any;
    typeCourrierId:any
    destinateurId: any;
    categori: CategorieDto;
    clientDialog: boolean;
    client: ClientDto = {};
    formClient: FormGroup;
    formDestinataire: FormGroup;
    destinataire: ClientDto = {};
    destinataireDialog: boolean;
    loading: boolean;
    clients: ClientDto[] = [];
    pays$: Paysdto[];
    categorie$: CategorieDto[];
    typeCourrier$: TypeCourrierDto[];

    constructor(
        private courrierService: CourrierService,
        private factureService: FactureService,
        private pdfService:PdfService,
        private messageService: MessageService,
        private fb: FormBuilder,
        private router: Router,
        private route : ActivatedRoute,
        private  fermetureService : FermetureService,
        private categorieService: CategorieService,
        private  statutCourrierService: StatutCourrierService,
        private sessionService: SessionService,
        private suiviCourrierService: SuiviCourrierService


    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.courrierId = params['id']; // Convertir en nombre avec "+"
                console.log('ID de la fermeture:', this.courrierId);
            } else {
                console.error('Aucun paramètre ID trouvé dans la route.');
            }
        });

        this.getCourrierById(this.courrierId)
    }

    getCourrierById(courrierId:string ){
        this.courrierService.getOneById(courrierId).subscribe(
            (result) => {
                this.Courrier= result
                console.log(this.Courrier);
            });
    }


    getPaysLibelle(paysId: number): string {
        const pays = this.pays$.find(p => p.id === paysId);
        return pays ? pays.libelle : '';
    }

    getCategorieLibelle(categorieId: string): string {
        const categorie = this.categorie$.find(c => c.id === categorieId);
        return categorie ? categorie.libelle : '';
    }

}
