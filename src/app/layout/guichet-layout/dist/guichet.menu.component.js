"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GuichetMenuComponent = void 0;
var core_1 = require("@angular/core");
var GuichetMenuComponent = /** @class */ (function () {
    function GuichetMenuComponent(layoutService) {
        this.layoutService = layoutService;
        this.model = [];
    }
    GuichetMenuComponent.prototype.ngOnInit = function () {
        this.model = [
            {
                label: 'GUICHET',
                items: [
                    { label: 'Choix Module', icon: 'pi pi-fw pi-home', url: 'https://digitalpostv2.sn.post/' }
                ]
            },
            {
                label: 'Gestion des Courrier',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Nouveau Courrier',
                        icon: 'pi pi-fw pi-plus-circle',
                        routerLink: ['/guichet/courrier-ordinaire']
                    },
                ]
            },
            {
                label: 'Gestion des Colis',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Nouveau Colis',
                        icon: 'pi pi-fw pi-plus-circle',
                        routerLink: ['/guichet/colis']
                    },
                ]
            },
            {
                label: 'Gestion des Livraisons',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Livraison',
                        icon: "pi pi-fw pi-truck",
                        routerLink: ['/guichet/livraison']
                    },
                    {
                        label: 'Envoie E-commerce à livrer',
                        icon: 'pi pi-fw pi-truck',
                        routerLink: ['/guichet/livraison-ecom']
                    },
                ]
            },
            {
                label: 'Rapports',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'C 10',
                        icon: 'pi pi-fw pi-file',
                        routerLink: ['/guichet/rapport']
                    },
                    {
                        label: 'Cn 23',
                        icon: 'pi pi-fw pi-file',
                        routerLink: ['/guichet/rapport-courrier']
                    },
                ]
            },
        ];
    };
    GuichetMenuComponent = __decorate([
        core_1.Component({
            selector: 'guichet-menu',
            templateUrl: './guichet.menu.component.html'
        })
    ], GuichetMenuComponent);
    return GuichetMenuComponent;
}());
exports.GuichetMenuComponent = GuichetMenuComponent;
