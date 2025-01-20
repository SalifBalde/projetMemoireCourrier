import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';

import {LinePacketDeclarerComponent} from "./line-packet-declarer.component";
import {LinePacketDeclarerRoutingModule} from "./line-packetDeclarer-routing.module";


@NgModule({
  declarations: [
      LinePacketDeclarerComponent
  ],
  imports: [
    SharedComponentModule,
    LinePacketDeclarerRoutingModule
  ]
})
export class LinePacketDeclarerModule { }
