import { Component, ElementRef } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';

@Component({
    selector: 'dcl-sidebar',
    templateUrl: './dcl.sidebar.component.html'
})
export class DclSidebarComponent {
    constructor(public layoutService: LayoutService, public el: ElementRef) { }
}

