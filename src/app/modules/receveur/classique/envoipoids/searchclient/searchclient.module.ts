import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchclientRoutingModule} from './searchclient-routing.module';
import { SearchClientComponent } from './searchclient.component';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ClientStorageService } from 'src/app/proxy/client/client.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    SearchClientComponent
  ],
  imports: [
    CommonModule,
    SearchclientRoutingModule,
    ChipsModule,
    CalendarModule,
    InputGroupAddonModule,
    InputGroupModule,
    FormsModule,
    TableModule,
    ReactiveFormsModule,
    ToastModule

  ],
  providers: [ClientStorageService,MessageService]
})
export class SearchclientModule { }
