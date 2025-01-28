"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DroRoutingModule = void 0;
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
            { path: '', redirectTo: 'dro', pathMatch: 'full' },
            { path: 'dro', component: index_component_1.IndexComponent },
        ]
    },
    { path: 'rapport-courrier', loadChildren: function () { return Promise.resolve().then(function () { return require('./rapport-courrier/rapport-criteres.module'); }).then(function (m) { return m.RapportCriteresModule; }); } },
    { path: 'courrier-details/:id', loadChildren: function () { return Promise.resolve().then(function () { return require('./courrier-details/courrier-details.module'); }).then(function (m) { return m.CourrierDetailsModule; }); } },
    { path: 'rapport-ecom', loadChildren: function () { return Promise.resolve().then(function () { return require('./rapport-ecom/rapport-ecom.module'); }).then(function (m) { return m.RapportEcomModule; }); } },
    { path: 'ecom-details/:id', loadChildren: function () { return Promise.resolve().then(function () { return require('./ecom-details/ecom-details.module'); }).then(function (m) { return m.EcomDetailsModule; }); } },
];
var DroRoutingModule = /** @class */ (function () {
    function DroRoutingModule() {
    }
    DroRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], DroRoutingModule);
    return DroRoutingModule;
}());
exports.DroRoutingModule = DroRoutingModule;
