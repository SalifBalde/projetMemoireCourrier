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
                        label: 'Dashboard',
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
                        label: 'Ordinaire',
                        icon: 'pi pi-fw pi-box',
                        routerLink: ['/guichet/search-client/1'],
                    },
                    {
                        label: 'Recomandé',
                        icon: 'pi pi-fw pi-cart-plus',
                        routerLink: ['/guichet/search-client/2'],
                    },
                    {
                        label: 'Valeur déclaré',
                        icon: 'pi pi-fw pi-truck',
                        routerLink: ['/guichet/livraison'],
                    },
                ],
            },
            {
                label: 'Gestion des Colis',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Ordinaire',
                        icon: 'pi pi-fw pi-box',
                        routerLink: ['/guichet/search-client/1'],
                    },
                    {
                        label: 'Valeur déclaré',
                        icon: 'pi pi-fw pi-cart-plus',
                        routerLink: ['/guichet/search-client/2'],
                    },
                    // {
                    //     label: 'Colis à livrer',
                    //     icon: 'pi pi-fw pi-truck',
                    //     routerLink: ['/guichet/livraison'],
                    // },
                ],
            },

            {
                label: 'Rapports',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Rapport Agent',
                        icon: 'pi pi-fw pi-file',
                        routerLink: ['/guichet/rapport'],
                    },
                    {
                        label: 'Rapport par critères',
                        icon: 'pi pi-fw pi-file',
                        routerLink: ['/guichet/rapport-criteres'],
                    },
                ],
            },
            {
                label: 'Versement',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Faire un versement',
                        icon: 'pi pi-fw pi-dollar',
                        routerLink: ['/guichet/versement'],
                    },
                ],
            },
        ];
    }
}
