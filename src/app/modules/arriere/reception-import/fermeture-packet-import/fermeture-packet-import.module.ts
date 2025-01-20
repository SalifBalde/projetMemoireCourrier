import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import {MatSelectModule} from "@angular/material/select";
import {FermeturePacketImportComponent} from "./fermeture-packet-import.component";
import {FermeturePacketImportRoutingModule} from "./fermeturePacketImport-routing.module";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";




@NgModule({
  declarations: [
      FermeturePacketImportComponent
  ],
    imports: [
        SharedComponentModule,
        FermeturePacketImportRoutingModule,
        MatSelectModule,
        IconFieldModule,
        InputIconModule
    ]
})
export class FermeturePacketImportModule { }
