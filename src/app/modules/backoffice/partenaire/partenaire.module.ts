import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { PartenaireRoutingModule } from './partenaire-routing.module';
import { PartenaireComponent } from './partenaire.component';
import { TableModule } from 'primeng/table';
import {ToolbarModule} from "primeng/toolbar";
import { ToastModule } from 'primeng/toast';
import {SharedComponentModule} from "../../../layout/shared/shared-component.module";



@NgModule({
  declarations: [
    PartenaireComponent
  ],
    imports: [
        CommonModule,
        PartenaireRoutingModule,
        DialogModule,
        TableModule,
        ToolbarModule,
        ToastModule,
        SharedComponentModule
    ]
})
export class PartenaireModule { }
