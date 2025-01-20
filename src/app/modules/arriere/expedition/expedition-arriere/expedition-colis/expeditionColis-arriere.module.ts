import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
;
import {ExpeditionColisArriereRoutingModule} from "./expeditionColis-arriere-routing.module";
import {ExpeditionLettreComponent} from "./expedition-lettre.component";


@NgModule({
  declarations: [
      ExpeditionLettreComponent
  ],
  imports: [
    SharedComponentModule,
      ExpeditionColisArriereRoutingModule
  ]
})
export class ExpeditionColisArriereModule { }
