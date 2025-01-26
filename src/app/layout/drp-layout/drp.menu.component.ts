import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';
import { RouterLink } from '@angular/router';

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
                        label: 'Report Jt Courrier',
                        icon: 'pi pi-fw pi-file-pdf',
                        routerLink: ['/drp/rapport'],
                    },
                    {
                        label: 'Report Jt E-commerce ',
                        icon: 'pi pi-fw pi-file-pdf',
                        routerLink: ['/drp/rapport-ecommerce'],
                    }
                ],
            },

        ];
    }
}
