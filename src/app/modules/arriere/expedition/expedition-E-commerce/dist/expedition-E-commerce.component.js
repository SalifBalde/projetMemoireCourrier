"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ExpeditionECommerceComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var api_1 = require("primeng/api");
// interface Structure {
//     id: number;
//     nom: string;
//     adresse?: string;
// }
var ExpeditionECommerceComponent = /** @class */ (function () {
    function ExpeditionECommerceComponent(sessionService, fb, router, structureService, messageService, ecommerceService, expeditionEcomService) {
        this.sessionService = sessionService;
        this.fb = fb;
        this.router = router;
        this.structureService = structureService;
        this.messageService = messageService;
        this.ecommerceService = ecommerceService;
        this.expeditionEcomService = expeditionEcomService;
        this.structure$ = [];
        this.openCourrierDialog = false;
        this.openNumExpDialog = false;
        this.loading = false;
        this.selectedStructure = null;
        this.selectedEcommerce = [];
    }
    ExpeditionECommerceComponent.prototype.ngOnInit = function () {
        this.initializeForm();
        this.loadStructures();
        this.getAllEcommerceByStatut();
    };
    ExpeditionECommerceComponent.prototype.initializeForm = function () {
        this.form = this.fb.group({
            bureauDestination: ['', forms_1.Validators.required]
        });
    };
    ExpeditionECommerceComponent.prototype.loadStructures = function () {
        var _this = this;
        // Chargement des structures disponibles, filtrage sur celles avec l'id 16
        this.structureService.findAll().subscribe(function (result) {
            _this.structure$ = result.filter(function (structure) { return +structure.id === 16; });
        }, function (error) {
            console.error('Error loading structures', error);
        });
    };
    // private loadStructures() {
    //     // Simulating data instead of fetching from a service
    //     this.structure$ = [
    //         { id: 1, nom: 'Structure A', adresse: 'Adresse A' },
    //         { id: 2, nom: 'Structure B', adresse: 'Adresse B' },
    //         { id: 3, nom: 'Structure C', adresse: 'Adresse C' },
    //     ];
    // }
    ExpeditionECommerceComponent.prototype.buildForm = function () {
        this.form = this.fb.group({
            bureauDestination: [undefined, forms_1.Validators.required]
        });
    };
    ExpeditionECommerceComponent.prototype.saveExpedition = function () {
        var _this = this;
        if (this.form.invalid) {
            return;
        }
        this.form.value.details = this.mapIdsToEcommerce(this.selectedEcommerce);
        this.form.value.bureauExpediteur = 1;
        this.expeditionEcomService.save(this.form.value).subscribe(function (result) {
            //this.getAllEcommerce();
            _this.expedition = result;
            _this.router.navigateByUrl('/arriere/details-expeditionEcom/' + _this.expedition.id);
            _this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Envoi ecommerce expédié avec succés',
                life: 3000
            });
        }, function (error) {
            _this.messageService.add({
                severity: 'danger',
                summary: 'Error',
                detail: 'Erreur enregistrement',
                life: 3000
            });
        });
    };
    ExpeditionECommerceComponent.prototype.onSelectEcommerce = function (ecommerce) {
        if (this.selectedEcommerce.includes(ecommerce)) {
            this.selectedEcommerce = this.selectedEcommerce.filter(function (item) { return item !== ecommerce; });
        }
        else {
            this.selectedEcommerce.push(ecommerce);
        }
    };
    ExpeditionECommerceComponent.prototype.getAllEcommerceByStatut = function () {
        var _this = this;
        this.loading = true;
        var id = '3';
        var bureauId = Number(this.sessionService.getAgentAttributes().structureId);
        // const bureauId: number = Number(1);
        if (isNaN(bureauId)) {
            this.loading = false;
            return;
        }
        this.ecommerceService.findEcommerceByStatus(id, bureauId).subscribe(function (data) {
            _this.ecommerce$ = data;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
            console.error('Erreur de chargement des données', error);
        });
    };
    ExpeditionECommerceComponent.prototype.mapIdsToEcommerce = function (selectedEcommerce) {
        return selectedEcommerce.map(function (ecommerce) { return ({
            ecommerceId: ecommerce.id,
            ecommerceNumenvoie: ecommerce.numenvoi,
            ecommerceNomClient: ecommerce.nomClient,
            ecommercePrenomClient: ecommerce.prenomClient,
            ecommerceIdbureau: ecommerce.idbureau,
            valider: true
        }); });
    };
    __decorate([
        core_1.ViewChild('dt')
    ], ExpeditionECommerceComponent.prototype, "dt");
    ExpeditionECommerceComponent = __decorate([
        core_1.Component({
            selector: 'app-expedition-e-commerce',
            templateUrl: './expedition-e-commerce.component.html',
            providers: [api_1.MessageService]
        })
    ], ExpeditionECommerceComponent);
    return ExpeditionECommerceComponent;
}());
exports.ExpeditionECommerceComponent = ExpeditionECommerceComponent;
