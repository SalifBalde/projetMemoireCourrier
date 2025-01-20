import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import {MatSelectModule} from "@angular/material/select";
import {FermetureColisBureauLivComponent} from "./fermeture-colis-bureau-liv.component";
import {FermetureColisBureauLivRoutingModule} from "./fermetureColisBureauLiv-routing.module";





@NgModule({
  declarations: [
      FermetureColisBureauLivComponent
  ],
  imports: [
    SharedComponentModule,
      FermetureColisBureauLivRoutingModule,
      MatSelectModule
  ]
})
export class FermetureColisBureauLivModule { }
