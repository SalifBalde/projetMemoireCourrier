import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import {ResponsableAnnexeLayoutComponent} from "./responsable-annexe.layout.component";
import {ResponsableannexeMenuComponent} from "./responsableannexe.menu.component";
import {ResponsableannexeSidebarComponent} from "./responsableannexe.sidebar.component";

@NgModule({
    declarations: [
        ResponsableAnnexeLayoutComponent,
        ResponsableannexeMenuComponent,
        ResponsableannexeSidebarComponent,
    ],
    imports: [
       SharedModule
    ],
    exports: [ResponsableAnnexeLayoutComponent]
})
export class ResponsableannexeLayoutModule { }
