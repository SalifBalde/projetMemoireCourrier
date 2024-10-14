import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DrpLayoutComponent } from './drp.layout.component';
import { DrpMenuComponent } from './drp.menu.component';
import { DrpSidebarComponent } from './drp.sidebar.component';

@NgModule({
    declarations: [
        DrpLayoutComponent,
        DrpMenuComponent,
        DrpSidebarComponent,
    ],
    imports: [
       SharedModule
    ],
    exports: [DrpLayoutComponent]
})
export class DrpLayoutModule { }
