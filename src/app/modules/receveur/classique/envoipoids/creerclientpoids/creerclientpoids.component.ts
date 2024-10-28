import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientDto, ClientService } from 'src/app/proxy/client';
import { MessageService } from 'primeng/api';
import { ClientStorageService } from 'src/app/proxy/client';

@Component({
  selector: 'app-creerclient',
  templateUrl: './creerclientpoids.component.html',
})
export class CreerClientComponent implements OnInit {
  form: FormGroup;
  isClientSaved: boolean = false;
  errorMessage: any;
  clientData: ClientDto;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private clientService: ClientService,
    private clientStorageService: ClientStorageService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
  this.initializeForm();
  this.clientData = history.state.clientData;
  this.checkClientData();
  if (this.clientData) {
    this.fillFormWithClientData(this.clientData);
  }
}


  initializeForm(): void {
    this.form = this.fb.group({
      cni: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', Validators.required],
      ninea: ['', Validators.required],
      nomStructure: ['', Validators.required],
      profession: ['', Validators.required],
    });
  }

  fillFormWithClientData(clientData: ClientDto): void {

    this.form.patchValue({
      cni: clientData.cni,
      nom: clientData.nom,
      prenom: clientData.prenom,
      adresse: clientData.adresse,
      telephone: clientData.telephone,
      email: clientData.email,
    });
  }

 saveClient(): void {
  if (this.form.valid) {
    const clientData: ClientDto = this.form.value;

    this.clientService.save(clientData).subscribe(
      (result) => {
        console.log('Client enregistré avec succès:', result);
        this.isClientSaved = true;
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Le client a été enregistré avec succès!' });
      },

    );
  }
}

getTitle(): string {
    return this.isClientSaved ? 'Informations Expéditeur' : 'Enregistrer un nouveau client';
  }

creerEnvoi(): void {
  console.log('Créer un envoi pour le client:', this.clientData);
  this.router.navigate(['/receveur/Creerenvoipoids'], { state: { clientData: this.clientData }});
}



checkClientData(): void {
    this.isClientSaved = this.clientData !== undefined && this.clientData !== null;
  }
}
