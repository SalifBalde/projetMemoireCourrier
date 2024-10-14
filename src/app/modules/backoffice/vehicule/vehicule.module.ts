import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { VehiculeRoutingModule } from './vehicule-routing.module';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SharedModule } from 'src/app/layout/shared/shared.module';
import { SharedComponentModule } from 'src/app/layout/shared/shared-component.module';
import { VehiculeComponent } from './vehicule.component';

@NgModule({
  declarations: [
    VehiculeComponent
  ],
  imports: [

    VehiculeRoutingModule,
    SharedComponentModule
  ]
})
export class VehiculeModule { }
