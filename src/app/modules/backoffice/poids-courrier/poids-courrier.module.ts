import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoidsCourrierRoutingModule } from './poids-courrier-routing.module';
import { PoidsCourrierComponent } from './poids-courrier.component';
import {ButtonDirective} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {InputSwitchModule} from "primeng/inputswitch";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {PrimeTemplate} from "primeng/api";
import {ReactiveFormsModule} from "@angular/forms";
import {Ripple} from "primeng/ripple";
import {SharedComponentModule} from "../../../layout/shared/shared-component.module";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";


@NgModule({
  declarations: [
    PoidsCourrierComponent
  ],
    imports: [
        CommonModule,
        PoidsCourrierRoutingModule,
        ButtonDirective,
        DialogModule,
        DropdownModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        PrimeTemplate,
        ReactiveFormsModule,
        Ripple,
        SharedComponentModule,
        TableModule,
        TagModule,
        ToastModule,
        ToolbarModule
    ]
})
export class PoidsCourrierModule { }
