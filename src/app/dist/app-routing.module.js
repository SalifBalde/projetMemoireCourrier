"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var app_layout_component_1 = require("./layout/app.layout.component");
var receveur_layout_component_1 = require("./layout/receveur-layout/receveur.layout.component");
var backoffice_layout_component_1 = require("./layout/backoffice-layout/backoffice.layout.component");
var notfound_component_1 = require("./demo/components/notfound/notfound.component");
var auth_guard_1 = require("./guards/auth.guard");
var guichet_layout_component_1 = require("./layout/guichet-layout/guichet.layout.component");
var arriere_layout_component_1 = require("./layout/arriere-layout/arriere.layout.component");
var ct_layout_component_1 = require("./layout/ct-layout/ct.layout.component");
var drp_layout_component_1 = require("./layout/drp-layout/drp.layout.component");
var messagerie_layout_component_1 = require("./layout/messagerie-layout/messagerie.layout.component");
var messageriePacket_layout_component_1 = require("./layout/messageriePacket-layout/messageriePacket.layout.component");
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot([
                    {
                        path: '', component: app_layout_component_1.AppLayoutComponent, canActivate: [auth_guard_1.AuthGuard],
                        children: [
                            {
                                path: '',
                                loadChildren: function () { return Promise.resolve().then(function () { return require('./modules/home/home.module'); }).then(function (m) { return m.HomeModule; }); }
                            },
                        ]
                    },
                    {
                        path: 'receveur', component: receveur_layout_component_1.ReceveurLayoutComponent, canActivate: [auth_guard_1.AuthGuard], data: { roles: ['ROLE_RECEVEUR'] },
                        loadChildren: function () { return Promise.resolve().then(function () { return require('./modules/receveur/receveur.module'); }).then(function (m) { return m.ReceveurModule; }); }
                    },
                    {
                        path: 'guichet', component: guichet_layout_component_1.GuichetLayoutComponent, canActivate: [auth_guard_1.AuthGuard], data: { roles: ['ROLE_GUICHET'] },
                        loadChildren: function () { return Promise.resolve().then(function () { return require('./modules/guichet/guichet.module'); }).then(function (m) { return m.GuichetModule; }); }
                    },
                    {
                        path: 'backoffice', component: backoffice_layout_component_1.BackofficeLayoutComponent, canActivate: [auth_guard_1.AuthGuard], data: { roles: ['ROLE_ADMIN'] },
                        loadChildren: function () { return Promise.resolve().then(function () { return require('./modules/backoffice/backoffice.module'); }).then(function (m) { return m.BackofficeModule; }); }
                    },
                    {
                        path: 'arriere', component: arriere_layout_component_1.ArriereLayoutComponent, canActivate: [auth_guard_1.AuthGuard], data: { roles: ['ROLE_ARRIERE'] },
                        loadChildren: function () { return Promise.resolve().then(function () { return require('./modules/arriere/arriere.module'); }).then(function (m) { return m.ArriereModule; }); }
                    },
                    {
                        path: 'ct', component: ct_layout_component_1.CtLayoutComponent, canActivate: [auth_guard_1.AuthGuard], data: { roles: ['ROLE_CT'] },
                        loadChildren: function () { return Promise.resolve().then(function () { return require('./modules/centre-tri/centre-tri.module'); }).then(function (m) { return m.CentreTriModule; }); }
                    },
                    {
                        path: 'messagerie', component: messagerie_layout_component_1.MessagerieLayoutComponent, canActivate: [auth_guard_1.AuthGuard], data: { roles: ['ROLE_MESSAGERIE'] },
                        loadChildren: function () { return Promise.resolve().then(function () { return require('./modules/messagerie/messagerie.module'); }).then(function (m) { return m.MessagerieModule; }); }
                    }, {
                        path: 'messageriePacket', component: messageriePacket_layout_component_1.MessageriePacketLayoutComponent, canActivate: [auth_guard_1.AuthGuard], data: { roles: ['ROLE_MESSPAQUET'] },
                        loadChildren: function () { return Promise.resolve().then(function () { return require('./modules/massagerie-packet/courrier-importrcep.module'); }).then(function (m) { return m.CourrierImportrcepModule; }); }
                    },
                    {
                        path: 'drp', component: drp_layout_component_1.DrpLayoutComponent, canActivate: [auth_guard_1.AuthGuard], data: { roles: ['ROLE_DRP'] },
                        loadChildren: function () { return Promise.resolve().then(function () { return require('./modules/drp/drp.module'); }).then(function (m) { return m.DrpModule; }); }
                    },
                    {
                        path: 'dro', component: DroLayoutComponent, canActivate: [auth_guard_1.AuthGuard], data: { roles: ['ROLE_DRO'] },
                        loadChildren: function () { return Promise.resolve().then(function () { return require('./modules/dro/dro.module'); }).then(function (m) { return m.DroModule; }); }
                    },
                    { path: 'notfound', component: notfound_component_1.NotfoundComponent },
                    { path: '**', redirectTo: '/notfound' },
                ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })
            ],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
// import { RouterModule } from '@angular/router';
// import { NgModule } from '@angular/core';
// import { AppLayoutComponent } from "./layout/app.layout.component";
// import { ReceveurLayoutComponent } from './layout/receveur-layout/receveur.layout.component';
// import { BackofficeLayoutComponent } from './layout/backoffice-layout/backoffice.layout.component';
// import { NotfoundComponent } from './demo/components/notfound/notfound.component';
// // import { AuthGuard } from './guards/auth.guard';
// import { GuichetLayoutComponent } from './layout/guichet-layout/guichet.layout.component';
// import { ArriereLayoutComponent } from './layout/arriere-layout/arriere.layout.component';
// @NgModule({
//   imports: [
//     RouterModule.forRoot([
//       {
//         path: '', component: AppLayoutComponent,
//         // canActivate: [AuthGuard],
//         children: [
//           {
//             path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
//           },
//         ]
//       },
//       {
//         path: 'receveur', component: ReceveurLayoutComponent,
//         //  canActivate: [AuthGuard], data: { roles: ['ROLE_RECEVEUR'] },
//         loadChildren: () => import('./modules/receveur/receveur.module').then(m => m.ReceveurModule),
//       },
//       {
//         path: 'guichet', component: GuichetLayoutComponent,
//         // canActivate: [AuthGuard], data: { roles: ['ROLE_GUICHET'] },
//         loadChildren: () => import('./modules/guichet/guichet.module').then(m => m.GuichetModule),
//       },
//       {
//         path: 'backoffice', component: BackofficeLayoutComponent,
//         // canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] },
//         loadChildren: () => import('./modules/backoffice/backoffice.module').then(m => m.BackofficeModule),
//       },
//       {
//         path: 'arriere', component: ArriereLayoutComponent,
//         // canActivate: [AuthGuard], data: { roles: ['ROLE_ARRIERE'] },
//         loadChildren: () => import('./modules/arriere/arriere.module').then(m => m.ArriereModule),
//       },
//             { path: 'notfound', component: NotfoundComponent },
//             { path: 'drp', loadChildren: () => import('./modules/drp/drp.module').then(m => m.DrpModule) },
//             { path: 'centreTri', loadChildren: () => import('./modules/centre-tri/centre-tri.module').then(m => m.CentreTriModule) },
//             { path: '**', redirectTo: '/notfound' },
//         ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled',  })
//     ],
//     exports: [RouterModule]
// })
// export class AppRoutingModule {
// }
