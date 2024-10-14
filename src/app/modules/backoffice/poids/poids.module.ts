import { NgModule } from '@angular/core';
import { PoidsRoutingModule } from './poids-routing.module';
import { PoidsComponent } from './poids.component';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';

@NgModule({
  declarations: [
    PoidsComponent
  ],
  imports: [
    SharedComponentModule,
    PoidsRoutingModule
  ]
})
export class PoidsModule { }
