import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientDto, ClientService } from 'src/app/proxy/client';
import { HttpErrorResponse } from '@angular/common/http';
import { ClientStorageService } from 'src/app/proxy/client';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-searchclientproduit',
    templateUrl: './searchclientproduit.component.html',
})
export class SearchclientProduitComponent implements OnInit {

    client: ClientDto;
    loading: boolean = false;
    keyword: string = '';
    searchForm: FormGroup;
    error: string = '';
    searchPerformed: boolean = false;

    constructor(
        private clientService: ClientService,
        private clientStorageService: ClientStorageService,
        private fb: FormBuilder,
        private router: Router,
        private messageService: MessageService
    ) { }

    ngOnInit(): void {
        this.searchForm = this.fb.group({
            keyword: ['', Validators.required],
        });
    }

    searchClient(keyword: string): void {
        if (keyword) {
            this.loading = true;

            this.clientService.searchClient(keyword).subscribe(
                (result) => {
                    this.client = result;
                    this.loading = false;

                    if (!result) {
                        this.router.navigateByUrl('/receveur/Creerclientproduit');
                    } else {
                        this.clientStorageService.setClientDetails(result);
                        this.router.navigate(['/receveur/Creerclientproduit'], { state: { clientData: result } });
                    }
                },
                (error: HttpErrorResponse) => {
                    this.loading = false;
                    console.error(error);

                    if (error.status === 500) {
                        // Erreur serveur interne, rediriger vers la création de client
                        this.router.navigateByUrl('/receveur/Creerclientproduit');
                    } else {
                        // Gestion des autres erreurs
                        this.handleError(error);
                    }
                }
            );
        } else {
            this.client = null;
            this.searchPerformed = false;
        }
    }

    private handleError(error: HttpErrorResponse): void {
        if (error.status >= 500 && error.status < 600) {
            this.messageService.add({ severity: 'error', summary: 'Erreur Serveur', detail: 'Erreur Serveur' });
        } else {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur est survenue.' });
        }
    }

}
