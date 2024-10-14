import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreerclientRoutingModule } from './creerclientpoids-routing.module';
import { CreerClientComponent } from './creerclientpoids.component';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ClientStorageService } from 'src/app/proxy/client';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    CreerClientComponent
  ],
  imports: [
    CommonModule,
    CreerclientRoutingModule,
    ChipsModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule
  ],
providers: [ClientStorageService, MessageService],

})
export class CreerclientModule { }
