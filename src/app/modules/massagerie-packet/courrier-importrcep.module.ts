import { NgModule } from '@angular/core';

import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import {CourrierImportRcepComponent} from "./courrier-import-rcep.component";
import {CourrierImportRcepRoutingModule} from "./courrierImport-rcep-routing.module";



@NgModule({
  declarations: [
      CourrierImportRcepComponent
  ],
  imports: [
    SharedComponentModule,
      CourrierImportRcepRoutingModule
  ]
})
export class CourrierImportrcepModule { }
