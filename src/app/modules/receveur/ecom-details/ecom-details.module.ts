import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcomDetailsComponent } from './ecom-details.component';
import { EcomDetailsRoutingModule } from './ecom-details-routing.module';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';

@NgModule({
  imports: [
    CommonModule,
    EcomDetailsRoutingModule,
    SharedComponentModule
  ],
  declarations: [EcomDetailsComponent]
})
export class EcomDetailsModule { }
