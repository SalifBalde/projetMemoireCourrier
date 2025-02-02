import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourrierDetailsRoutingModule } from './courrier-details-routing.module';
import { CourrierDetailsComponent } from './courrier-details.component';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';


@NgModule({
  declarations: [
    CourrierDetailsComponent
  ],
  imports: [
    SharedComponentModule,
    CourrierDetailsRoutingModule,
    ConfirmDialogModule
  ],
  providers:[ ConfirmationService ,  MessageService]
})
export class CourrierDetailsModule { }
