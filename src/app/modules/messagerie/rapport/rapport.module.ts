import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RapportRoutingModule } from './rapport-routing.module';
import { RapportComponent } from './rapport.component';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import {ProgressSpinnerModule} from "primeng/progressspinner";


@NgModule({
  declarations: [
    RapportComponent
  ],
    imports: [
        SharedComponentModule,
        RapportRoutingModule,
        ProgressSpinnerModule
    ]
})
export class RapportModule { }
