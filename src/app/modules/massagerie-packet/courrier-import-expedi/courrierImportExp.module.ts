import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CourrierImportiExpRoutingModule} from "./courrierImportiExp-routing.module";
import {CourrierImportExpediComponent} from "./courrier-import-expedi.component";
import {BadgeModule} from "primeng/badge";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputGroupModule} from "primeng/inputgroup";
import {InputTextModule} from "primeng/inputtext";
import {KeyFilterModule} from "primeng/keyfilter";
import {RippleModule} from "primeng/ripple";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";


@NgModule({
  declarations: [
  CourrierImportExpediComponent

  ],
    imports: [
        CommonModule,
        CourrierImportiExpRoutingModule,
        BadgeModule,
        ButtonModule,
        DialogModule,
        DropdownModule,
        FormsModule,
        InputGroupAddonModule,
        InputGroupModule,
        InputTextModule,
        KeyFilterModule,
        RippleModule,
        SharedModule,
        TableModule,
        ToastModule
    ]
})
export class CourrierImportExpModule { }
