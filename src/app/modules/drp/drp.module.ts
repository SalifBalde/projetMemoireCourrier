import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrpRoutingModule } from './drp-routing.module';
import { DrpComponent } from './drp.component';


@NgModule({
  declarations: [
    DrpComponent
  ],
  imports: [
    CommonModule,
    DrpRoutingModule
  ]
})
export class DrpModule { }
