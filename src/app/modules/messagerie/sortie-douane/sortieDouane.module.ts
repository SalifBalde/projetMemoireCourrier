import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {SharedComponentModule} from "../../../layout/shared/shared-component.module";
import {SortieDouaneComponent} from "./sortie-douane.component";
import {SortieDouaneRoutingModule} from "./sortieDouane-routing.module";



@NgModule({
  declarations: [

      SortieDouaneComponent],
    imports: [
        SharedComponentModule,
        CommonModule,
        SortieDouaneRoutingModule,

    ]
})
export class SortieDouaneModule { }
