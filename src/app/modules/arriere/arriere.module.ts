import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArriereRoutingModule } from './arriere-routing.module';
import { ArriereComponent } from './arriere.component';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import {RapportModule} from "../drp/rapport/rapport.module";


@NgModule({
  declarations: [
    ArriereComponent
  ],
  imports: [
    SharedComponentModule,
    ArriereRoutingModule,
  ]
})
export class ArriereModule { }
