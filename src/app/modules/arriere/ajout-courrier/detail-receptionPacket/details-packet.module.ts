import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { DetailsRcepPacketRoutingModule} from "./details-packet-routing.module";
import {DetailPacketComponent} from "./detail-packet.component";


@NgModule({
  declarations: [

  ],
    imports: [
        CommonModule,
        DetailsRcepPacketRoutingModule,
        DetailPacketComponent
    ]
})
export class DetailsRecPacketModule { }
