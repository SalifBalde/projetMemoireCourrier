import { Component, ElementRef } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';

@Component({
    selector: 'messagerie-layout',
    templateUrl: './messagerie.sidebar.component.html'
})
export class MessagerieSidebarComponent {
    constructor(public layoutService: LayoutService, public el: ElementRef) { }
}

