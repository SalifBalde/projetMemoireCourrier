import { NgModule } from '@angular/core';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';


import {ReceptionColisArriereRoutingModule} from "./receptionColisArriere-routing.module";
import {ReceptionColisComponent} from "./reception-colis.component";


@NgModule({
  declarations: [
      ReceptionColisComponent
  ],
    imports: [
        SharedComponentModule,
        ReceptionColisArriereRoutingModule,

    ]
})
export class ReceptionColisArriereModule { }
