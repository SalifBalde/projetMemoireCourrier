import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SuiviCourrierdto, SuiviCourrierService } from 'src/app/proxy/suiviCourrier';

@Component({
  selector: 'app-suiviCourrier',
  templateUrl: './suiviCourrier.component.html',
  providers: [MessageService]
})
export class SuiviCourrierComponent implements OnInit {
  codeBarre: string = '';
  suivis: SuiviCourrierdto[] = [];
  loading: boolean = false;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private suiviCourrierService: SuiviCourrierService  
  ) { }

  ngOnInit() {
  }

  rechercherParCodeBarre() {
    this.loading = true; 
    if (this.codeBarre.trim() !== '') {
      console.log(`Recherche avec code barre: ${this.codeBarre}`);
      this.suiviCourrierService.getByCodeBarre(this.codeBarre).subscribe(
        (data: SuiviCourrierdto[]) => {
          this.suivis = data;
          if (this.suivis.length === 0) {
            this.messageService.add({severity:'info', summary: 'Information', detail: 'Aucun suivi trouvé avec ce code barre.'});
          }
        },
        (error) => {
          console.error(error);
          this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur lors de la récupération des données.'});
        }
      ).add(() => {
        this.loading = false; 
      });
    } else {
      this.messageService.add({severity:'warn', summary: 'Attention', detail: 'Veuillez saisir un code barre valide.'});
      this.loading = false; 
    }
  }
  
}
