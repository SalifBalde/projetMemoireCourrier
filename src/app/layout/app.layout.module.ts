import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./app.layout.component";
import { SharedModule } from './shared/shared.module';
import { AppMenuComponent } from './app.menu.component';
import { AppSidebarComponent } from './app.sidebar.component';

@NgModule({
    declarations: [
        AppLayoutComponent,
        AppMenuComponent,
        AppSidebarComponent,
    ],
    imports: [
       SharedModule
    ],
    exports: [AppLayoutComponent]
})
export class AppLayoutModule { }
