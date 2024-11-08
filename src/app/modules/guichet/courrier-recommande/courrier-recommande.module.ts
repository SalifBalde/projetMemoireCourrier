import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourrierRecommandeRoutingModule } from './courrier-recommande-routing.module';
import { CourrierRecommandeComponent } from './courrier-recommande.component';


@NgModule({
  declarations: [
    CourrierRecommandeComponent
  ],
  imports: [
    CommonModule,
    CourrierRecommandeRoutingModule
  ]
})
export class CourrierRecommandeModule { }
