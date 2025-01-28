import {Component, OnInit, ViewChild} from '@angular/core';
import {ColisDto, ColisService} from "../../proxy/colis";
import {PdfService} from "../../proxy/pdf/pdf.service";
import {SessionService} from "../../proxy/auth/Session.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {StructureDto, StructureService} from "../../proxy/structures";
import {MessageService} from "primeng/api";
import {CourrierDto, CourrierService} from "../../proxy/courrier";
import {Table} from "primeng/table";

@Component({
  selector: 'app-centre-tri',
  templateUrl: './centre-tri.component.html',
  styleUrl: './centre-tri.component.scss'
})
export class CentreTriComponent  implements  OnInit{

    form: FormGroup;
    isModalOpen = false;
    montant = 0;
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    id ="";
    structure$: StructureDto[];
    colis$!: ColisDto[];
    courriers!: CourrierDto[];
    colis:ColisDto ={};
    openColisDialog: boolean = false;
    selectedColis!: ColisDto;
    @ViewChild('dt') dt: Table;

    constructor(
        private colisService: ColisService,
        private pdfService: PdfService,
        private sessionService: SessionService,
        private fb: FormBuilder,
        private router: Router,
        private route : ActivatedRoute,
        private structureService: StructureService,
        private messageService: MessageService,
        private courrierService:CourrierService
    ) {}

    loading: boolean = false;

    load() {
        this.loading = true;

        setTimeout(() => {
            this.loading = false
        }, 2000);
    }

    ngOnInit(): void {

        this.structureService.getBureaux().subscribe(
            (result) => {
                this.structure$ = result;
            }
        );

        this.getAllColis();

        this.buildForm();
        this.getAllCourriers()
    }
    buildForm() {
        this.form = this.fb.group({
            bureauDestinataireId: [undefined, Validators.required],
        });
    }

    getAllColis(){

        this.colisService.findColisByStatus("3",this.sessionService.getAgentAttributes().structureId).subscribe(
            (result) => {
                this.colis$ = result;
            }
        );
    }

    getAllCourriers(){
        const  idstatut="3"
        //this.sessionService.getAgentAttributes().structureId
        this.courrierService.findCourrierByStrutureDepotAndStatutId("16", idstatut).subscribe(
            (result) => {
                this.courriers = result;
                console.log(this.courriers)
            }
        );
    }


    openDialog(colis: ColisDto) {
        this.openColisDialog = true;
        this.colis = { ...colis };
    }

    confirmReception() {
        this.openColisDialog = false;
        this.colisService
            .delete(this.colis.id)
            .subscribe(() => this.getAllColis());
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Poids Deleted',
            life: 3000,
        });
        this.colis = {};
    }


    saveReception() {
        if (this.form.invalid) {
            return;
        }

        this.colisService.savePoids(this.form.value).subscribe(
            (result) => {
                this.getAllColis();
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
