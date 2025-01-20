import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MessagerieiRoutingModule} from "./messageriei-routing.module";
import {MessagerieComponent} from "./messagerie.component";



@NgModule({
  declarations: [


  ],
    imports: [
        CommonModule,
        MessagerieiRoutingModule,
        MessagerieComponent,
        MessagerieComponent
    ]
})
export class MessagerieModule { }
