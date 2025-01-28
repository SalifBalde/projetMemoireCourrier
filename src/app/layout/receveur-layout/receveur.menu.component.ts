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
                    { label: 'Choix Module', icon: 'pi pi-fw pi-home', url: 'https://digitalpostv2.sn.post/' }
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
                label: 'Rapports',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'C 10',
                        icon: 'pi pi-fw pi-file',
                        routerLink: ['/receveur/rapport-courrier'],
                    },
                    {
                        label: 'Rapport E-commerce',
                        icon: 'pi pi-fw pi-file',
                        routerLink: ['/receveur/rapport-ecom'],
                    },
                ],
            },
        ];
    }
}
