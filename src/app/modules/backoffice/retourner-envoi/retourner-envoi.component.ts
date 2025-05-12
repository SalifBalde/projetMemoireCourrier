import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Table } from 'jspdf-autotable';
import { MessageService } from 'primeng/api';
import { SessionService } from 'src/app/proxy/auth/Session.service';
import { EcommerceDto, EcommerceService } from 'src/app/proxy/ecommerce';
import { ExpeditionEcomDetailsDto, ExpeditionEcomDto, ExpeditionEcomService } from 'src/app/proxy/expeditionEcommerce';
import { StructureDto, StructureService } from 'src/app/proxy/structures';

@Component({
  selector: 'app-retourner-envoi',
  templateUrl: './retourner-envoi.component.html',
  providers: [MessageService]
})
export class RetournerEnvoiComponent implements OnInit {
 structure$: StructureDto[] = [];
    ecommerce$!: EcommerceDto[];
    expedition!: ExpeditionEcomDto;

    @ViewChild('dt') dt!: Table;
    openCourrierDialog: boolean = false;
    openNumExpDialog: boolean = false;

    structure!: StructureDto;
    idStatutFermetureCourrier: any;

    loading: boolean = false;
    selectedStructure: StructureDto | null = null;
    selectedEcommerce: EcommerceDto[] = [];
    form!: FormGroup;

    constructor(
        private sessionService: SessionService,
        private fb: FormBuilder,
        private router: Router,
        private structureService: StructureService,
        private messageService: MessageService,
        private ecommerceService: EcommerceService,
        private expeditionEcomService: ExpeditionEcomService
    ) { }

    ngOnInit() {
        this.initializeForm();
        this.loadStructures();
        this.getAllEcommerceReturn();
    }

    private initializeForm() {
        this.form = this.fb.group({
            bureauDestination: ['', Validators.required],
        });
    }

    private loadStructures() {
      this.structureService.findAll().subscribe(
        (result) => {
          this.structure$ = result.filter((structure: StructureDto) => +structure.id === 16);
        },

        (error) => {
          console.error('Error loading structures', error);
        }
      );
    }


    buildForm() {
        this.form = this.fb.group({
            bureauDestination: [undefined, Validators.required],
        });
    }

    onSelectEcommerce(ecommerce: EcommerceDto) {
        if (this.selectedEcommerce.includes(ecommerce)) {
            this.selectedEcommerce = this.selectedEcommerce.filter(item => item !== ecommerce);
        } else {
            this.selectedEcommerce.push(ecommerce);
        }
    }

    retourner() {
        if (this.selectedEcommerce.length === 0) {
            this.messageService.add({ severity: 'warn', summary: 'Attention', detail: 'Veuillez sélectionner au moins un envoi.' });
            return;
        }

        const ids = this.selectedEcommerce.map(e => e.id);

        this.ecommerceService.retourner(ids).subscribe(
            (response) => {
                this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Les envois ont été retournés avec succès.' });
                this.getAllEcommerceReturn();
                this.selectedEcommerce = [];
            },
            (error) => {
                console.error('Erreur lors du retour des envois', error);
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur est survenue.' });
            }
        );
    }

    getAllEcommerceReturn() {
        this.loading = true;
        this.ecommerceService.findEcommerceReturn().subscribe(
            (data) => {
                this.ecommerce$ = data;
                this.loading = false;
            },
            (error) => {
                this.loading = false;
                console.error('Erreur de chargement des données', error);
            }
        );
    }
}
