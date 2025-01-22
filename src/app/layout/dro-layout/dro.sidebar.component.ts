import { Component, ElementRef } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';

@Component({
    selector: 'dro-sidebar',
    templateUrl: './dro.sidebar.component.html'
})
export class DroSidebarComponent {
    constructor(public layoutService: LayoutService, public el: ElementRef) { }
}

