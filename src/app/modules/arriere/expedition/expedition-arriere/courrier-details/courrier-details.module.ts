import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {CourrierDetailsArriererRoutingModule, } from './courrier-details-routing.module';
import { CourrierDetailsComponent } from './courrier-details.component';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';


@NgModule({
  declarations: [
    CourrierDetailsComponent
  ],
  imports: [
    SharedComponentModule,
      CourrierDetailsArriererRoutingModule
  ]
})
export class CourrierDetailsArriereModule { }
