import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MessageriePacketMenuComponent } from './messageriePacket.menu.component';
import { MessageriePacketSidebarComponent } from './messagerie-packet-sidebar.component';
import {CommonModule} from "@angular/common";
import {MessageriePacketLayoutComponent} from "./messageriePacket.layout.component";

@NgModule({
    declarations: [
        MessageriePacketLayoutComponent,
        MessageriePacketMenuComponent,
        MessageriePacketSidebarComponent,
    ],
    imports: [
       SharedModule
    ],
    exports: [MessageriePacketLayoutComponent]
})
export class MessageriePacketLayoutModule { }
