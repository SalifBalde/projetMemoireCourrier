import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcommerceDetailsComponent } from './ecommerce-details.component';
import { SharedComponentModule } from "../../../layout/shared/shared-component.module";
import { EcommerceDetailsRoutingModule } from './ecommerce-details-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedComponentModule,
    EcommerceDetailsRoutingModule
],
  declarations: [EcommerceDetailsComponent]
})
export class EcommerceDetailsModule { }
