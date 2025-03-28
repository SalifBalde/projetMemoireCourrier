import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcommerceInstanceComponent } from './ecommerce-instance.component';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import { EcommerceInstanceRoutingModule } from './ecommerce-instance-routing.module';
import { TimelineModule } from 'primeng/timeline';

@NgModule({
  imports: [
    CommonModule,
    SharedComponentModule,
    EcommerceInstanceRoutingModule,
    TimelineModule

  ],
  declarations: [EcommerceInstanceComponent]
})
export class EcommerceInstanceModule { }
