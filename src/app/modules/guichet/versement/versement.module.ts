import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import { VersementComponent } from './versement.component';
import { VersementRoutingModule } from './versement-routing.module';



@NgModule({
  declarations: [
    VersementComponent
  ],
  imports: [
    SharedComponentModule,
    VersementRoutingModule
  ],
  providers: [MessageService],
})
export class VersementModule { }
