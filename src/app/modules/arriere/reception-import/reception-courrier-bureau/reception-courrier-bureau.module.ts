import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import {MatSelectModule} from "@angular/material/select";
import {ReceptionCourrierBureauComponent} from "./reception-courrier-bureau.component";
import {ReceptionCourrierBureauRoutingModule} from "./receptionCourrierBureau-routing.module";



@NgModule({
  declarations: [
    ReceptionCourrierBureauComponent
  ],
  imports: [
    SharedComponentModule,
    ReceptionCourrierBureauRoutingModule,
      MatSelectModule,

  ]
})
export class ReceptionCourrierBureauModule { }
