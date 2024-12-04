import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ZoneRoutingModule } from './zone-routing.module';
import { ZoneComponent } from './zone.component';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import {ReactiveFormsModule} from "@angular/forms";
import {InputSwitchModule} from "primeng/inputswitch";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";

@NgModule({
  declarations: [
    ZoneComponent
  ],
    imports: [
        TagModule,
        ToastModule,
        ToolbarModule,
        TableModule,
        DialogModule,
        CommonModule,
        ZoneRoutingModule,
        ReactiveFormsModule,
        InputSwitchModule,
        ButtonDirective,
        Ripple,
        InputTextModule
    ]
})
export class ZoneModule { }
