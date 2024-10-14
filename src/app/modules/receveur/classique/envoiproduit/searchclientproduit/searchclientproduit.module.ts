import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchclientproduitRoutingModule } from './searchclientproduit-routing.module';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ClientStorageService } from 'src/app/proxy/client/client.service';
import { SearchclientProduitComponent } from './searchclientproduit.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    SearchclientProduitComponent
  ],
  imports: [
    CommonModule,
    SearchclientproduitRoutingModule,
    ChipsModule,
    CalendarModule,
    InputGroupAddonModule,
    InputGroupModule,
    FormsModule,
    TableModule,
    ReactiveFormsModule,
    ToastModule
  ],
  providers: [ClientStorageService, MessageService]
})
export class SearchclientproduitModule { }
