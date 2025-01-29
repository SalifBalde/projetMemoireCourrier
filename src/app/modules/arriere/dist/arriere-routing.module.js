"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ArriereRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var arriere_component_1 = require("./arriere.component");
var routes = [{ path: '', component: arriere_component_1.ArriereComponent }, { path: 'reception', loadChildren: function () { return Promise.resolve().then(function () { return require('./reception/reception.module'); }).then(function (m) { return m.ReceptionModule; }); } },
    { path: 'reception/receptionColis', loadChildren: function () { return Promise.resolve().then(function () { return require('./reception/reception-colis/reception-colis.module'); }).then(function (m) { return m.ReceptionColisModule; }); } },
    { path: 'reception/reception-E-commerce-livraison', loadChildren: function () { return Promise.resolve().then(function () { return require('./reception/reception-E-commerce-livraison/reception-E-commerce.module'); }).then(function (m) { return m.ReceptionECommerceModule; }); } },
    { path: 'reception/reception-E-commerce-expedition', loadChildren: function () { return Promise.resolve().then(function () { return require('./reception/reception-E-commerce-expedition/reception-E-commerce.module'); }).then(function (m) { return m.ReceptionECommerceModule; }); } },
    //    { path: 'expedition', loadChildren: () => import('./expedition/expedition.module').then(m => m.ExpeditionModule) },
    //    { path: 'expedition/expeditionColis', loadChildren: () => import('./expedition/expedition-colis/expeditionColis.module').then(m => m.ExpeditionColisModule) },
    { path: 'expedition/expedition-E-commerce', loadChildren: function () { return Promise.resolve().then(function () { return require('./expedition/expedition-E-commerce/expedition-E-commerce.module'); }).then(function (m) { return m.ExpeditionECommerceModule; }); } },
    { path: 'rapport', loadChildren: function () { return Promise.resolve().then(function () { return require('../drp/rapport/rapport.module'); }).then(function (m) { return m.RapportModule; }); } },
    //    { path: 'details-expedition/:id', loadChildren: () => import('./details-expedition/details-expedition.module').then(m => m.DetailsExpeditionModule) },
    { path: 'details-expeditionEcom/:id', loadChildren: function () { return Promise.resolve().then(function () { return require('./detail-expeditionEcom/detail-expeditionEcom.module'); }).then(function (m) { return m.DetailExpeditionEcomModule; }); } },
    { path: 'RapportEcommerce', loadChildren: function () { return Promise.resolve().then(function () { return require('./rapportEcommerce/rapportEcommerce.module'); }).then(function (m) { return m.RapportEcommerceModule; }); } },
];
var ArriereRoutingModule = /** @class */ (function () {
    function ArriereRoutingModule() {
    }
    ArriereRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], ArriereRoutingModule);
    return ArriereRoutingModule;
}());
exports.ArriereRoutingModule = ArriereRoutingModule;
