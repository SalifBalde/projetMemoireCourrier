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
            // {
            //     label: 'Ct',
            //     items: [
            //         {
            //             label: 'Expedition',
            //             icon: 'pi pi-fw pi-send',
            //             routerLink: ['/ct/expedition'],
            //         },
            //         {
            //             label: 'Reception',
            //             icon: 'pi pi-fw pi-download',
            //             routerLink: ['/ct/reception'],
            //         },
            //
            //
            //
            //     ],
            // },


            {
                label: ' Packet Ordinaire',
                items: [
                    {
                        label: ' Ajouter Packet ',
                        icon: 'pi pi-fw pi-plus',
                        routerLink: ['/ct/linepacket'],
                    },

                ],
            },
            // {
            //     label: ' Reception-Packet',
            //     items: [
            //         {
            //             label: ' réception packet',
            //             icon: 'pi pi-fw pi-download',
            //             routerLink: ['/ct/linepacketDeclarer'],
            //         },
            //
            //     ],
            // },
            {
                label: 'Expédition Packet',
                items: [
                    {
                        label: 'expédition  packet ',
                        icon: 'pi pi-fw pi-send',
                        routerLink: ['/ct/linepacketDeclarer'],
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
