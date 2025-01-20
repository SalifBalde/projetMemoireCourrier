import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import {ExpeditionColisImportComponent} from "./expedition-colis-import.component";
import {ExpeditionColisImportRoutingModule} from "./expeditionColisImport-routing.module";


@NgModule({
  declarations: [
    ExpeditionColisImportComponent
  ],
  imports: [
    SharedComponentModule,
    ExpeditionColisImportRoutingModule
  ]
})
export class ExpeditionColisImportModule { }
