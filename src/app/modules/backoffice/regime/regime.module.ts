import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegimeRoutingModule } from './regime-routing.module';
import { RegimeComponent } from './regime.component';
import {ButtonDirective} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputSwitchModule} from "primeng/inputswitch";
import {InputTextModule} from "primeng/inputtext";
import {PrimeTemplate} from "primeng/api";
import {ReactiveFormsModule} from "@angular/forms";
import {Ripple} from "primeng/ripple";
import {SharedComponentModule} from "../../../layout/shared/shared-component.module";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";


@NgModule({
  declarations: [
    RegimeComponent
  ],
    imports: [
        CommonModule,
        RegimeRoutingModule,
        ButtonDirective,
        DialogModule,
        InputSwitchModule,
        InputTextModule,
        PrimeTemplate,
        ReactiveFormsModule,
        Ripple,
        SharedComponentModule,
        TableModule,
        ToastModule,
        ToolbarModule
    ]
})
export class RegimeModule { }
