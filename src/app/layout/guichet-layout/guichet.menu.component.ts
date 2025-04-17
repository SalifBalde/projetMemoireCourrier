import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';
import { IndexComponent } from 'src/app/modules/guichet/index/index.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'guichet-menu',
    templateUrl: './guichet.menu.component.html',
})
export class GuichetMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.model = [
            {
                label: 'GUICHET',
                items: [
                    { label: 'Choix Module', icon: 'pi pi-fw pi-home', url: 'https://digitalpostv2.sn.post/' }
                ],
            },

            {
                label: 'Gestion des Courrier',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Nouveau Courrier',
                        icon: 'pi pi-fw pi-plus-circle',
                        routerLink: ['/guichet/courrier-ordinaire'],
                    },

                ],
            },
            {
                label: 'Gestion des Colis',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Nouveau Colis',
                        icon: 'pi pi-fw pi-plus-circle',
                        routerLink: ['/guichet/colis'],
                    },


                ],
            },
            {
                label: 'Gestion des Livraisons',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Livraison',
                        icon:"pi pi-fw pi-truck",
                        routerLink: ['/guichet/livraison'],
                    },

                    {
                        label: 'Livraison E-commerce ',
                        icon: 'pi pi-fw pi-truck',
                        routerLink: ['/guichet/livraison-ecom'],
                    },
                ],
            },
            {
                label: 'Rapports',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'C 10',
                        icon: 'pi pi-fw pi-file',
                        routerLink: ['/guichet/rapport'],
                    },
                    {
                        label: 'Cn 23',
                        icon: 'pi pi-fw pi-file',
                        routerLink: ['/guichet/rapport-courrier'],
                    },
                ],
            },

        ];
    }
}
