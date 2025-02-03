import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';

@Component({
    selector: 'messagerie-menu',
    templateUrl: './messagerie.menu.component.html',
})
export class MessagerieMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.model = [
            {
                label: 'DK Messagerie',
                items: [
                    // {
                    //     label: 'Expedition',
                    //     icon: 'pi pi-fw pi-send',
                    //     routerLink: ['/messagerie/expedition'],
                    // },
                    // {
                    //     label: 'Reception',
                    //     icon: 'pi pi-fw pi-download',
                    //     routerLink: ['/messagerie/reception'],
                    // },
                    // {
                    //     label: 'Reception Code',
                    //     icon: 'pi pi-fw pi-qrcode',
                    //     routerLink: ['/ct/reception'],
                    // },

                ],
            },


            {
                //label: 'Colis-Imports',
                items: [
                    {
                        label: 'Expédition Colis-Import',
                        icon: 'pi pi-fw pi-send',
                        routerLink: ['/messagerie/colis-import-exp'],
                    },

                ],
            },
            {
                label: 'Reception Colis',
                items: [
                    {
                        label: 'Mise en Douane',
                        icon: "pi pi-arrow-right",
                        routerLink: ['/messagerie/colis-import'],
                    },
                    {
                        label: 'Sortie Douane',
                        icon: 'pi pi-arrow-left',
                        routerLink: ['/messagerie/sortieDouane'],
                    },
                ],
            },
           /*  {
                label: 'Reporting',
                items: [
                    {
                        label: 'Report',
                        icon: 'pi pi-fw pi-file-pdf',
                        routerLink: ['/messagerie/rapport'],
                    },
                ],
            },
 */

        ];
    }
}
