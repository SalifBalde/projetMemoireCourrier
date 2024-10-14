import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CtLayoutComponent } from './ct.layout.component';
import { CtMenuComponent } from './ct.menu.component';
import { CtSidebarComponent } from './ct.sidebar.component';

@NgModule({
    declarations: [
        CtLayoutComponent,
        CtMenuComponent,
        CtSidebarComponent,
    ],
    imports: [
       SharedModule
    ],
    exports: [CtLayoutComponent]
})
export class CtLayoutModule { }
