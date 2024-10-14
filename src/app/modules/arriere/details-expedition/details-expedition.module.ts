import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsExpeditionRoutingModule } from './details-expedition-routing.module';
import { DetailsExpeditionComponent } from './details-expedition.component';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';


@NgModule({
  declarations: [
    DetailsExpeditionComponent
  ],
  imports: [
    SharedComponentModule,
    DetailsExpeditionRoutingModule
  ]
})
export class DetailsExpeditionModule { }
