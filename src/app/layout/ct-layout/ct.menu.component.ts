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
                        label: 'Expedition Ecommerce',
                        icon: 'pi pi-fw pi-send',
                        routerLink: ['/ct/expedition/expedition-E-commerce'],
                    },

                    {
                        label: 'Reception Ecommerce',
                        icon: 'pi pi-fw pi-download',
                        routerLink: ['/ct/reception/reception-E-commerce'],
                    },

                ],
            },
            {
                label: 'Gestion Paquets',
                items:[
                    {

                                label: ' Ajouter Packet ',
                                icon: 'pi pi-fw pi-plus',
                                routerLink: ['/ct/linepacket'],

                    },

                    {
                             label: 'expédition  packet ',
                                icon: 'pi pi-fw pi-send',
                                routerLink: ['/ct/linepacketDeclarer'],
                    },
                ]

            },
            {
                label: 'Suivi Courrier',
                items: [
                    {
                        label:'suiviCourrier',
                        icon : 'pi pi-fw pi-search',
                        routerLink:['/ct/suiviCourrier']
                    }
                ]
            },
            {
                label: 'Reporting',
                items: [
                    {
                        label: 'Report Jt3',
                        icon: 'pi pi-fw pi-file-pdf',
                        routerLink: ['/ct/rapport'],
                    },
                    {
                        label: 'Report Jt3 e-commerce ',
                        icon: 'pi pi-fw pi-file-pdf',
                        routerLink: ['/ct/RapportEcommerce'],
                    },
                ],
            },



        ];
    }
}
