import { Component, ElementRef } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';

@Component({
    selector: 'guichet-sidebar',
    templateUrl: './guichet.sidebar.component.html'
})
export class GuichetSidebarComponent {
    constructor(public layoutService: LayoutService, public el: ElementRef) { }
}

