import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceCourrierRoutingModule } from './service-courrier-routing.module';
import { ServiceCourrierComponent } from './service-courrier.component';
import {ButtonDirective, ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {InputSwitchModule} from "primeng/inputswitch";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {PaginatorModule} from "primeng/paginator";
import {PrimeTemplate} from "primeng/api";
import {ReactiveFormsModule} from "@angular/forms";
import {Ripple, RippleModule} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";


@NgModule({
  declarations: [
    ServiceCourrierComponent
  ],
    imports: [
        CommonModule,
        ServiceCourrierRoutingModule,
        ButtonModule,
        DialogModule,
        DropdownModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        PaginatorModule,
        ReactiveFormsModule,
        RippleModule,
        TableModule,
        TagModule,
        ToastModule,
        ToolbarModule
    ]
})
export class ServiceCourrierModule { }
