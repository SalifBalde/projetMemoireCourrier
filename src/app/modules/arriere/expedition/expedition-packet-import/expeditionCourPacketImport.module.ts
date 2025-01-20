import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';

import {ExpeditionPacketImportComponent} from "./expedition-packet-import.component";
import {ExpeditionCourrierPacketImportRoutingModule} from "./expeditionCourPacketImport-routing.module";


@NgModule({
  declarations: [
      ExpeditionPacketImportComponent
  ],
  imports: [
    SharedComponentModule,
      ExpeditionCourrierPacketImportRoutingModule
  ]
})
export class ExpeditionCourrierPacketImportModule { }
