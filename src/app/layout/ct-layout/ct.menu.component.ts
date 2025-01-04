import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';

@Component({
    selector: 'ct-menu',
    templateUrl: './ct.menu.component.html',
})
export class CtMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.model = [

            
            {
                label: 'Ct',
                items: [
                    {
                        label: 'Expedition',
                        icon: 'pi pi-fw pi-send',
                        routerLink: ['/ct/expedition'],
                    },
                    {
                        label: 'Expedition Ecommerce',
                        icon: 'pi pi-fw pi-send',
                        routerLink: ['/ct/expedition/expedition-E-commerce'],
                    },
                    {
                        label: 'Reception',
                        icon: 'pi pi-fw pi-download',
                        routerLink: ['/ct/reception'],
                    },
                    {
                        label: 'Reception Ecommerce',
                        icon: 'pi pi-fw pi-download',
                        routerLink: ['/ct/reception/reception-E-commerce'],
                    },
                    {
                        label: 'Reception Code',
                        icon: 'pi pi-fw pi-qrcode',
                        routerLink: ['/ct/reception'],
                    },
                ],
            },
            {
                label: 'Reporting',
                items: [
                    {
                        label: 'Report Jt3',
                        icon: 'pi pi-fw pi-file-pdf',
                        routerLink: ['/ct/rapport'],
                    },
                ],
            },

        ];
    }
}
