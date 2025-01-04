import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';
import { IndexComponent } from 'src/app/modules/receveur/index/index.component';

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
                label: 'Gestion des Rapport',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'C 10',
                        icon: 'pi pi-fw pi-box',
                        routerLink: [''],
                    },
                    {
                        label: 'C10 Bureau',
                        icon: 'pi pi-fw pi-box',
                        routerLink: [''],
                    },
                ],
            },
        ];
    }
}
