import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ArriereLayoutComponent } from './arriere.layout.component';
import { ArriereMenuComponent } from './arriere.menu.component';
import { ArriereSidebarComponent } from './arriere.sidebar.component';

@NgModule({
    declarations: [
        ArriereLayoutComponent,
        ArriereMenuComponent,
        ArriereSidebarComponent,
    ],
    imports: [
       SharedModule
    ],
    exports: [ArriereLayoutComponent]
})
export class ArriereLayoutModule { }
