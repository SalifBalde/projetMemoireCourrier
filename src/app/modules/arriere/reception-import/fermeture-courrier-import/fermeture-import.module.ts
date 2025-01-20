import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import {MatSelectModule} from "@angular/material/select";
import {FermetureCourrierImportComponent} from "./fermeture-courrier-import.component";
import {FermetureImportRoutingModule} from "./fermetureImport-routing.module";



@NgModule({
  declarations: [
    FermetureCourrierImportComponent
  ],
  imports: [
    SharedComponentModule,
    FermetureImportRoutingModule,
      MatSelectModule
  ]
})
export class FermetureImportModule { }
