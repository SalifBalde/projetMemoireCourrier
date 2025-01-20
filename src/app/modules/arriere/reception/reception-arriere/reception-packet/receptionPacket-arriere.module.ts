import { NgModule } from '@angular/core';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';


import {ReceptioPnacketRoutingModule} from "./receptionPacket-routing.module";
import {ReceptionPacketComponent} from "./reception-packet.component";


@NgModule({
  declarations: [
      ReceptionPacketComponent
  ],
    imports: [
        SharedComponentModule,
        ReceptioPnacketRoutingModule,

    ]
})
export class ReceptionPacketArriereModule { }
