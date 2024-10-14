import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from "primeng/autocomplete";
import { CreerColisPoidsRoutingModule } from './creer-colis-poids-routing.module';
import { CreerColisPoidsComponent } from './creer-colis-poids.component';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    CreerColisPoidsComponent
  ],
  imports: [
    SharedComponentModule,
    CreerColisPoidsRoutingModule,
    AutoCompleteModule,
    ButtonModule,
  ]

})
export class CreerColisPoidsModule { }
