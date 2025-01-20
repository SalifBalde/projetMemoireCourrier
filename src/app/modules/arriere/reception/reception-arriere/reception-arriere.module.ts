import { NgModule } from '@angular/core';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';

import {ReceptionArriereRoutingModule} from "./receptionArriere-routing.module";
import {ReceptionArriereComponent} from "./reception-arriere.component";


@NgModule({
  declarations: [
      ReceptionArriereComponent
  ],
    imports: [
        SharedComponentModule,
        ReceptionArriereRoutingModule,

    ]
})
export class ReceptionArriereModule { }
