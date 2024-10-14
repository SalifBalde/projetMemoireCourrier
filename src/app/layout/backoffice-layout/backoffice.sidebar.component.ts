import { Component, ElementRef } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';

@Component({
    selector: 'backoffice-sidebar',
    templateUrl: './backoffice.sidebar.component.html'
})
export class BackofficeSidebarComponent {
    constructor(public layoutService: LayoutService, public el: ElementRef) { }
}

