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
                label: 'Expedition',
                items: [
                    {
                        label: 'Expedition Courrier',
                        icon: 'pi pi-fw pi-send',
                        routerLink: ['/arriere/expedition'],
                    },
                    {
                        label: 'Expedition Colis',
                        icon: 'pi pi-fw pi-send',
                        routerLink: ['/arriere/expedition/expeditionColis'],
                    }
                ],




            },
            {
                label: 'Reception',
                items: [

                    {
                        label: 'Reception Courriers',
                        icon: 'pi pi-fw pi-download',
                        routerLink: ['/arriere/reception'],
                    },
                    {
                        label: 'Reception Colis',
                        icon: 'pi pi-fw pi-download',
                        routerLink: ['/arriere/reception/receptionColis'],
                    },
                ]
            },
            {
                label: 'E-commerce',
                items: [

                    {
                        // label: 'Reception Courriers',
                        // icon: 'pi pi-fw pi-download',
                        // routerLink: ['/arriere/reception'],
                    },
                    {
                        // label: 'Reception Colis',
                        // icon: 'pi pi-fw pi-download',
                        // routerLink: ['/arriere/reception/receptionColis'],
                    },
                ]
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
