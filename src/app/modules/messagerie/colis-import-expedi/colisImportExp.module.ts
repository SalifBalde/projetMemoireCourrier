import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {computeLineStartsMap} from "@angular/cdk/schematics/update-tool/utils/line-mappings";
import {ColistImportExpRoutingModule} from "./colisImportiExp-routing.module";
import {ColisImportExpediComponent} from "./colis-import-expedi.component";
import {ColistImportRoutingModule} from "../colis-import/colisImporti-routing.module";
import {SharedComponentModule} from "../../../layout/shared/shared-component.module";



@NgModule({
  declarations: [

      ColisImportExpediComponent
  ],
    imports: [
        SharedComponentModule,
        CommonModule,
        ColistImportExpRoutingModule    ]
})
export class ColisImportExpModule { }
