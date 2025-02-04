import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import {MatSelectModule} from "@angular/material/select";

import { FermeturePacketRoutingModule} from "./fermeturePacketInter-routing.module";
import {FermeturePacketInterieurComponent} from "./fermeture-packet-interieur.component";



@NgModule({
  declarations: [
      FermeturePacketInterieurComponent
  ],
  imports: [
    SharedComponentModule,
      FermeturePacketRoutingModule,
      MatSelectModule
  ]
})
export class FermeturePacketModule { }
