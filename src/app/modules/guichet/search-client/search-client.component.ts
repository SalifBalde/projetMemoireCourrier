import { HttpErrorResponse } from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ClientDto, ClientService, ClientStorageService } from 'src/app/proxy/client';
import {MatStepper} from "@angular/material/stepper";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";
import {ServicesDto, ServicesService} from "../../../proxy/services";
import {CategorieDto, CategorieService} from "../../../proxy/categorie";
import {Regimedto, RegimeService} from "../../../proxy/regime";
import {Paysdto, PaysService} from "../../../proxy/pays";
import {PoidCourrierService} from "../../../proxy/poidCourrier";

@Component({
    selector: 'app-search-client',
    templateUrl: './search-client.component.html',
})
export class SearchClientComponent implements OnInit {

    client: ClientDto = {};
    loading: boolean = false;
    keyword: string = '';
    label: string = '';
    searchForm: FormGroup;
    form: FormGroup;
    searchPerformed: boolean = false;
    isModalOpen = false;
    clientDialog: boolean = false;
    clientNotExistDialog: boolean = false;
    id: string = "";

    @ViewChild('stepper') stepper!: MatStepper;
    listRegime: any[]=[];
    regimchoisi: any;
    poids: any;
    newClient:ClientDto={};
    structure: any[];
    payschoisi: any;
    cathoisi: any;
    serviceschoisi: any[];
    selectedServices: any;
     listService: ServicesDto[]=[];
    serviceDialog: boolean =false;
    service: ServicesDto;
    listeCateg:CategorieDto[]=[];
     filteredCategorie: CategorieDto[];
     regimes: [Regimedto];
     filteredRegime: Regimedto[];
     pays: Paysdto[];
     filteredPays: Paysdto[];
     tarif: any;


    constructor(
        private clientService: ClientService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService,
        private servicesService : ServicesService,
        private categorieService: CategorieService,
        private regimeService : RegimeService,
        private payeService : PaysService,
        private poidCourrierService:PoidCourrierService
    ) { }

    ngOnInit(): void {

        this.searchForm = this.fb.group({
            keyword: ['', Validators.required],
        });
        this.buildForm();
        this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
        });
        this.getAllService();
        this.getAllCategorie();
        this.getAllRegime();
        this.getAllPaye();

    }

    buildForm() {
        this.form = this.fb.group({
            nom: [this.client.nom || '', Validators.required],
            prenom: [this.client.prenom || '', Validators.required],
            adresse: [this.client.adresse || '', Validators.required],
            cni: [this.client.cni || '', Validators.required],
            telephone: [this.client.telephone || '', Validators.required],
            //Validators.pattern(/^\d{7}$/)
            email: [this.client.email],
        });
    }

    searchClient(): void {
        const keyword = this.searchForm.get('keyword').value;

        if (keyword) {
            this.loading = true;
            this.searchPerformed = true;
            this.client = {};
            this.clientService.getClientByTelephoneOrCni(keyword).subscribe(
                (client) => {
                    this.client = { ...client };
                    this.loading = false;
                    this.buildForm();
                    this.clientDialog = true;
                    this.label = " Bonjour: " + this.client.prenom

                    /*    if (!client) {
                          this.buildForm();
                        //this.router.navigateByUrl('/receveur/Creerclientclient');
                      } else {
                        this.clientDialog = true;
                      //  this.router.navigate(['/receveur/Creerclientclient'], { state: { clientData: result } });
                      }  */
                },
                (error: HttpErrorResponse) => {
                    this.loading = false;
                    this.buildForm();
                    this.clientDialog = true;
                   this.clientNotExistDialog=true
                    this.label = "Nouveau Client";
                    /*   if (error.status >= 500 && error.status < 600) {
                        this.messageService.add({ severity: 'error', summary: 'Erreur Serveur', detail: 'Erreur Serveur' });
                      } else {
                        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur Serveur' });
                      } */
                }
            );
        } else {
            this.client = null;
            this.searchPerformed = false;
        }
    }

    searchClientDestinat(): void {
        const keyword = this.searchForm.get('keyword').value;

        if (keyword) {
            this.loading = true;
            this.searchPerformed = true;
            this.client = {};
            this.clientService.getClientByTelephoneOrCni(keyword).subscribe(
                (client) => {
                    this.client = { ...client };
                    this.loading = false;
                    this.buildForm();
                    this.clientDialog = true;
                    this.label = " Bonjour: " + this.client.prenom

                    /*    if (!client) {
                          this.buildForm();
                        //this.router.navigateByUrl('/receveur/Creerclientclient');
                      } else {
                        this.clientDialog = true;
                      //  this.router.navigate(['/receveur/Creerclientclient'], { state: { clientData: result } });
                      }  */
                },
                (error: HttpErrorResponse) => {
                    this.loading = false;
                    this.buildForm();
                    this.clientDialog = true;
                    this.clientNotExistDialog=true
                    this.label = "Nouveau Client";
                    /*   if (error.status >= 500 && error.status < 600) {
                        this.messageService.add({ severity: 'error', summary: 'Erreur Serveur', detail: 'Erreur Serveur' });
                      } else {
                        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur Serveur' });
                      } */
                }
            );
        } else {
            this.client = null;
            this.searchPerformed = false;
        }
    }


    hideDialog() {
        this.clientDialog = false;
        this.clientNotExistDialog=false;
        this.keyword = "";
    }
    getAllService(){
        this.servicesService.getAllService().subscribe((data)=>{
            this.listService= data;
            console.log(this.listService)
        })
    }
    getAllCategorie(){
        this.categorieService.findAll().subscribe((data)=>{
             this.listeCateg= data;
            console.log(this.listeCateg)
        })
    }
    getAllRegime(){
        this.regimeService.findAll().subscribe((data)=>{
            this.regimes= data;
            console.log(this.regimes)
        })
    }
    getAllPaye(){
        this.payeService.findAll().subscribe((data)=>{
            this.pays= data;
            console.log(this.pays)
        })
    }
    filterCategorie(event: AutoCompleteCompleteEvent) {
        let filtered: CategorieDto[] = [];
        let query = event.query;

        for (let i = 0; i < (this.listeCateg as any[]).length; i++) {
            let categorie = (this.listeCateg as any[])[i];
            if (categorie.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(categorie);
            }
        }

        this.filteredCategorie = filtered;
        console.log(this.filteredCategorie)


    }
    filterRegime(event: AutoCompleteCompleteEvent) {
        let filtered: Regimedto[] = [];
        let query = event.query;

        for (let i = 0; i < (this.regimes as any[]).length; i++) {
            let regime = (this.regimes as any[])[i];
            if (regime.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(regime);
            }
        }

        this.filteredRegime = filtered;
        console.log(this.filteredRegime)


    }
    filterPays(event: AutoCompleteCompleteEvent) {
        let filtered: Paysdto[] = [];
        let query = event.query;

        for (let i = 0; i < (this.pays as any[]).length; i++) {
            let pay = (this.pays as any[])[i];
            if (pay.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(pay);
            }
        }

        this.filteredPays = filtered;
        console.log(this.filteredPays)


    }


    saveClient() {
        if (this.form.invalid) {
            return;
        }

        if (this.client.id) {
            this.form.value.id = this.client.id;
            this.clientService
                .update(this.client.id, this.form.value)
                .subscribe(
                    () => {
                        this.clientDialog = false;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Client Updated',
                            life: 3000,
                        });
                        if (this.id == "1")
                            this.router.navigateByUrl('/guichet/creerColisPoids/' + this.client.id + '/' + this.client.nom + ' ' + this.client.prenom + '/' + this.client.telephone);
                        else
                            this.router.navigateByUrl('/guichet/creerColisProduit/' + this.client.id + '/' + this.client.nom + ' ' + this.client.prenom + '/' + this.client.telephone);

                        this.client = {};
                    },
                    (error) => {
                        this.messageService.add({
                            severity: 'danger',
                            summary: 'Error',
                            detail: 'Erreur Modification',
                            life: 3000,
                        });
                        this.clientDialog = true;
                    }
                );
        } else {
            this.newClient = this.form.value
            this.clientService.save(this.newClient).subscribe(
                (result) => {
                    this.client = result;
                    this.loading = false;
                    this.clientDialog = false;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Client Created',
                        life: 3000,
                    });
                    if (this.id == "1")
                        this.router.navigateByUrl('/guichet/creerColisPoids/' + this.client.id + '/' + this.client.nom + ' ' + this.client.prenom + '/' + this.client.telephone);
                    else
                        this.router.navigateByUrl('/guichet/creerColisProduit/' + this.client.id + '/' + this.client.nom + ' ' + this.client.prenom + '/' + this.client.telephone);

                    this.client = {};
                },
                (error) => {
                    this.messageService.add({
                        severity: 'danger',
                        summary: 'Error',
                        detail: 'Erreur enregistrement',
                        life: 3000,
                    });
                    this.clientDialog = true;
                }
            );
        }
    }

    openServiceDialog(){
        this.serviceDialog=true

    }


    nextStep() {
        this.stepper.next();
        console.log(this.regimchoisi,this.cathoisi, this.payschoisi,this.poids , this.client, this.selectedServices)

    }
    previousStep() {
        this.stepper.previous();

    }

    // getTarifByPoid(p:any){
    //     this.poidCourrierService.findTarifByPoidCourrier(p).subscribe((data)=>{
    //          this.tarif= data;
    //         console.log(this.tarif)
    //         return this.tarif
    //     })
    // }

    // Méthode pour récupérer le tarif
    onPoidsChange() {
        if (this.poids) { // Vérifie si le poids est saisi
            this.poidCourrierService.findTarifByPoidCourrier(this.poids).subscribe(
                (tarif) => {
                    this.tarif = tarif;
                    console.log(this.tarif)
                    return this.tarif

                },
                (error) => {
                    console.error('Erreur lors de la récupération du tarif', error);
                }
            );
        } else {
            this.tarif = undefined; // Réinitialiser le tarif si aucun poids n'est saisi
        }
    }



}
