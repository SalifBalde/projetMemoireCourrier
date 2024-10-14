import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchClientComponent } from './search-client.component';
import { MessageService } from 'primeng/api';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import { SearchClientRoutingModule } from './search-client-routing.module';


@NgModule({
  declarations: [
    SearchClientComponent
  ],
  imports: [
    CommonModule,
    SearchClientRoutingModule,
    SharedComponentModule,

  ],
  providers: [MessageService]
})
export class SearchClientModule { }
