import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypeCategorieRoutingModule } from './type-categorie-routing.module';
import { TypeCategorieComponent } from './type-categorie.component';
import {ButtonDirective, ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputSwitchModule} from "primeng/inputswitch";
import {InputTextModule} from "primeng/inputtext";
import {PrimeTemplate} from "primeng/api";
import {ReactiveFormsModule} from "@angular/forms";
import {Ripple, RippleModule} from "primeng/ripple";
import {SharedComponentModule} from "../../../layout/shared/shared-component.module";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";


@NgModule({
  declarations: [
    TypeCategorieComponent
  ],
    imports: [
        CommonModule,
        TypeCategorieRoutingModule,
        ButtonModule,
        DialogModule,
        InputSwitchModule,
        InputTextModule,
        ReactiveFormsModule,
        RippleModule,
        SharedComponentModule,
        TableModule,
        ToastModule,
        ToolbarModule
    ]
})
export class TypeCategorieModule { }
