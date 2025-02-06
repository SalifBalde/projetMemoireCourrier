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
                        label: 'Réception',
                        icon: 'pi pi-fw pi-download',
                        routerLink: ['/messageriePacket/fermeturepacket'],
                    },
                    {
                        label: 'Sortie Daoune',
                        icon: 'pi pi-arrow-left',
                        routerLink: ['/messageriePacket/sortieDouane'],
                    },

                ],
            },
            {
                label: 'Reporting',
                items: [
                    {
                        label: 'Report ',
                        icon: 'pi pi-fw pi-file-pdf',
                        routerLink: ['/messageriePacket/RapportMassageriePacket'],
                    },
                ],
            },
            {
                label: 'Traking',
                items: [
                    {
                        label: 'Suivi Courrier ',
                        icon: 'pi pi-fw pi-eye',
                        routerLink: ['/messageriePacket/traking'],
                    },
                ],
            },

        ];
    }
}
