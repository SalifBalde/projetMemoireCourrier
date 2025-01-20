import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import {MatSelectModule} from "@angular/material/select";

import {ReceptionColisBureauComponent} from "./reception-colis-bureau.component";
import {ReceptionColisBureauRoutingModule} from "./receptionColisBureau-routing.module";



@NgModule({
  declarations: [
      ReceptionColisBureauComponent
  ],
  imports: [
    SharedComponentModule,
      ReceptionColisBureauRoutingModule
    ,
      MatSelectModule,

  ]
})
export class ReceptionColisBureauModule { }
