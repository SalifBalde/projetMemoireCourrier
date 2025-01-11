import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';
import { IndexComponent } from 'src/app/modules/receveur/index/index.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'receveur-menu',
    templateUrl: './receveur.menu.component.html',
})
export class ReceveurMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Receveur',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: [''],
                    },
                ],
            },
            {
                label: 'SuiviCourrier',
                items: [
                    {
                        label:'suiviCourrier',
                        icon : 'pi pi-fw pi-search',
                        routerLink:['/receveur/suiviCourrier']
                    }
                ]
            },
            {
                label: 'Gestion des locations',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Classique',
                        icon: 'pi pi-fw pi-box',
                        items: [
                            {
                                label: 'Envoi avec Poids',
                                icon: 'pi pi-fw pi-search',
                                routerLink: ['/receveur/searchclient'],
                            },
                            {
                                label: 'Envoi avec Produit',
                                icon: 'pi pi-fw pi-search',
                                routerLink: ['/receveur/Searchclientproduit'],
                            },
                        ],
                    },
                ],
            },
        ];
    }
}
