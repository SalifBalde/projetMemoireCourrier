"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RapportEcomComponent = void 0;
var core_1 = require("@angular/core");
var api_1 = require("primeng/api");
var RapportEcomComponent = /** @class */ (function () {
    function RapportEcomComponent(pdfService, fb, ecommerceService, structureService, partenaireEComService, statusEcomService, messageService) {
        this.pdfService = pdfService;
        this.fb = fb;
        this.ecommerceService = ecommerceService;
        this.structureService = structureService;
        this.partenaireEComService = partenaireEComService;
        this.statusEcomService = statusEcomService;
        this.messageService = messageService;
        this.ecommerce$ = [];
        this.partenaire$ = [];
        this.status$ = [];
        this.structure$ = [];
        this.loading = false;
        this.loadingReset = false;
    }
    RapportEcomComponent.prototype.ngOnInit = function () {
        this.buildForm();
        this.loadInitialData();
    };
    RapportEcomComponent.prototype.buildForm = function () {
        this.form = this.fb.group({
            IdbureauPartenaire: [null],
            idbureau: [null],
            partenaire_e_com_id: [null],
            etatEcomId: [null]
        });
    };
    RapportEcomComponent.prototype.loadInitialData = function () {
        var _this = this;
        this.partenaireEComService.findAll().subscribe(function (result) { return _this.partenaire$ = result; });
        this.ecommerceService.findAll().subscribe(function (result) { return _this.ecommerce$ = result; });
        this.statusEcomService.findAll().subscribe(function (result) { return _this.status$ = result; });
        this.structureService.findAll().subscribe(function (result) { return _this.structure$ = result; });
    };
    RapportEcomComponent.prototype.searchExpeditionByCriteres = function () {
        var _this = this;
        this.loading = true;
        var formattedCriteria = __assign({}, this.form.value);
        this.ecommerceService.findEcommerceByCriteres(formattedCriteria).subscribe({
            next: function (ecommerce) {
                if (ecommerce.length > 0) {
                    _this.ecommerce$ = ecommerce || [];
                    _this.ecommerce$.reduce(function (sum, item) { return sum + Number(item.id); }, 0);
                }
                else {
                    _this.messageService.add({
                        severity: 'info',
                        summary: 'Aucun résultat',
                        detail: 'Aucun colis trouvé pour la période sélectionnée.'
                    });
                    _this.ecommerce$ = [];
                }
                _this.loading = false;
            },
            error: function (err) {
                _this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Une erreur est survenue lors de la récupération des données.'
                });
                _this.loading = false;
            }
        });
    };
    RapportEcomComponent.prototype.resetForm = function () {
        var _this = this;
        this.loadingReset = true;
        setTimeout(function () {
            _this.loadingReset = false;
            _this.buildForm();
        }, 1000);
    };
    RapportEcomComponent.prototype.isEmpty = function () {
        return !this.form.value.IdbureauPartenaire && !this.form.value.idbureau &&
            !this.form.value.partenaire_e_com_id && !this.form.value.etatEcomId;
    };
    __decorate([
        core_1.ViewChild('dt')
    ], RapportEcomComponent.prototype, "dt");
    RapportEcomComponent = __decorate([
        core_1.Component({
            selector: 'app-rapport-ecom',
            templateUrl: './rapport-ecom.component.html',
            providers: [api_1.MessageService]
        })
    ], RapportEcomComponent);
    return RapportEcomComponent;
}());
exports.RapportEcomComponent = RapportEcomComponent;
