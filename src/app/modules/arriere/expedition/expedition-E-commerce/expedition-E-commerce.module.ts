import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpeditionECommerceComponent } from './expedition-E-commerce.component';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import { ExpeditionECommerceRoutingModule } from './expedition-E-commerce-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedComponentModule,
    ExpeditionECommerceRoutingModule
  ],
  declarations: [ExpeditionECommerceComponent]
})
export class ExpeditionECommerceModule { }
