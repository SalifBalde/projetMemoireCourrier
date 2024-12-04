import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeRoutingModule } from './theme-routing.module';
import { ThemeComponent } from './theme.component';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputSwitchModule} from "primeng/inputswitch";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {RippleModule} from "primeng/ripple";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";


@NgModule({
  declarations: [
    ThemeComponent
  ],
    imports: [
        CommonModule,
        ThemeRoutingModule,
        ButtonModule,
        DialogModule,
        FormsModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        ReactiveFormsModule,
        RippleModule,
        SharedModule,
        TableModule,
        TagModule,
        ToastModule,
        ToolbarModule
    ]
})
export class ThemeModule { }
