import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import {ReceptionLinePacketComponent} from "./reception-line-packet.component";
import {
    ReceptionCourrierArrierRoutingModule
} from "./receptionLinePacket-routing.module";


@NgModule({
  declarations: [
    ReceptionLinePacketComponent
  ],
  imports: [
    SharedComponentModule,
      ReceptionCourrierArrierRoutingModule
  ]
})
export class ReceptionCourrierArriereModule { }
