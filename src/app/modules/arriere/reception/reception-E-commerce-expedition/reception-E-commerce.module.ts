import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceptionECommerceComponent } from './reception-E-commerce.component';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import { ReceptionECommerceRoutingModule } from './reception-E-commerce-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedComponentModule,
    ReceptionECommerceRoutingModule
  ],
  declarations: [ReceptionECommerceComponent]
})
export class ReceptionECommerceModule { }
