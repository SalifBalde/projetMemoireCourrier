"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PartenaireEComService = void 0;
var environment_1 = require("src/environments/environment");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var PartenaireEComService = /** @class */ (function () {
    function PartenaireEComService(httpClient) {
        this.httpClient = httpClient;
        this.apiName = 'partenaire_e_com';
        this.api_host = environment_1.environment.api_ecom + this.apiName;
        this.myToken = sessionStorage.getItem("token");
        this.httpOptions = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + this.myToken
            })
        };
    }
    PartenaireEComService.prototype.findAll = function () {
        return this.httpClient.get(this.api_host, this.httpOptions);
    };
    PartenaireEComService.prototype.save = function (item) {
        return this.httpClient.post(this.api_host, item, this.httpOptions);
    };
    PartenaireEComService.prototype["delete"] = function (id) {
        var new_api_host = this.routerParam(this.api_host, id);
        return this.httpClient["delete"](new_api_host, this.httpOptions);
    };
    PartenaireEComService.prototype.update = function (id, item) {
        var new_api_host = this.routerParam(this.api_host, id);
        return this.httpClient.put(new_api_host, item, this.httpOptions);
    };
    PartenaireEComService.prototype.getOneById = function (id) {
        var new_api_host = this.routerParam(this.api_host, id);
        return this.httpClient.get(new_api_host, this.httpOptions);
    };
    PartenaireEComService.prototype.getAllByStructure = function (id) {
        var new_api_host = this.routerParam(this.api_host + '/getAllByStructure', id);
        return this.httpClient.get(new_api_host, this.httpOptions);
    };
    PartenaireEComService.prototype.getOne = function (id) {
        var new_api_host = this.routerParam(this.api_host + '/getByreference', id);
        return this.httpClient.get(new_api_host, this.httpOptions);
    };
    PartenaireEComService.prototype.routerParam = function (host, param) {
        return host + "/" + param;
    };
    PartenaireEComService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], PartenaireEComService);
    return PartenaireEComService;
}());
exports.PartenaireEComService = PartenaireEComService;
