"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CentreTriRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var centre_tri_component_1 = require("./centre-tri.component");
var routes = [{ path: '', component: centre_tri_component_1.CentreTriComponent }, { path: 'reception', loadChildren: function () { return Promise.resolve().then(function () { return require('./reception/reception.module'); }).then(function (m) { return m.ReceptionModule; }); } },
    // { path: 'expedition', loadChildren: () => import('./expedition/expedition.module').then(m => m.ExpeditionModule) },
    { path: 'rapport', loadChildren: function () { return Promise.resolve().then(function () { return require('./rapport/rapport.module'); }).then(function (m) { return m.RapportModule; }); } },
    { path: 'details-expedition/:id', loadChildren: function () { return Promise.resolve().then(function () { return require('./details-expedition/details-expedition.module'); }).then(function (m) { return m.DetailsExpeditionModule; }); } },
    { path: 'expedition/expedition-E-commerce', loadChildren: function () { return Promise.resolve().then(function () { return require('./expedition-E-commerce/expedition-E-commerce.module'); }).then(function (m) { return m.ExpeditionECommerceModule; }); } },
    { path: 'reception/reception-E-commerce', loadChildren: function () { return Promise.resolve().then(function () { return require('./reception-E-commerce/reception-E-commerce.module'); }).then(function (m) { return m.ReceptionECommerceModule; }); } },
    { path: 'details-expeditionEcom/:id', loadChildren: function () { return Promise.resolve().then(function () { return require('./detail-expeditionEcom/detail-expeditionEcom.module'); }).then(function (m) { return m.DetailExpeditionEcomModule; }); } },
    { path: 'RapportEcommerce', loadChildren: function () { return Promise.resolve().then(function () { return require('./rapportEcommerce/rapportEcommerce.module'); }).then(function (m) { return m.RapportEcommerceModule; }); } },
    { path: 'suiviCourrier', loadChildren: function () { return Promise.resolve().then(function () { return require('./suiviCourrier/suiviCourrier.module'); }).then(function (m) { return m.SuiviCourrierModule; }); } },
    { path: 'linepacket', loadChildren: function () { return Promise.resolve().then(function () { return require('./reception/reception-line-packet/reception-line-packet.module'); }).then(function (m) { return m.ReceptionLinePacketModule; }); } },
    { path: 'linepacketDeclarer', loadChildren: function () { return Promise.resolve().then(function () { return require('./reception/line-packet-declarer/line-packet-declarer.module'); }).then(function (m) { return m.LinePacketDeclarerModule; }); } },
    // { path: 'expedition', loadChildren: () => import('./expedition/expedition.module').then(m => m.ExpeditionModule) },
    { path: 'rapport', loadChildren: function () { return Promise.resolve().then(function () { return require('./rapport/rapport.module'); }).then(function (m) { return m.RapportModule; }); } },
    { path: 'courrier-import-exp', loadChildren: function () { return Promise.resolve().then(function () { return require('../massagerie-packet/courrier-import-expedi/courrierImportExp.module'); }).then(function (m) { return m.CourrierImportExpModule; }); } },
    { path: 'expedition/expedition-E-commerce', loadChildren: function () { return Promise.resolve().then(function () { return require('./expedition-E-commerce/expedition-E-commerce.module'); }).then(function (m) { return m.ExpeditionECommerceModule; }); } },
    { path: 'reception/reception-E-commerce', loadChildren: function () { return Promise.resolve().then(function () { return require('./reception-E-commerce/reception-E-commerce.module'); }).then(function (m) { return m.ReceptionECommerceModule; }); } },
    { path: 'details-expeditionEcom/:id', loadChildren: function () { return Promise.resolve().then(function () { return require('./detail-expeditionEcom/detail-expeditionEcom.module'); }).then(function (m) { return m.DetailExpeditionEcomModule; }); } },
    { path: 'RapportEcommerce', loadChildren: function () { return Promise.resolve().then(function () { return require('./rapportEcommerce/rapportEcommerce.module'); }).then(function (m) { return m.RapportEcommerceModule; }); } },
    { path: 'suiviCourrier', loadChildren: function () { return Promise.resolve().then(function () { return require('./suiviCourrier/suiviCourrier.module'); }).then(function (m) { return m.SuiviCourrierModule; }); } },
];
var CentreTriRoutingModule = /** @class */ (function () {
    function CentreTriRoutingModule() {
    }
    CentreTriRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], CentreTriRoutingModule);
    return CentreTriRoutingModule;
}());
exports.CentreTriRoutingModule = CentreTriRoutingModule;
