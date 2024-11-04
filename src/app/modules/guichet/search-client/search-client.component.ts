import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ClientDto, ClientService, ClientStorageService } from 'src/app/proxy/client';

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
    id: string = "";

    constructor(
        private clientService: ClientService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService
    ) { }

    ngOnInit(): void {

        this.searchForm = this.fb.group({
            keyword: ['', Validators.required],
        });
        this.buildForm();
        this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
        });
    }

    buildForm() {
        this.form = this.fb.group({
            nom: [this.client.nom || '', Validators.required],
            prenom: [this.client.prenom || '', Validators.required],
            adresse: [this.client.adresse || '', Validators.required],
            cni: [this.client.cni || '', Validators.required],
            telephone: [this.client.telephone || '', Validators.required],
            email: [this.client.email],

        });
    }

    searchClient(): void {
        const keyword = this.searchForm.get('keyword').value;

        if (keyword) {
            this.loading=true;
            this.searchPerformed= true;
            this.client= {};
            this.clientService.getClientByTelephoneOrCni(keyword).subscribe(
                (client) => {
                    this.client = { ...client };
                    this.loading=false;
                    console.log(this.client)
                    this.buildForm();
                    this.clientDialog = true;
                    this.label = "Client Details: " + this.client.telephone

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
        this.keyword = "";
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
            this.clientService.save(this.form.value).subscribe(
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

}
