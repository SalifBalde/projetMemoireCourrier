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
exports.ReceptionECommerceComponent = void 0;
var core_1 = require("@angular/core");
var api_1 = require("primeng/api");
var forms_1 = require("@angular/forms");
var ReceptionECommerceComponent = /** @class */ (function () {
    function ReceptionECommerceComponent(sessionService, fb, router, structureService, messageService, ecommerceService, expeditionEcomService) {
        this.sessionService = sessionService;
        this.fb = fb;
        this.router = router;
        this.structureService = structureService;
        this.messageService = messageService;
        this.ecommerceService = ecommerceService;
        this.expeditionEcomService = expeditionEcomService;
        this.isModalOpen = false;
        this.montant = 0;
        this.cols = [];
        this.rowsPerPageOptions = [5, 10, 20];
        this.id = "";
        this.structure$ = [];
        this.ecommerce$ = [];
        this.ecommerce = null;
        this.openEcommerceDialog = false;
        this.loading = false;
    }
    ReceptionECommerceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.structureService.findAll().subscribe(function (result) {
            _this.structure$ = result;
        });
        this.getAllEcommerceByDestinationReception();
        this.buildForm();
    };
    ReceptionECommerceComponent.prototype.buildForm = function () {
        this.form = this.fb.group({
            bureauDestinataireId: [undefined, forms_1.Validators.required]
        });
    };
    ReceptionECommerceComponent.prototype.getAllEcommerceByDestinationReception = function () {
        var _this = this;
        this.loading = true;
        var structureId = Number(this.sessionService.getAgentAttributes().structureId);
        this.ecommerceService.findEcommerceByDestinationReception(structureId).subscribe(function (result) {
            console.log(result);
            _this.loading = false;
            _this.ecommerce$ = result;
        });
    };
    ReceptionECommerceComponent.prototype.openDialog = function (ecommerce) {
        this.openEcommerceDialog = true;
        this.ecommerce = __assign({}, ecommerce);
    };
    ReceptionECommerceComponent.prototype.confirmReception = function () {
        var _this = this;
        this.openEcommerceDialog = false;
        if (this.ecommerce) {
            this.ecommerceService
                .reception(this.ecommerce.id.toString(), this.sessionService.getAgentAttributes().structureId.toString())
                .subscribe(function () { return _this.getAllEcommerceByDestinationReception(); });
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'envoi Deleted',
                life: 3000
            });
            this.ecommerce = null;
        }
        else {
            this.messageService.add({
                severity: 'warn',
                summary: 'Données manquantes',
                detail: 'Aucun envoi sélectionné.',
                life: 3000
            });
        }
    };
    ReceptionECommerceComponent.prototype.saveReception = function () {
        var _this = this;
        if (this.form.invalid) {
            return;
        }
        this.ecommerceService.save(this.form.value).subscribe(function (result) {
            _this.getAllEcommerceByDestinationReception();
            _this.messageService.add({
                severity: 'success',
                summary: 'Succès',
                detail: 'Envoi expédié avec succès',
                life: 3000
            });
        }, function (error) {
            _this.messageService.add({
                severity: 'danger',
                summary: 'Erreur',
                detail: 'Erreur d\'enregistrement',
                life: 3000
            });
        });
    };
    __decorate([
        core_1.ViewChild('dt')
    ], ReceptionECommerceComponent.prototype, "dt");
    ReceptionECommerceComponent = __decorate([
        core_1.Component({
            selector: 'app-reception-e-commerce',
            templateUrl: './reception-e-commerce.component.html',
            providers: [api_1.MessageService]
        })
    ], ReceptionECommerceComponent);
    return ReceptionECommerceComponent;
}());
exports.ReceptionECommerceComponent = ReceptionECommerceComponent;
