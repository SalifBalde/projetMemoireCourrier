import { Component, ElementRef } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';

@Component({
    selector: 'responsableannexe-sidebar',
    templateUrl: './responsableannexe.sidebar.component.html'
})
export class ResponsableannexeSidebarComponent {
    constructor(public layoutService: LayoutService, public el: ElementRef) { }
}

