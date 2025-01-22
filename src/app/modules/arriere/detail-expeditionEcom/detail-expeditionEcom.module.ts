import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailExpeditionEcomComponent } from './detail-expeditionEcom.component';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import { DetailExpeditionEcomRoutingModule } from './detail-expeditionEcom-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedComponentModule,
    DetailExpeditionEcomRoutingModule
  ],
  declarations: [DetailExpeditionEcomComponent]
})
export class DetailExpeditionEcomModule { }
