import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DclRoutingModule} from './dcl-routing.module';
import {DclComponent} from './dcl.component';


@NgModule({
  declarations: [
    DclComponent
  ],
  imports: [
    CommonModule,
    DclRoutingModule
  ]
})
export class DclModule { }
