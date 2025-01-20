import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService, SharedModule } from 'primeng/api';
import { DroRoutingModule } from './dro-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DroRoutingModule,
    SharedModule
    
  ],
  declarations: [],
  providers: [MessageService]
})
export class DroModule { }
