import { NgModule } from '@angular/core';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import {ReceptionPacketRoutingModule} from "./receptionPacket-routing.module";
import {ReceptionPacketComponent} from "./reception-packet.component";


@NgModule({
  declarations: [
      ReceptionPacketComponent
  ],
    imports: [
        SharedComponentModule,
        ReceptionPacketRoutingModule,

    ]
})
export class ReceptionPacketModule { }
