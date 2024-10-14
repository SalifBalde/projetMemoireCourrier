import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DistanceRoutingModule } from './distance-routing.module';
import { DistanceComponent } from './distance.component';

import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';

@NgModule({
  declarations: [
    DistanceComponent
  ],
  imports: [

    DistanceRoutingModule,
    SharedComponentModule,

  ]
})
export class DistanceModule { }
