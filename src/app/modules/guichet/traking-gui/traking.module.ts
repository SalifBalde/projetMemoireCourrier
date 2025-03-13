import { NgModule } from '@angular/core';

import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import {TrakingGuiRoutingModule} from "./traking-routing.module";
import {TrakingComponent} from "./traking.component";
import {CardModule} from "primeng/card";


@NgModule({
  declarations: [
   TrakingComponent
  ],
    imports: [
        SharedComponentModule,
        TrakingGuiRoutingModule,
        CardModule,

    ]
})
export class TrakingGuiModule { }
