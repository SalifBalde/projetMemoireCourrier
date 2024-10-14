import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreerclientRoutingModule } from './creerclientproduit-routing.module';
import {  CreerClientProduitComponent } from './creerclientproduit.component';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ClientStorageService } from 'src/app/proxy/client';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    CreerClientProduitComponent
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
export class CreerclientProduitModule { }
