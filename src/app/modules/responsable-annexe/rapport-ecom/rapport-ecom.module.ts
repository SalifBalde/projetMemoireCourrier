import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RapportEcomComponent } from './rapport-ecom.component';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import { RapportEcomRoutingModule } from './rapport-ecom-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedComponentModule,
    RapportEcomRoutingModule
  ],
  declarations: [RapportEcomComponent]
})
export class RapportEcomModule { }
