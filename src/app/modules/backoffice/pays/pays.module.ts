import { NgModule } from '@angular/core';

import { PaysRoutingModule } from './pays-routing.module';

import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import {PaysComponent} from "./pays.component";

@NgModule({
  declarations: [
    PaysComponent
  ],
    imports: [
       SharedComponentModule,
       PaysRoutingModule
    ]
})
export class PaysModule { }
