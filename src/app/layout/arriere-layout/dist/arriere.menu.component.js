"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ArriereMenuComponent = void 0;
var core_1 = require("@angular/core");
var ArriereMenuComponent = /** @class */ (function () {
    function ArriereMenuComponent(layoutService, sessionService, noeuxService) {
        this.layoutService = layoutService;
        this.sessionService = sessionService;
        this.noeuxService = noeuxService;
        this.model = [];
    }
    ArriereMenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Récupérer les données de Bestnoeux
        this.noeuxService.findNoeuxByIdstruct(this.sessionService.getAgentAttributes().structureId.toString()).subscribe(function (result) {
            _this.Bestnoeux = result;
            console.log(_this.Bestnoeux); // Vérification de la valeur récupérée
            _this.isNoeudAcheminement = !!_this.Bestnoeux; // Si Bestnoeux existe, isNoeudAcheminement sera true
            _this.isNotNoeudAcheminement = !_this.Bestnoeux;
            console.log(_this.isNoeudAcheminement); // Vérification de la condition
            _this.setupMenu(); // Mettre à jour le menu après la définition de isNoeudAcheminement
        });
    };
    ArriereMenuComponent.prototype.setupMenu = function () {
        // Mise à jour du menu une fois isNoeudAcheminement mis à jour
        this.model = __spreadArrays([
            {
                label: 'Expédition  Arriere',
                items: [
                    {
                        label: '--- Expédition Arrière ---',
                        styleClass: 'menu-separator',
                        items: [
                            {
                                label: ' Lettre Arrière',
                                icon: 'pi pi-fw pi-send',
                                routerLink: ['/arriere/expedition/expedition-arriere']
                            }, {
                                label: ' Packet Arrière',
                                icon: 'pi pi-fw pi-send',
                                routerLink: ['/arriere/expedition/expeditionPacket-arriere']
                            },
                            {
                                label: ' Colis Arrière',
                                icon: 'pi pi-fw pi-send',
                                routerLink: ['/arriere/expedition/expeditionColis-arriere']
                            },
                        ]
                    },
                ]
            },
            {
                label: 'Reception  Arriere',
                items: [
                    {
                        label: '--- Réception Arrière ---',
                        styleClass: 'menu-separator',
                        items: [
                            {
                                label: ' Lettre Arrière',
                                icon: 'pi pi-fw pi-download',
                                routerLink: ['/arriere/reception/reception-arriere']
                            }, {
                                label: ' Packet Arrière',
                                icon: 'pi pi-fw pi-download',
                                routerLink: ['/arriere/reception/receptionPacket-arriere']
                            },
                            {
                                label: ' Colis Arrière',
                                icon: 'pi pi-fw pi-download',
                                routerLink: ['/arriere/reception/receptioncolis-arriere']
                            },
                        ]
                    },
                ]
            }
        ], (this.isNoeudAcheminement
            ? [
                {
                    label: 'Expedition Interieur',
                    items: [
                        {
                            label: 'Lettre',
                            icon: 'pi pi-fw pi-send',
                            routerLink: ['/arriere/expedition']
                        },
                        {
                            label: 'Packet',
                            icon: 'pi pi-fw pi-send',
                            routerLink: ['/arriere/expedition/expeditionpacket']
                        },
                        {
                            label: 'Colis',
                            icon: 'pi pi-fw pi-send',
                            routerLink: ['/arriere/expedition/expeditionColis']
                        },
                    ]
                },
            ]
            : []), [
            {
                label: 'Reception Interieur',
                items: [
                    {
                        label: 'Lettre Interieur',
                        icon: 'pi pi-fw pi-download',
                        routerLink: ['/arriere/reception/fermetureLettreInterieur']
                    },
                    {
                        label: 'Packet Interieur',
                        icon: 'pi pi-fw pi-download',
                        routerLink: ['/arriere/reception/fermeturePacketInterieur']
                    },
                    {
                        label: ' Colis Interieur',
                        icon: 'pi pi-fw pi-download',
                        routerLink: ['/arriere/reception/fermetureColisOrdinaire']
                    },
                    {
                        disabled: true,
                        styleClass: 'menu-separator'
                    },
                ]
            }
        ], (this.isNoeudAcheminement
            ? [
                {
                    label: 'Expédition Import',
                    items: [
                        {
                            label: '--- Expédition Import ---',
                            styleClass: 'menu-separator',
                            items: [
                                {
                                    label: 'Expédition Lettre Import',
                                    icon: 'pi pi-fw pi-send',
                                    routerLink: ['/arriere/expedition-courrier-import/expeditionCourrierImport']
                                },
                                {
                                    label: 'Expédition Packet Import',
                                    icon: 'pi pi-fw pi-send',
                                    routerLink: ['/arriere/expedition-packet-import/expedition-packet-import']
                                },
                                {
                                    label: 'Expédition Colis Import',
                                    icon: 'pi pi-fw pi-send',
                                    routerLink: ['/arriere/expedition-courrier-import/expeditionColisImport']
                                },
                            ]
                        },
                    ]
                },
            ]
            : []), [
            {
                label: 'Reception  Import',
                items: __spreadArrays((this.isNoeudAcheminement
                    ? [
                        {
                            label: '--- Réception Import ---',
                            styleClass: 'menu-separator',
                            items: [
                                {
                                    label: ' Lettre Import',
                                    icon: 'pi pi-fw pi-download',
                                    routerLink: ['/arriere/reception/fermetureCourrierImport']
                                }, {
                                    label: ' Packet Import',
                                    icon: 'pi pi-fw pi-download',
                                    routerLink: ['/arriere/reception/fermeturePacketImport']
                                },
                                {
                                    label: ' Colis Import',
                                    icon: 'pi pi-fw pi-download',
                                    routerLink: ['/arriere/reception/fermetureColisImport']
                                },
                            ]
                        },
                    ]
                    : []))
            },
            {
                // label: 'Reception Import',
                items: __spreadArrays((this.isNotNoeudAcheminement
                    ? [
                        {
                            label: 'Lettre Import',
                            icon: 'pi pi-fw pi-download',
                            routerLink: ['/arriere/reception-import/fermetureCourrierBureauLiv']
                        }, {
                            label: 'Packet Import',
                            icon: 'pi pi-fw pi-download',
                            routerLink: ['/arriere/reception-import/fermeturePacketBureauLiv']
                        },
                        {
                            label: 'Colis Import',
                            icon: 'pi pi-fw pi-download',
                            routerLink: ['/arriere/reception-import/fermetureColisBureauLiv']
                        },
                    ]
                    : []))
            },
            {
                label: 'Reporting',
                items: [
                    {
                        label: 'Report Jt',
                        icon: 'pi pi-fw pi-file-pdf',
                        routerLink: ['/arriere/rapport']
                    },
                    {
                        label: 'Report Jt Ecommerce',
                        icon: 'pi pi-fw pi-file-pdf',
                        routerLink: ['/arriere/RapportEcommerce']
                    },
                ]
            },
        ]);
    };
    ArriereMenuComponent = __decorate([
        core_1.Component({
            selector: 'arriere-menu',
            templateUrl: './arriere.menu.component.html'
        })
    ], ArriereMenuComponent);
    return ArriereMenuComponent;
}());
exports.ArriereMenuComponent = ArriereMenuComponent;
