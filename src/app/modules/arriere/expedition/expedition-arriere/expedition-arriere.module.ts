import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import {ExpeditionArriereRoutingModule} from "./expedition-arriere-routing.module";
import {ExpeditionArriereComponent} from "./expedition-arriere.component";


@NgModule({
  declarations: [
      ExpeditionArriereComponent
  ],
  imports: [
    SharedComponentModule,
      ExpeditionArriereRoutingModule
  ]
})
export class ExpeditionArriereModule { }
