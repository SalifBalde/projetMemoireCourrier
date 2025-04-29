import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {DetailsPacketRoutingModule} from "./details-packet-routing.module";
import {DetailPacketComponent} from "./detail-packet.component";


@NgModule({
  declarations: [

  ],
    imports: [
        CommonModule,
        DetailsPacketRoutingModule,
        DetailPacketComponent
    ]
})
export class DetailsPacketModule { }
