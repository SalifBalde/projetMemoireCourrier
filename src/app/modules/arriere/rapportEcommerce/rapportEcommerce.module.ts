import { RapportEcommerceRoutingModule } from './rapportEcommerce-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RapportEcommerceComponent } from './rapportEcommerce.component';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';

@NgModule({
  imports: [
    CommonModule,
    SharedComponentModule,
    RapportEcommerceRoutingModule
  ],
  declarations: [RapportEcommerceComponent]
})
export class RapportEcommerceModule { }
