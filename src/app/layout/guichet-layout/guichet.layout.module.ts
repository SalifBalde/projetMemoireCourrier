import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { GuichetLayoutComponent } from './guichet.layout.component';
import { GuichetMenuComponent } from './guichet.menu.component';
import { GuichetSidebarComponent } from './guichet.sidebar.component';

@NgModule({
    declarations: [
        GuichetLayoutComponent,
        GuichetMenuComponent,
        GuichetSidebarComponent,
    ],
    imports: [
       SharedModule
    ],
    exports: [GuichetLayoutComponent]
})
export class GuichetLayoutModule { }
