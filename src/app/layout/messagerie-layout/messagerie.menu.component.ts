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
            {
                label: 'Reporting',
                items: [
                    {
                        label: 'Report',
                        icon: 'pi pi-fw pi-file-pdf',
                        routerLink: ['/messagerie/rapport'],
                    },
                ],
            },
            {
                label: 'Traking',
                items: [
                    {
                        label: 'Suivi Courrier',
                        icon: 'pi pi-fw pi-eye',
                        routerLink: ['/messagerie/traking'],
                    },
                ],
            },


        ];
    }
}
