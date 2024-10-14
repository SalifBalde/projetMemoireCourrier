import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistanceBureauRoutingModule } from './distance-bureau-routing.module';
import { DistanceBureauComponent } from './distance-bureau.component';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';


@NgModule({
  declarations: [
    DistanceBureauComponent
  ],
  imports: [
    SharedComponentModule,
    DistanceBureauRoutingModule
  ]
})
export class DistanceBureauModule { }
