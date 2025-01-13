import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // add this
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import {} from "../../../proxy/type-courriers";
import { CategorieService,CategorieDto } from 'src/app/proxy/categorie';
import { RegimeService , RegimeDto } from 'src/app/proxy/regime';
import { TypeCourrierService,TypeCourrierDto } from '../../../proxy/type-courriers';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',    providers: [MessageService],
})
export class CategoriesComponent implements OnInit {

    form: FormGroup;
    isModalOpen = false;
    categorieDialog: boolean = false;
    deleteCategorieDialog: boolean = false;
    categories: CategorieDto[] = [];
    categorie$: CategorieDto = {};
    cols: any[] = [];
    CategorieDto: CategorieDto;
    regime$ : RegimeDto[];
    typeCourrier$: TypeCourrierDto[];
    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private categorieService: CategorieService,
        private fb: FormBuilder,
        private messageService: MessageService,
        private regimeService: RegimeService,
        private typeCourrierService: TypeCourrierService
    ) {
    }

    ngOnInit(): void {
        this.getAll();

        this.cols = [
            {field: 'libelle', header: 'Libelle'},

        ];
        this.regimeService.findAll().subscribe(
          (result) => {
              this.regime$ = result;
          }
      );

      this.typeCourrierService.findAll().subscribe(
        (result) =>{
          this.typeCourrier$= result;
        }
      )

    }

    // saveregime() {
    //     if (this.form.invalid) {
    //         return;
    //     }
    // }
    buildForm() {
      this.form = this.fb.group({
          libelle: [this.categorie$.libelle || '', Validators.required],
          regimeId: [this.categorie$.regimeId || null, Validators.required],
          typeCourrierId: [this.categorie$.typeCourrierId || null, Validators.required],
      });
  }
  

    openNew() {
        this.categorie$ = {};
        //  this.categorie$.active = true;
        this.buildForm();
        this.categorieDialog = true;
    }
    

    exportCSV() {

    }


    editcategorie(categorie: CategorieDto) {
        this.categorieService.getOneById(categorie.id).subscribe((regime) => {
            this.categorie$ = {...categorie};
            this.buildForm();
            this.categorieDialog = true;
        });
    }

    deletecategorie(categorie: CategorieDto) {
        this.deleteCategorieDialog = true;
        this.categorie$ = {...categorie};
    }

    confirmDelete() {
        this.deleteCategorieDialog = false;
        this.categorieService
            .delete(this.categorie$.id)
            .subscribe(() => this.getAll());
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'regime Deleted',
            life: 3000,
        });
        this.categorie$ = {};
    }

    hideDialog() {
        this.categorieDialog = false;
    }

    savecategories() {
        if (this.form.invalid) {
            return;
        }

        if (this.categorie$.id) {

            console.log(this.form.value.libelle)
            console.log(this.form.value)
            // @ts-ignore
            this.form.value.id = this.categorie$.id;
            this.categorieService
                .update(this.categorie$.id, this.form.value)
                .subscribe(
                    () => {
                        this.categorieDialog = false;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'regime Updated',
                            life: 3000,
                        });
                        this.categorie$ = {};
                        this.getAll();
                    },
                    (error) => {
                        this.messageService.add({
                            severity: 'danger',
                            summary: 'Error',
                            detail: 'Erreur Modification',
                            life: 3000,
                        });
                        this.categorieDialog = true;
                    }
                );
        } else {
            this.CategorieDto = this.form.value
            this.categorieService.save(this.CategorieDto).subscribe(
                () => {
                    this.categorieDialog = false;
                    this.getAll();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'regime Created',
                        life: 3000,
                    });
                    this.categorie$ = {};
                },
                (error) => {
                    this.messageService.add({
                        severity: 'danger',
                        summary: 'Error',
                        detail: 'Erreur enregistrement',
                        life: 3000,
                    });
                    this.categorieDialog = true;
                }
            );
        }

        //this.categories = [...this.categories];
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    getAll() {
        this.categorieService.findAll().subscribe(
            (result) => {
                this.categories = result;
                console.log(this.categories)
            },
            (error) => {
                this.messageService.add({
                    severity: 'danger',
                    summary: 'Error',
                    detail: 'Erreur Serveur',
                    life: 3000,
                });
            }
        );
    }


}
