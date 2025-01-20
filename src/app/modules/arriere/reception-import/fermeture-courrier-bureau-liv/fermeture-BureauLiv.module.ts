import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import {MatSelectModule} from "@angular/material/select";
import {FermetureCourrierBureauLivComponent} from "./fermeture-courrier-bureau-liv.component";
import {FermetureCourrierBureauLivRoutingModule} from "./fermetureCourrierBureauLiv-routing.module";




@NgModule({
  declarations: [
      FermetureCourrierBureauLivComponent
  ],
  imports: [
    SharedComponentModule,
      FermetureCourrierBureauLivRoutingModule,
      MatSelectModule
  ]
})
export class FermetureCourrierBureauLivModule { }
