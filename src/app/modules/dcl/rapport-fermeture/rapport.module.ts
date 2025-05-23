import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import {RapportArriereRoutingModule} from './rapport-routing.module';
import { RapportComponent } from './rapport.component';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {ProgressBarModule} from "primeng/progressbar";


@NgModule({
  declarations: [
    RapportComponent
  ],
    imports: [
        SharedComponentModule,
        RapportArriereRoutingModule,
        ProgressBarModule,
        ProgressSpinnerModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA] // Ajoutez ceci
})
export class RapportArriereModule { }
