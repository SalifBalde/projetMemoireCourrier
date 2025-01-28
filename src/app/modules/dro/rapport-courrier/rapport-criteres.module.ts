import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RapportCriteresRoutingModule } from './rapport-criteres-routing.module';
import {SharedComponentModule} from "../../../layout/shared/shared-component.module";
import {RapportCriteresComponent} from "./rapport-criteres.component";
import {SharedModule} from "../../../layout/shared/shared.module";


@NgModule({
  declarations: [RapportCriteresComponent],
  imports: [
   SharedComponentModule,
    RapportCriteresRoutingModule
  ]
})
export class RapportCriteresModule { }
