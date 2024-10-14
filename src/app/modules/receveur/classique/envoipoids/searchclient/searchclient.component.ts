import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientDto, ClientService } from 'src/app/proxy/client';
import { HttpErrorResponse } from '@angular/common/http';
import { ClientStorageService } from 'src/app/proxy/client';
import { MessageService } from 'primeng/api'; // Importez le service de message PrimeNG

@Component({
  selector: 'app-searchclient',
  templateUrl: './searchclient.component.html',
})
export class SearchClientComponent implements OnInit {
  client: ClientDto;
  loading: boolean = false;
  keyword: string = '';
  searchForm: FormGroup;
  searchPerformed: boolean = false;

  constructor(
    private clientService: ClientService,
    private clientStorageService: ClientStorageService,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {

    this.searchForm = this.fb.group({
      keyword: ['', Validators.required],
    });
  }

   searchClient(): void {
    const keyword = this.searchForm.get('keyword').value;

    if (keyword) {
      this.loading = true;
      this.searchPerformed = true;
      this.client = null;

      this.clientService.searchClient(keyword).subscribe(
        (result) => {
          this.client = result;
          this.loading = false;

          if (!result) {
            this.router.navigateByUrl('/receveur/Creerclientpoids');
          } else {
            this.clientStorageService.setClientDetails(result);
            this.router.navigate(['/receveur/Creerclientpoids'], { state: { clientData: result } });
          }
        },
        (error: HttpErrorResponse) => {
          this.loading = false;
          console.error(error);

          if (error.status >= 500 && error.status < 600) {
            this.messageService.add({ severity: 'error', summary: 'Erreur Serveur', detail: 'Erreur Serveur' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur Serveur' });
          }
        }
      );
    } else {
      this.client = null;
      this.searchPerformed = false;
    }
  }
}
