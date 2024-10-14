import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from "primeng/autocomplete";
import { CreerenvoieRoutingModule } from './creerenvoipoids-routing.module';
import { CreerenvoiPoidsComponent } from './creerenvoipoids.component';
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
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from "primeng/multiselect";


@NgModule({
  declarations: [
    CreerenvoiPoidsComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    MultiSelectModule,
    CreerenvoieRoutingModule,
    AutoCompleteModule,
    InputNumberModule,
    ChipsModule,
    SliderModule,
    TableModule,
    ColorPickerModule,
    KnobModule,
    RatingModule,
    DropdownModule,
    CheckboxModule,
    RadioButtonModule,
    FormsModule
  ]
})
export class CreerenvoiPoidsModule { }
