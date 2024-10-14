import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ReceveurLayoutComponent } from './receveur.layout.component';
import { ReceveurMenuComponent } from './receveur.menu.component';
import { ReceveurSidebarComponent } from './receveur.sidebar.component';

@NgModule({
    declarations: [
        ReceveurLayoutComponent,
        ReceveurMenuComponent,
        ReceveurSidebarComponent,
    ],
    imports: [
       SharedModule
    ],
    exports: [ReceveurLayoutComponent]
})
export class ReceveurLayoutModule { }
