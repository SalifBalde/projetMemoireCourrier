import { Component, ElementRef } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';

@Component({
    selector: 'ct-sidebar',
    templateUrl: './ct.sidebar.component.html'
})
export class CtSidebarComponent {
    constructor(public layoutService: LayoutService, public el: ElementRef) { }
}

