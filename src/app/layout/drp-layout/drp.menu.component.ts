import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';

@Component({
    selector: 'drp-menu',
    templateUrl: './drp.menu.component.html',
})
export class DrpMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Drp',
                items: [
                    {
                        label: 'Expedition',
                        icon: 'pi pi-fw pi-send',
                        routerLink: ['/drp/expedition'],
                    },
                    {
                        label: 'Reception',
                        icon: 'pi pi-fw pi-download',
                        routerLink: ['/drp/reception'],
                    },

                ],
            },
            {
                label: 'Reporting',
                items: [
                    {
                        label: 'Report Jt',
                        icon: 'pi pi-fw pi-file-pdf',
                        routerLink: ['/drp/rapport'],
                    },
                ],
            },

        ];
    }
}
