import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import {MatSelectModule} from "@angular/material/select";
import {ReceptionPacketRoutingModule} from "./receptionPacket-routing.module";
import {ReceptionPacketBureauLivComponent} from "./reception-packet-bureau-liv.component";


@NgModule({
  declarations: [
      ReceptionPacketBureauLivComponent
  ],
  imports: [
    SharedComponentModule,
      ReceptionPacketRoutingModule,
      MatSelectModule,

  ]
})
export class ReceptionPacketModule { }
