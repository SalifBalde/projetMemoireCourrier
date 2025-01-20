import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MessagerieMenuComponent } from './messagerie.menu.component';
import { MessagerieSidebarComponent } from './messagerie.sidebar.component';
import {MessagerieLayoutComponent} from "./messagerie.layout.component";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [
        MessagerieLayoutComponent,
        MessagerieMenuComponent,
        MessagerieSidebarComponent,
    ],
    imports: [
       SharedModule
    ],
    exports: [MessagerieLayoutComponent]
})
export class MessagerieLayoutModule { }
