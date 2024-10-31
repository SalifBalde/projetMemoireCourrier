import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchClientComponent } from './search-client.component';
import { MessageService } from 'primeng/api';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import { SearchClientRoutingModule } from './search-client-routing.module';
import {StepsModule} from "primeng/steps";
import {MatStepperModule} from '@angular/material/stepper';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {AutoCompleteModule} from "primeng/autocomplete";
import {ListboxModule} from "primeng/listbox";

@NgModule({
  declarations: [
    SearchClientComponent
  ],
    imports: [
        CommonModule,
        SearchClientRoutingModule,
        SharedComponentModule,
        StepsModule,
        MatStepperModule,
        ConfirmDialogModule,
        AutoCompleteModule,
        ListboxModule,

    ],
  providers: [MessageService]
})
export class SearchClientModule { }
