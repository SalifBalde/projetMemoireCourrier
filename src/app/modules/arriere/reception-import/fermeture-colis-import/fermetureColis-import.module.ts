import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import {MatSelectModule} from "@angular/material/select";
import {FermetureColisImportComponent} from "./fermeture-colis-import.component";
import {FermetureColisImportRoutingModule} from "./fermetureColisImport-routing.module";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";



@NgModule({
  declarations: [
      FermetureColisImportComponent
  ],
    imports: [
        SharedComponentModule,
        FermetureColisImportRoutingModule,
        MatSelectModule,
        IconFieldModule,
        InputIconModule
    ]
})
export class FermetureColisImportModule { }
