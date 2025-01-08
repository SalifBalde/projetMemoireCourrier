"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GuichetRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var index_component_1 = require("./index/index.component");
var routes = [
    {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full'
    },
    {
        path: 'index',
        component: index_component_1.IndexComponent,
        children: [
            { path: '', redirectTo: 'guichet', pathMatch: 'full' },
            { path: 'guichet', component: index_component_1.IndexComponent },
        ]
    },
    { path: 'colisDetails/:id', loadChildren: function () { return Promise.resolve().then(function () { return require('./colis-details/colis-details.module'); }).then(function (m) { return m.ColisDetailsModule; }); } },
    { path: 'rapport', loadChildren: function () { return Promise.resolve().then(function () { return require('./rapport-agent/rapport-agent.module'); }).then(function (m) { return m.RapportAgentModule; }); } },
    { path: 'rapport-criteres', loadChildren: function () { return Promise.resolve().then(function () { return require('./rapport-criteres/rapport-criteres.module'); }).then(function (m) { return m.RapportCriteresModule; }); } },
    { path: 'livraison', loadChildren: function () { return Promise.resolve().then(function () { return require('./livraison/livraison.module'); }).then(function (m) { return m.LivraisonModule; }); } },
    { path: 'courrier-ordinaire', loadChildren: function () { return Promise.resolve().then(function () { return require('./courrier-ordinaire/courrier-ordinaire.module'); }).then(function (m) { return m.CourrierOrdinaireModule; }); } },
    { path: 'courrier-details/:id', loadChildren: function () { return Promise.resolve().then(function () { return require('./courrier-details/courrier-details.module'); }).then(function (m) { return m.CourrierDetailsModule; }); } },
    { path: 'colis', loadChildren: function () { return Promise.resolve().then(function () { return require('./colis/colis.module'); }).then(function (m) { return m.ColisModule; }); } },
    { path: 'livraison-ecom', loadChildren: function () { return Promise.resolve().then(function () { return require('./livraison-ecom/livraison-ecom.module'); }).then(function (m) { return m.LivraisonEcomModule; }); } },
    { path: 'livraisonDetails/:id', loadChildren: function () { return Promise.resolve().then(function () { return require('./livraison-ecom-details/livraison-details.module'); }).then(function (m) { return m.LivraisonDetailsModule; }); } },
];
var GuichetRoutingModule = /** @class */ (function () {
    function GuichetRoutingModule() {
    }
    GuichetRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], GuichetRoutingModule);
    return GuichetRoutingModule;
}());
exports.GuichetRoutingModule = GuichetRoutingModule;
