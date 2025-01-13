import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { CalendarModule } from 'primeng/calendar';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CustomCurrencyPipe } from 'src/app/pipes/custom-currency.pipe';
import { SharedModule } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

// shared module c'est ici qu'on va mettre toutes les composants communs à toutes les parties de l'application

@NgModule({
    declarations: [CustomCurrencyPipe],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        BadgeModule,
        TagModule,
        TableModule,
        ButtonModule,
        RippleModule,
        MenubarModule,
        ToastModule,
        InputTextareaModule,
        ToolbarModule,
        DropdownModule,
        SplitButtonModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        CheckboxModule,
        InputSwitchModule,
        InputGroupAddonModule,
        InputGroupModule,
        CalendarModule,
        KeyFilterModule,
        ConfirmDialogModule,
        SharedModule // Ajoutez SharedModule dans imports
    ],
    exports: [
        InputTextModule,
        BadgeModule,
        TagModule,
        TableModule,
        ButtonModule,
        RippleModule,
        MenubarModule,
        ToastModule,
        InputTextareaModule,
        ToolbarModule,
        DropdownModule,
        SplitButtonModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        CheckboxModule,
        InputSwitchModule,
        ReactiveFormsModule,
        InputGroupAddonModule,
        InputGroupModule,
        CalendarModule,
        FormsModule,
        KeyFilterModule,
        CustomCurrencyPipe,
        CommonModule,
        SharedModule
    ],
})
export class SharedComponentModule {}
