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
                    {
                        label: 'Accueil',
                        icon: 'pi pi-fw pi-home',
                        routerLink: [''],
                    },
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

                    {
                        label: 'Livraison Lettre',
                        icon: 'pi pi-fw pi-box',
                        routerLink: ['/guichet/livraison-lettre'],
                    },
                    {
                        label: 'Livraison Paquet',
                        icon: 'pi pi-fw pi-box',
                        routerLink: ['/guichet/livraison-paquet'],
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

                     {
                         label: 'Livraison Colis',
                         icon: 'pi pi-fw pi-box',
                         routerLink: ['/guichet/livraison'],
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
                ],
            },

        ];
    }
}
