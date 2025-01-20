import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpeditionRoutingModule } from './expedition-routing.module';
import { ExpeditionComponent } from './expedition.component';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';


@NgModule({
  declarations: [
    ExpeditionComponent
  ],
  imports: [
    SharedComponentModule,
    ExpeditionRoutingModule
  ]
})
export class ExpeditionModule { }
