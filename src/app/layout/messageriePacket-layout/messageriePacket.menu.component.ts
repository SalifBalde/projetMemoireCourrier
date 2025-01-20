import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';

@Component({
    selector: 'messagerie-menu',
    templateUrl: './messageriePacket.menu.component.html',
})
export class MessageriePacketMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.model = [
            {
                label: 'DK Messagerie Packet',
                items: [
                    {
                        label: 'Expedition packet',
                        icon: 'pi pi-fw pi-send',
                        routerLink: ['/messageriePacket/packet-exp'],
                    },
                    {
                        label: 'Reception Packet',
                        icon: 'pi pi-fw pi-download',
                        routerLink: ['/messageriePacket/reception-packet-import'],
                    },
                    // {
                    //     label: 'Reception Code',
                    //     icon: 'pi pi-fw pi-qrcode',
                    //     routerLink: ['/ct/reception'],
                    // },

                ],
            },
            {
                label: 'Reporting',
                items: [
                    {
                        label: 'Report Jt3',
                        icon: 'pi pi-fw pi-file-pdf',
                        routerLink: ['/messagerie/rapport'],
                    },
                ],
            },

            // {
            //     label: 'Colis-Imports',
            //     items: [
            //         {
            //             label: 'Expédition Colis-Import',
            //             icon: 'pi pi-fw pi-file-pdf',
            //             routerLink: ['/messagerie/colis-import-exp'],
            //         },
            //         {
            //             label: 'Reception Colis-Import',
            //             icon: 'pi pi-fw pi-file-pdf',
            //             routerLink: ['/messagerie/colis-import'],
            //         },
            //     ],
            // },


        ];
    }
}
