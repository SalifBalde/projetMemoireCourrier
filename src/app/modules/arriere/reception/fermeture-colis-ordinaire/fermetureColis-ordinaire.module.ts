import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import {MatSelectModule} from "@angular/material/select";
import {FermetureColisOrdinaireRoutingModule} from "./fermetureColisOrdinaire-routing.module";
import {FermetureColisOrdinaireComponent} from "./fermeture-colis-ordinaire.component";



@NgModule({
  declarations: [
      FermetureColisOrdinaireComponent
  ],
  imports: [
    SharedComponentModule,
      FermetureColisOrdinaireRoutingModule,
      MatSelectModule
  ]
})
export class FermetureColisOrdinaireModule { }
