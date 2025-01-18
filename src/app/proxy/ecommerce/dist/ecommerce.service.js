"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EcommerceService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var environment_1 = require("src/environments/environment");
var EcommerceService = /** @class */ (function () {
    function EcommerceService(httpClient) {
        this.httpClient = httpClient;
        this.apiName = 'ecommerce';
        this.api_host = environment_1.environment.api_ecom + this.apiName;
        this.myToken = sessionStorage.getItem("token");
        this.httpOptions = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.myToken
            })
        };
    }
    EcommerceService.prototype.findAll = function () {
        return this.httpClient.get(this.api_host, this.httpOptions);
    };
    EcommerceService.prototype.getOne = function (id) {
        var new_api_host = this.routerParam(this.api_host, id);
        return this.httpClient.get(new_api_host, this.httpOptions);
    };
    EcommerceService.prototype.findEcommerceByStatus = function (id, bureauId) {
        var url = this.routerParam(this.api_host, 'findEcommerceByStatus', id, bureauId.toString());
        return this.httpClient.post(url, this.httpOptions);
    };
    EcommerceService.prototype.findEcommerceByDestinationReception = function (id) {
        var new_api_host = this.routerParam(this.api_host, 'findEcommerceByDestinationReception', id.toString());
        return this.httpClient.get(new_api_host, this.httpOptions);
    };
    EcommerceService.prototype.findEcommerceFromReceptionToExpedition = function (id) {
        var new_api_host = this.routerParam(this.api_host, 'findEcommerceFromReceptionToExpedition', id.toString());
        return this.httpClient.get(new_api_host, this.httpOptions);
    };
    EcommerceService.prototype.findEcommerceALivrer = function (id) {
        var new_api_host = this.routerParam(this.api_host, 'findEcommerceALivrer', id.toString());
        return this.httpClient.get(new_api_host, this.httpOptions);
    };
    EcommerceService.prototype.livrer = function (id) {
        var url = this.api_host + "/livrerEnvoieEcommerce/" + id;
        return this.httpClient.put(url, {}, this.httpOptions);
    };
    EcommerceService.prototype.findEcommerceReceptionCt = function () {
        var new_api_host = this.routerParam(this.api_host, 'findEcommerceReceptionCt');
        return this.httpClient.get(new_api_host, this.httpOptions);
    };
    EcommerceService.prototype.findEcommerceExpeditionCt = function () {
        var new_api_host = this.routerParam(this.api_host, 'findEcommerceExpeditionCt');
        return this.httpClient.get(new_api_host, this.httpOptions);
    };
    EcommerceService.prototype.findEcommerceByCriteres = function (search) {
        var new_api_host = this.routerParam(this.api_host, 'rechercheParCritere');
        return this.httpClient.post(new_api_host, search, this.httpOptions);
    };
    EcommerceService.prototype.reception = function (id, idStructure) {
        var new_api_host = this.routerParam(this.api_host + '/reception', id, idStructure);
        return this.httpClient.get(new_api_host, this.httpOptions);
    };
    EcommerceService.prototype.save = function (item) {
        return this.httpClient.post(this.api_host, item, this.httpOptions);
    };
    EcommerceService.prototype.update = function (id, item) {
        var new_api_host = this.routerParam(this.api_host, id);
        return this.httpClient.put(new_api_host, item, this.httpOptions);
    };
    EcommerceService.prototype["delete"] = function (id) {
        var new_api_host = this.routerParam(this.api_host, id);
        return this.httpClient["delete"](new_api_host, this.httpOptions);
    };
    EcommerceService.prototype.routerParam = function (baseUrl) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return baseUrl + "/" + params.join('/');
    };
    EcommerceService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], EcommerceService);
    return EcommerceService;
}());
exports.EcommerceService = EcommerceService;
