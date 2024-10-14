import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsExpeditionRoutingModule } from './details-expedition-routing.module';
import { DetailsExpeditionComponent } from './details-expedition.component';


@NgModule({
  declarations: [
    DetailsExpeditionComponent
  ],
  imports: [
    CommonModule,
    DetailsExpeditionRoutingModule
  ]
})
export class DetailsExpeditionModule { }
