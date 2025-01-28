"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CtMenuComponent = void 0;
var core_1 = require("@angular/core");
var CtMenuComponent = /** @class */ (function () {
    function CtMenuComponent(layoutService) {
        this.layoutService = layoutService;
        this.model = [];
    }
    CtMenuComponent.prototype.ngOnInit = function () {
        this.model = [
            // {
            //     label: 'Ct',
            //     items: [
            //         {
            //             label: 'Expedition',
            //             icon: 'pi pi-fw pi-send',
            //             routerLink: ['/ct/expedition'],
            //         },
            //         {
            //             label: 'Reception',
            //             icon: 'pi pi-fw pi-download',
            //             routerLink: ['/ct/reception'],
            //         },
            //
            //
            //
            //     ],
            // },
            {
                label: ' Packet Ordinaire',
                items: [
                    {
                        label: ' Ajouter Packet ',
                        icon: 'pi pi-fw pi-plus',
                        routerLink: ['/ct/linepacket']
                    },
                ]
            },
            // {
            //     label: ' Reception-Packet',
            //     items: [
            //         {
            //             label: ' réception packet',
            //             icon: 'pi pi-fw pi-download',
            //             routerLink: ['/ct/linepacketDeclarer'],
            //         },
            //
            //     ],
            // },
            {
                label: 'Expédition Packet',
                items: [
                    {
                        label: 'expédition  packet ',
                        icon: 'pi pi-fw pi-send',
                        routerLink: ['/ct/linepacketDeclarer']
                    },
                ]
            },
            {
                label: 'Suivi Courrier',
                items: [
                    {
                        label: 'suiviCourrier',
                        icon: 'pi pi-fw pi-search',
                        routerLink: ['/ct/suiviCourrier']
                    }
                ]
            },
            {
                label: 'Reporting',
                items: [
                    {
                        label: 'Report Jt3',
                        icon: 'pi pi-fw pi-file-pdf',
                        routerLink: ['/ct/rapport']
                    },
                    {
                        label: 'Report Jt3 e-commerce ',
                        icon: 'pi pi-fw pi-file-pdf',
                        routerLink: ['/ct/RapportEcommerce']
                    },
                ]
            },
        ];
    };
    CtMenuComponent = __decorate([
        core_1.Component({
            selector: 'ct-menu',
            templateUrl: './ct.menu.component.html'
        })
    ], CtMenuComponent);
    return CtMenuComponent;
}());
exports.CtMenuComponent = CtMenuComponent;
