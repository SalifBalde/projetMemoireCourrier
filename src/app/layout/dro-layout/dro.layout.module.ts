import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { DroLayoutComponent } from './dro.layout.component';
import { DroMenuComponent } from './dro.menu.component';
import { DroSidebarComponent } from './dro.sidebar.component';

@NgModule({
    declarations: [
        DroLayoutComponent,
        DroMenuComponent,
        DroSidebarComponent,
    ],
    imports: [
       SharedModule
    ],
    exports: [DroLayoutComponent]
})
export class DroLayoutModule { }
