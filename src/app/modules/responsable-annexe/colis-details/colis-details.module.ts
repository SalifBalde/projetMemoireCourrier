import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColisDetailsRoutingModule } from './colis-details-routing.module';
import { ColisDetailsComponent } from './colis-details.component';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import { TimelineModule } from 'primeng/timeline';
import {CardModule} from "primeng/card";


@NgModule({
  declarations: [
    ColisDetailsComponent
  ],
    imports: [
        SharedComponentModule,
        TimelineModule,
        ColisDetailsRoutingModule,
        CardModule
    ]
})
export class ColisDetailsModule { }
