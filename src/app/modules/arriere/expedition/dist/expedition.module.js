"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ExpeditionModule = void 0;
var core_1 = require("@angular/core");
var expedition_routing_module_1 = require("./expedition-routing.module");
var expedition_component_1 = require("./expedition.component");
var shared_component_module_1 = require("src/app/layout/shared/shared-component.module");
var ExpeditionModule = /** @class */ (function () {
    function ExpeditionModule() {
    }
    ExpeditionModule = __decorate([
        core_1.NgModule({
            declarations: [
                expedition_component_1.ExpeditionComponent
            ],
            imports: [
                shared_component_module_1.SharedComponentModule,
                expedition_routing_module_1.ExpeditionRoutingModule
            ]
        })
    ], ExpeditionModule);
    return ExpeditionModule;
}());
exports.ExpeditionModule = ExpeditionModule;
