import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import {ExpeditionPacketRoutingModule} from "./expeditionPacket-routing.module";
import {ExpeditionPacketComponent} from "./expedition-packet.component";


@NgModule({
  declarations: [
      ExpeditionPacketComponent

  ],
  imports: [
    SharedComponentModule,
      ExpeditionPacketRoutingModule
  ]
})
export class ExpeditionPacketModule { }
