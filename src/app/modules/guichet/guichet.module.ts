import { NgModule } from '@angular/core';
import { GuichetRoutingModule } from './guichet-routing.module';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';


@NgModule({
  declarations: [],
  imports: [
    SharedComponentModule,
    GuichetRoutingModule
  ]
})
export class GuichetModule { }
