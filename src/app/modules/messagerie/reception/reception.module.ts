import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceptionRoutingModule } from './reception-routing.module';
import { ReceptionComponent } from './reception.component';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';


@NgModule({
  declarations: [
    ReceptionComponent
  ],
  imports: [
    SharedComponentModule,
    ReceptionRoutingModule
  ]
})
export class ReceptionModule { }
