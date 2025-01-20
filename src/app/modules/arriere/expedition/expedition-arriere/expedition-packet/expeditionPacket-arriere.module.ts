import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';

import {ExpeditionPacketComponent} from "./expedition-packet.component";
import {ExpeditionPacketArriereRoutingModule} from "./expeditionPacket-arriere-routing.module";


@NgModule({
  declarations: [
      ExpeditionPacketComponent
  ],
  imports: [
    SharedComponentModule,
      ExpeditionPacketArriereRoutingModule
  ]
})
export class ExpeditionPacketArriereModule { }
