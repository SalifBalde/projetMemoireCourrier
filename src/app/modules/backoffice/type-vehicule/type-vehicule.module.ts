import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypeVehiculeRoutingModule } from './type-vehicule-routing.module';
import { TypeVehiculeComponent } from './type-vehicule.component';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';


@NgModule({
  declarations: [
    TypeVehiculeComponent
  ],
  imports: [
    SharedComponentModule,
    TypeVehiculeRoutingModule
  ]
})
export class TypeVehiculeModule { }
