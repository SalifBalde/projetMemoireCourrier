import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {SharedComponentModule} from "../../../layout/shared/shared-component.module";
import {SortieDouaneComponent} from "./sortie-douane.component";
import {SortieDouanePacketRoutingModule} from "./sortieDouane-routing.module";



@NgModule({
  declarations: [

      SortieDouaneComponent],
    imports: [
        SharedComponentModule,
        CommonModule,
        SortieDouanePacketRoutingModule,

    ]
})
export class SortieDouanePacketModule { }
