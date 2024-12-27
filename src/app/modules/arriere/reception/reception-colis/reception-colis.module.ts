import { NgModule } from '@angular/core';

import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import {ReceptionColisComponent} from "./reception-colis.component";
import {ReceptionColisRoutingModule} from "./receptionColis-routing.module";


@NgModule({
  declarations: [
    ReceptionColisComponent
  ],
    imports: [
        SharedComponentModule,
        ReceptionColisRoutingModule,

    ]
})
export class ReceptionColisModule { }
