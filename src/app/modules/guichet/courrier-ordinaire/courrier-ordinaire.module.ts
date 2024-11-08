import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourrierOrdinaireRoutingModule } from './courrier-ordinaire-routing.module';
import { CourrierOrdinaireComponent } from './courrier-ordinaire.component';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';


@NgModule({
  declarations: [
    CourrierOrdinaireComponent
  ],
  imports: [
    SharedComponentModule,
    CourrierOrdinaireRoutingModule
  ]
})
export class CourrierOrdinaireModule { }
