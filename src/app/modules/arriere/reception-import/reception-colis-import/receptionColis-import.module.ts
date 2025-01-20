import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import {MatSelectModule} from "@angular/material/select";
import {ReceptionColisImportComponent} from "./reception-colis-import.component";
import {ReceptionColisImportRoutingModule} from "./receptionColisImport-routing.module";



@NgModule({
  declarations: [
      ReceptionColisImportComponent
  ],
  imports: [
    SharedComponentModule,
    ReceptionColisImportRoutingModule,
      MatSelectModule
  ]
})
export class ReceptionColisImportModule { }
