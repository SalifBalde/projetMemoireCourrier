import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackofficeRoutingModule } from './backoffice-routing.module';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';


@NgModule({
  declarations: [],
  imports: [
    BackofficeRoutingModule,
    SharedComponentModule

  ]
})
export class BackofficeModule { }
