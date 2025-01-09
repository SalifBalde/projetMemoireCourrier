"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ExpeditionEcomService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var environment_1 = require("src/environments/environment");
var ExpeditionEcomService = /** @class */ (function () {
    function ExpeditionEcomService(httpClient) {
        this.httpClient = httpClient;
        this.apiName = 'expedition_ecom';
        this.api_host = environment_1.environment.api_ecom + this.apiName;
        this.myToken = sessionStorage.getItem('token');
        this.httpOptions = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: "Bearer " + this.myToken
            })
        };
    }
    ExpeditionEcomService.prototype.findAll = function () {
        return this.httpClient.get(this.api_host, this.httpOptions);
    };
    ExpeditionEcomService.prototype.getOne = function (id) {
        var new_api_host = this.routerParam(this.api_host, id);
        return this.httpClient.get(new_api_host, this.httpOptions);
    };
    ExpeditionEcomService.prototype.getAllByStrucuture = function (id) {
        var new_api_host = this.routerParam(this.api_host + '/getAllByStructure', id);
        return this.httpClient.get(new_api_host, this.httpOptions);
    };
    ExpeditionEcomService.prototype.findExpeditionByCriteres = function (search) {
        var new_api_host = this.routerParam(this.api_host, 'search-by-criteria');
        return this.httpClient.post(new_api_host, search, this.httpOptions);
    };
    ExpeditionEcomService.prototype.save = function (item) {
        return this.httpClient.post(this.api_host, item, this.httpOptions);
    };
    ExpeditionEcomService.prototype.update = function (id, item) {
        var new_api_host = this.routerParam(this.api_host, id);
        return this.httpClient.put(new_api_host, item, this.httpOptions);
    };
    ExpeditionEcomService.prototype["delete"] = function (id) {
        var new_api_host = this.routerParam(this.api_host, id);
        return this.httpClient["delete"](new_api_host, this.httpOptions);
    };
    ExpeditionEcomService.prototype.updateExpeditions = function (expeditions) {
        var url = environment_1.environment.api_host + "expedition_ecom/update";
        return this.httpClient.put(url, expeditions, this.httpOptions);
    };
    ExpeditionEcomService.prototype.routerParam = function (baseUrl) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return baseUrl + "/" + params.join('/');
    };
    ExpeditionEcomService.prototype.findExpeditionByStructureAndStatus = function (idStructure, idStatut) {
        var new_api_host = this.routerParam(this.api_host, 'structure', idStructure, 'statut', idStatut);
        return this.httpClient.get(new_api_host, this.httpOptions);
    };
    ExpeditionEcomService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ExpeditionEcomService);
    return ExpeditionEcomService;
}());
exports.ExpeditionEcomService = ExpeditionEcomService;
