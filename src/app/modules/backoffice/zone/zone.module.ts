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
import {ButtonDirective, ButtonModule} from "primeng/button";
import {Ripple, RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {SharedModule} from "../../../layout/shared/shared.module";
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';

@NgModule({
  declarations: [
    ZoneComponent
  ],
    imports: [
       SharedComponentModule,
       ZoneRoutingModule
    ]
})
export class ZoneModule { }
