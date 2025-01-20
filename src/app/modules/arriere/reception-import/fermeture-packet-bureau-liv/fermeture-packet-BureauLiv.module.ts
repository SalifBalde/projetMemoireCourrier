import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import {MatSelectModule} from "@angular/material/select";
import {FermeturePacketBureauLivRoutingModule} from "./fermeturePacketBureauLiv-routing.module";
import {FermeturePacketBureauLivComponent} from "./fermeture-packet-bureau-liv.component";





@NgModule({
  declarations: [
      FermeturePacketBureauLivComponent
  ],
  imports: [
    SharedComponentModule,
      FermeturePacketBureauLivRoutingModule,
      MatSelectModule
  ]
})
export class FermeturePacketBureauLivModule { }
