import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackEcommerceComponent } from './Track-Ecommerce.component';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import { TrackEcommerceRoutingModule } from './Track-Ecommerce.-routing.module';
import { TimelineModule } from 'primeng/timeline';

@NgModule({
  imports: [
    CommonModule,
    SharedComponentModule,
    TrackEcommerceRoutingModule,
    TimelineModule,

  ],
  declarations: [TrackEcommerceComponent]
})
export class TrackEcommerceModule { }
