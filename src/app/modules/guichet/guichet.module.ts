import { NgModule } from '@angular/core';
import { GuichetRoutingModule } from './guichet-routing.module';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import {MatButtonModule} from "@angular/material/button";
 /* ou un autre thème */



@NgModule({
  declarations: [],
  imports: [
    SharedComponentModule,
    GuichetRoutingModule,
      MatButtonModule,

  ]
})
export class GuichetModule { }
