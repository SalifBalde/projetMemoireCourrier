import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import {ExpeditionCourrierImportComponent} from "./expedition-courrier-import.component";
import {ExpeditionCourrierImportRoutingModule} from "./expeditionCourrierImport-routing.module";


@NgModule({
  declarations: [
    ExpeditionCourrierImportComponent
  ],
  imports: [
    SharedComponentModule,
    ExpeditionCourrierImportRoutingModule
  ]
})
export class ExpeditionCourrierImportModule { }
