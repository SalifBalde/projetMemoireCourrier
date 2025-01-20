import { Component, ElementRef } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';

@Component({
    selector: 'messagerie-layout',
    templateUrl: './messagerie-packet-sidebar.component.html'
})
export class MessageriePacketSidebarComponent {
    constructor(public layoutService: LayoutService, public el: ElementRef) { }
}

