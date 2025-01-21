import { NgModule } from '@angular/core';
import { GuichetRoutingModule } from './guichet-routing.module';
import {MatButtonModule} from "@angular/material/button";
import { MessageService } from 'primeng/api';
 /* ou un autre thème */



@NgModule({
  declarations: [],
  imports: [
    GuichetRoutingModule,
    MatButtonModule,



  ],
  providers: [MessageService]

})
export class GuichetModule { }
