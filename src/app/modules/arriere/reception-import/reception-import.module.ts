import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import {MatSelectModule} from "@angular/material/select";
import {ReceptionImportRoutingModule} from "./receptionImport-routing.module";
import {ReceptionImportComponent} from "./reception-import.component";
import {SplitButton, SplitButtonModule} from "primeng/splitbutton";


@NgModule({
  declarations: [
    ReceptionImportComponent
  ],
  imports: [
    SharedComponentModule,
    ReceptionImportRoutingModule,
      MatSelectModule,

  ]
})
export class ReceptionImportModule { }
