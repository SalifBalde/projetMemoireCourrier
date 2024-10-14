import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BackofficeLayoutComponent } from './backoffice.layout.component';
import { BackofficeMenuComponent } from './backoffice.menu.component';
import { BackofficeSidebarComponent } from './backoffice.sidebar.component';

@NgModule({
    declarations: [
        BackofficeLayoutComponent,
        BackofficeMenuComponent,
        BackofficeSidebarComponent,
    ],
    imports: [
       SharedModule
    ],
    exports: [BackofficeLayoutComponent]
})
export class BackofficeLayoutModule { }
