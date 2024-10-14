import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';

@Component({
    selector: 'arriere-menu',
    templateUrl: './arriere.menu.component.html',
})
export class ArriereMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Arriere',
                items: [
                    {
                        label: 'Expedition',
                        icon: 'pi pi-fw pi-send',
                        routerLink: ['/arriere/expedition'],
                    },
                    {
                        label: 'Reception',
                        icon: 'pi pi-fw pi-download',
                        routerLink: ['/arriere/reception'],
                    },

                ],
            },
            {
                label: 'Reporting',
                items: [
                    {
                        label: 'Report Jt',
                        icon: 'pi pi-fw pi-file-pdf',
                        routerLink: ['/arriere/rapport'],
                    },
                ],
            },

        ];
    }
}
