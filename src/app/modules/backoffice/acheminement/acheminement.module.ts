import { NgModule } from '@angular/core';


import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import {AcheminementRoutingModule} from "./acheminement-routing.module";
import {AcheminementComponent} from "./acheminement.component";
import {CardModule} from "primeng/card";

@NgModule({
  declarations: [
    AcheminementComponent
  ],
    imports: [
        SharedComponentModule,
        AcheminementRoutingModule,
        CardModule,

    ]
})
export class AcheminementModule { }
