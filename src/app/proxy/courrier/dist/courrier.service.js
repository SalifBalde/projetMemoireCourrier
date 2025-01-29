"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CourrierService = void 0;
var environment_1 = require("src/environments/environment");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var CourrierService = /** @class */ (function () {
    function CourrierService(httpClient) {
        this.httpClient = httpClient;
        this.apiName = 'courrier';
        this.api_host = environment_1.environment.api_host + this.apiName;
        this.myToken = sessionStorage.getItem("token");
        this.httpOptions = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }
    CourrierService.prototype.findAll = function () {
        return this.httpClient.get(this.api_host, this.httpOptions);
    };
    CourrierService.prototype.getAllDestinataires = function (clientId, destinationId) {
        var new_api_host = this.routerParam(this.api_host, 'client', clientId, 'destination', destinationId);
        return this.httpClient.get(new_api_host, this.httpOptions);
    };
    CourrierService.prototype.save = function (item) {
        return this.httpClient.post(this.api_host, item, this.httpOptions);
    };
    CourrierService.prototype.savePaquet = function (item) {
        return this.httpClient.post(this.api_host + '/savecourrier', item, this.httpOptions);
    };
    CourrierService.prototype["delete"] = function (id) {
        var new_api_host = this.routerParam(this.api_host, id);
        return this.httpClient["delete"](new_api_host, this.httpOptions);
    };
    CourrierService.prototype.update = function (id, item) {
        var new_api_host = this.routerParam(this.api_host);
        return this.httpClient.put(new_api_host + id, item, this.httpOptions);
    };
    CourrierService.prototype.livraison = function (id, item) {
        var new_api_host = this.routerParam(this.api_host, 'livraison', id);
        return this.httpClient.put(new_api_host, item, this.httpOptions);
    };
    // Méthode pour mettre à jour plusieurs courriers
    CourrierService.prototype.findCourrierByAgent = function (search) {
        var new_api_host = this.routerParam(this.api_host, 'searchByAgent');
        return this.httpClient.post(new_api_host, search, this.httpOptions);
    };
    CourrierService.prototype.updateCourrier = function (courriers) {
        var url = environment_1.environment.api_host + "courrier/updatetaxeDouanier";
        return this.httpClient.put(url, courriers, this.httpOptions);
    };
    CourrierService.prototype.getOneById = function (id) {
        var new_api_host = this.routerParam(this.api_host, id);
        return this.httpClient.get(new_api_host, this.httpOptions);
    };
    CourrierService.prototype.updateCourriers = function (courriers) {
        var url = environment_1.environment.api_host + "courrier/update";
        return this.httpClient.put(url, courriers, this.httpOptions);
    };
    CourrierService.prototype.findCourrierByCriteres = function (search) {
        var new_api_host = this.routerParam(this.api_host, 'search-by-criteria');
        return this.httpClient.post(new_api_host, search, this.httpOptions);
    };
    CourrierService.prototype.getOne = function (id) {
        var new_api_host = this.routerParam(this.api_host + '/getByreference', id);
        return this.httpClient.get(new_api_host, this.httpOptions);
    };
    CourrierService.prototype.findCourrierByStrutureDepot = function (idStrut) {
        return this.httpClient.get(this.api_host + '/structureDepot/' + idStrut, this.httpOptions);
    };
    CourrierService.prototype.findCourrierByTypeCourrierAndStructureDepotAndIdStut = function (idType, idStructureDepot, idStatut) {
        var new_api_host = this.routerParam(this.api_host, 'by-type', idType, idStructureDepot, idStatut);
        return this.httpClient.get(new_api_host, this.httpOptions);
    };
    CourrierService.prototype.findCourrierByStrutureDepotAndStatutId = function (idStrut, idStatutCourrier) {
        return this.httpClient.get(this.api_host + '/byStructureDestinationAndStatut/' + idStrut + '/' + idStatutCourrier, this.httpOptions);
    };
    CourrierService.prototype.findCourrierByStrutureDestinationAndStatutIdAndTypeCourrier = function (idStrut, idStatutCourrier, typeCourrierId) {
        return this.httpClient.get(this.api_host + '/byStructureDestinationAndStatutandTypeCourrier/' + idStrut + '/' + idStatutCourrier + '/' + typeCourrierId, this.httpOptions);
    };
    CourrierService.prototype.findCourrierByStructureDepotAndStatutIds = function (structureId, idtypeCourrier, statutIds) {
        var params = {
            structureId: structureId,
            idtypeCourrier: idtypeCourrier,
            statutIds: statutIds.join(',')
        };
        return this.httpClient.get(this.api_host + '/courriers', { params: params });
    };
    CourrierService.prototype.findCourrierByStructureDepotAndStatutIdsAndPaysOrigi = function (structureId, idtypeCourrier, statutIds, paysOrigineId) {
        var params = {
            structureId: structureId,
            idtypeCourrier: idtypeCourrier,
            paysOrigineId: paysOrigineId,
            statutIds: statutIds
        };
        return this.httpClient.get(this.api_host + '/courriersInterieur', { params: params });
    };
    CourrierService.prototype.findByStructureDestinationIdAndStatutCourrierIdAndTypeCourrierIdIn = function (structureDestinationId, typeCourrierIds, idStatutCourrier) {
        var params = {
            structureId: structureDestinationId,
            typeCourrierIds: typeCourrierIds.join(','),
            idStatutCourrier: idStatutCourrier
        };
        return this.httpClient.get(this.api_host + "/searchCourriersImport", { params: params });
    };
    CourrierService.prototype.routerParam = function (baseUrl) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return baseUrl + "/" + params.join('/');
    };
    CourrierService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CourrierService);
    return CourrierService;
}());
exports.CourrierService = CourrierService;
