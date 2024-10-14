import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from "primeng/autocomplete";
import { CreerenvoiproduitRoutingModule } from './creerenvoiproduit-routing.module';
import { CreerenvoiproduitComponent } from './creerenvoiproduit.component';
import { InputNumberModule } from "primeng/inputnumber";
import { ChipsModule } from 'primeng/chips';
import { SliderModule } from 'primeng/slider';
import { ColorPickerModule } from 'primeng/colorpicker';
import { KnobModule } from 'primeng/knob';
import { RatingModule } from 'primeng/rating';
import { DropdownModule } from "primeng/dropdown";
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    CreerenvoiproduitComponent
  ],
  imports: [
    CommonModule,
    CreerenvoiproduitRoutingModule,
    AutoCompleteModule,
    ButtonModule,
    InputNumberModule,
    MultiSelectModule,
    ChipsModule,
    SliderModule,
    ColorPickerModule,
    KnobModule,
    RatingModule,
    DropdownModule,
    CheckboxModule,
    RadioButtonModule,
    FormsModule,
    TableModule,
    DialogModule,
    ToastModule
  ]
})
export class CreerenvoiproduitModule { }
