"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StatusEcomService = void 0;
var environment_1 = require("src/environments/environment");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var StatusEcomService = /** @class */ (function () {
    function StatusEcomService(httpClient) {
        this.httpClient = httpClient;
        this.apiName = 'etat_ecom';
        this.api_host = environment_1.environment.api_ecom + this.apiName;
        this.myToken = sessionStorage.getItem("token");
        this.httpOptions = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + this.myToken
            })
        };
    }
    StatusEcomService.prototype.findAll = function () {
        return this.httpClient.get(this.api_host, this.httpOptions);
    };
    StatusEcomService.prototype.save = function (item) {
        return this.httpClient.post(this.api_host, item, this.httpOptions);
    };
    StatusEcomService.prototype["delete"] = function (id) {
        var new_api_host = this.routerParam(this.api_host, id.toString());
        return this.httpClient["delete"](new_api_host, this.httpOptions);
    };
    StatusEcomService.prototype.update = function (id, item) {
        var new_api_host = this.routerParam(this.api_host, id.toString());
        return this.httpClient.put(new_api_host, item, this.httpOptions);
    };
    StatusEcomService.prototype.getOneById = function (id) {
        var new_api_host = this.routerParam(this.api_host, id.toString());
        return this.httpClient.get(new_api_host, this.httpOptions);
    };
    StatusEcomService.prototype.routerParam = function (host, param) {
        return host + "/" + param;
    };
    StatusEcomService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], StatusEcomService);
    return StatusEcomService;
}());
exports.StatusEcomService = StatusEcomService;
