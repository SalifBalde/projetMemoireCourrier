import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AppTopBarComponent } from './components/app.topbar.component';
import { AppFooterComponent } from './components/app.footer.component';
import { AppConfigModule } from '../config/config.module';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppMenuitemComponent } from './components/app.menuitem.component';
import { MenubarModule } from 'primeng/menubar';
import { SharedComponentModule } from './shared-component.module';

@NgModule({
    declarations: [
        AppFooterComponent,
        AppTopBarComponent,
        AppMenuitemComponent,
    ],
    exports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        SidebarModule,
        BadgeModule,
        RouterModule,
        AppConfigModule,
        AppFooterComponent,
        AppTopBarComponent,
        AppMenuitemComponent,

    ],
    imports: [CommonModule, RouterOutlet,RouterLink,RouterLinkActive,SharedComponentModule]
})
export class SharedModule { }
