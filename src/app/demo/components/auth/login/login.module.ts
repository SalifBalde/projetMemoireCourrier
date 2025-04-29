import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ButtonModule } from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import {CheckboxModule} from "primeng/checkbox";

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        ButtonModule,
        InputTextModule,
        PasswordModule,
        ReactiveFormsModule,
        FormsModule,
        CheckboxModule
    ],
    declarations: [LoginComponent],
    providers:[]
})
export class LoginModule { }
