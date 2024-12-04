import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypeCourrierRoutingModule } from './type-courrier-routing.module';
import { TypeCourrierComponent } from './type-courrier.component';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import {ReactiveFormsModule} from "@angular/forms";
import {DialogModule} from "primeng/dialog";
import {InputSwitchModule} from "primeng/inputswitch";
import {Ripple} from "primeng/ripple";
import {ButtonDirective} from "primeng/button";
import {ChipsModule} from "primeng/chips";

@NgModule({
  declarations: [
    TypeCourrierComponent
  ],
    imports: [
        ReactiveFormsModule,
        TagModule,
        ToastModule,
        ToolbarModule,
        TableModule,
        CommonModule,
        TypeCourrierRoutingModule,
        DialogModule,
        InputSwitchModule,
        Ripple,
        ButtonDirective,
        ChipsModule
    ]
})
export class TypeCourrierModule { }
