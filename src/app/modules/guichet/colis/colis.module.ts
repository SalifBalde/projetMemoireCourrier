import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColisRoutingModule } from './colis-routing.module';
import { ColisComponent } from './colis.component';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';


@NgModule({
  declarations: [
    ColisComponent
  ],
  imports: [
    SharedComponentModule,
    ColisRoutingModule
  ]
})
export class ColisModule { }
