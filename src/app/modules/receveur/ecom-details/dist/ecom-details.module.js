"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EcomDetailsModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var ecom_details_component_1 = require("./ecom-details.component");
var ecom_details_routing_module_1 = require("./ecom-details-routing.module");
var shared_component_module_1 = require("src/app/layout/shared/shared-component.module");
var EcomDetailsModule = /** @class */ (function () {
    function EcomDetailsModule() {
    }
    EcomDetailsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                ecom_details_routing_module_1.EcomDetailsRoutingModule,
                shared_component_module_1.SharedComponentModule
            ],
            declarations: [ecom_details_component_1.EcomDetailsComponent]
        })
    ], EcomDetailsModule);
    return EcomDetailsModule;
}());
exports.EcomDetailsModule = EcomDetailsModule;
