import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import {MatSelectModule} from "@angular/material/select";

import {FermeturePacketInterRoutingModule} from "./fermeturePacketInter-routing.module";
import {FermeturePacketInterieurComponent} from "./fermeture-packet-interieur.component";



@NgModule({
  declarations: [
      FermeturePacketInterieurComponent
  ],
  imports: [
    SharedComponentModule,
      FermeturePacketInterRoutingModule,
      MatSelectModule
  ]
})
export class FermeturePacketInterieurModule { }
