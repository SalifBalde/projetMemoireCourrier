import { Component, ElementRef } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';

@Component({
    selector: 'arriere-sidebar',
    templateUrl: './arriere.sidebar.component.html'
})
export class ArriereSidebarComponent {
    constructor(public layoutService: LayoutService, public el: ElementRef) { }
}

