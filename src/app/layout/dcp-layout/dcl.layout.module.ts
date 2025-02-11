import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DclLayoutComponent } from './dcl.layout.component';
import {DclMenuComponent} from './dcl.menu.component';
import { DclSidebarComponent } from './dcl.sidebar.component';

@NgModule({
    declarations: [
        DclLayoutComponent,
        DclMenuComponent,
        DclSidebarComponent,
    ],
    imports: [
       SharedModule
    ],
    exports: [DclLayoutComponent]
})
export class DclLayoutModule { }
