import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CentreTriRoutingModule } from './centre-tri-routing.module';
import { CentreTriComponent } from './centre-tri.component';


@NgModule({
  declarations: [
    CentreTriComponent
  ],
  imports: [
    CommonModule,
    CentreTriRoutingModule
  ]
})
export class CentreTriModule { }
