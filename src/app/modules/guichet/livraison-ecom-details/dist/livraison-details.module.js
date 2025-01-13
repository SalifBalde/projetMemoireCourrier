"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LivraisonDetailsModule = void 0;
var core_1 = require("@angular/core");
var shared_component_module_1 = require("src/app/layout/shared/shared-component.module");
var timeline_1 = require("primeng/timeline");
var card_1 = require("primeng/card");
var livraison_details_component_1 = require("./livraison-details.component");
var livraison_details_routing_module_1 = require("./livraison-details.routing.module");
var LivraisonDetailsModule = /** @class */ (function () {
    function LivraisonDetailsModule() {
    }
    LivraisonDetailsModule = __decorate([
        core_1.NgModule({
            declarations: [
                livraison_details_component_1.LivraisonDetailsComponent
            ],
            imports: [
                shared_component_module_1.SharedComponentModule,
                timeline_1.TimelineModule,
                livraison_details_routing_module_1.LivraisonDetailsRoutingModule,
                card_1.CardModule
            ]
        })
    ], LivraisonDetailsModule);
    return LivraisonDetailsModule;
}());
exports.LivraisonDetailsModule = LivraisonDetailsModule;
