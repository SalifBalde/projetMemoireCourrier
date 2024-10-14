import { Component, ElementRef } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';

@Component({
    selector: 'receveur-sidebar',
    templateUrl: './receveur.sidebar.component.html'
})
export class ReceveurSidebarComponent {
    constructor(public layoutService: LayoutService, public el: ElementRef) { }
}

