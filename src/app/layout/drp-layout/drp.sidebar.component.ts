import { Component, ElementRef } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';

@Component({
    selector: 'drp-sidebar',
    templateUrl: './drp.sidebar.component.html'
})
export class DrpSidebarComponent {
    constructor(public layoutService: LayoutService, public el: ElementRef) { }
}

