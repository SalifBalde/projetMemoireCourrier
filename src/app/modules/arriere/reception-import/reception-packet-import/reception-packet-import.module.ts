import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import {MatSelectModule} from "@angular/material/select";

import {ReceptionPacketImportComponent} from "./reception-packet-import.component";
import {ReceptionPacketImportRoutingModule} from "./receptionPacketImport-routing.module";


@NgModule({
  declarations: [
      ReceptionPacketImportComponent
  ],
  imports: [
    SharedComponentModule,
      ReceptionPacketImportRoutingModule,
      MatSelectModule,

  ]
})
export class ReceptionPacketImportModule { }
