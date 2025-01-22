import { NgModule } from '@angular/core';
import { ResponsableannexeRoutingModule } from './responsableannexe-routing.module';
import {MatButtonModule} from "@angular/material/button";
import { MessageService } from 'primeng/api';
import {CommonModule} from "@angular/common";
import {IndexComponent} from "../receveur/index/index.component";
 /* ou un autre thème */



@NgModule({
  declarations: [
      IndexComponent
  ],
  imports: [
    ResponsableannexeRoutingModule,
      CommonModule,

  ],
    providers: [MessageService]

})
export class ResponsableannexeModule { }
