import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ColistImportRoutingModule} from "./colisImporti-routing.module";
import {ColisImportComponent} from "./colis-import.component";
import {SharedComponentModule} from "../../../layout/shared/shared-component.module";



@NgModule({
  declarations: [

      ColisImportComponent],
    imports: [
        SharedComponentModule,
        CommonModule,
        ColistImportRoutingModule,

    ]
})
export class ColisImportModule { }
