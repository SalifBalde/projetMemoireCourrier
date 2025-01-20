import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import {MatSelectModule} from "@angular/material/select";

import {FermetureLettreInterieurRoutingModule} from "./fermetureLettreInter-routing.module";
import {FermetureLettreInterieurComponent} from "./fermeture-lettre-interieur.component";



@NgModule({
  declarations: [
      FermetureLettreInterieurComponent
  ],
  imports: [
    SharedComponentModule,
      FermetureLettreInterieurRoutingModule,
      MatSelectModule
  ]
})
export class FermeturelettreInterieurModule { }
