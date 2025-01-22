import { NgModule } from '@angular/core';
import { ResponsableannexeRoutingModule } from './responsableannexe-routing.module';
import {MatButtonModule} from "@angular/material/button";
import { MessageService } from 'primeng/api';
 /* ou un autre thème */



@NgModule({
  declarations: [],
  imports: [
    ResponsableannexeRoutingModule,
    MatButtonModule,



  ],
  providers: [MessageService]

})
export class ResponsableannexeModule { }
