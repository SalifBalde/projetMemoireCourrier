import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceCourrierRoutingModule } from './service-courrier-routing.module';
import { ServiceCourrierComponent } from './service-courrier.component';


@NgModule({
  declarations: [
    ServiceCourrierComponent
  ],
  imports: [
    CommonModule,
    ServiceCourrierRoutingModule
  ]
})
export class ServiceCourrierModule { }
