import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourrierValeurDeclareRoutingModule } from './courrier-valeur-declare-routing.module';
import { CourrierValeurDeclareComponent } from './courrier-valeur-declare.component';


@NgModule({
  declarations: [
    CourrierValeurDeclareComponent
  ],
  imports: [
    CommonModule,
    CourrierValeurDeclareRoutingModule
  ]
})
export class CourrierValeurDeclareModule { }
