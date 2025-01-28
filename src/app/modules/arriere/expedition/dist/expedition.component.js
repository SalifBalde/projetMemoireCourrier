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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ExpeditionComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var api_1 = require("primeng/api");
var ExpeditionComponent = /** @class */ (function () {
    function ExpeditionComponent(colisService, expeditionService, pdfService, sessionService, fb, router, route, structureService, courrierService, messageService, fermetureService, statutCourrierService) {
        this.colisService = colisService;
        this.expeditionService = expeditionService;
        this.pdfService = pdfService;
        this.sessionService = sessionService;
        this.fb = fb;
        this.router = router;
        this.route = route;
        this.structureService = structureService;
        this.courrierService = courrierService;
        this.messageService = messageService;
        this.fermetureService = fermetureService;
        this.statutCourrierService = statutCourrierService;
        this.isModalOpen = false;
        this.montant = 0;
        //colis$: ColisDto[] = [];
        this.cols = [];
        this.rowsPerPageOptions = [5, 10, 20];
        this.id = "";
        this.expedition = {};
        this.courriersReceptions = [];
        this.courries = {};
        this.openCourrierDialog = false;
        this.openNumExpDialog = false;
        this.loading = false;
        this.courrier = {};
        var currentYear = new Date().getFullYear();
        this.currentYearLastTwoDigits = currentYear.toString().slice(-2); // Prendre les 2 derniers chiffres
    }
    ExpeditionComponent.prototype.load = function () {
        var _this = this;
        this.loading = true;
        setTimeout(function () {
            _this.loading = false;
        }, 2000);
    };
    ExpeditionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.structureService.findAll().subscribe(function (result) {
            _this.structure$ = result;
            var idRecherche = 16;
            console.log(_this.structure$);
            _this.structure$ = result.filter(function (structure) { return structure.id === idRecherche; });
            console.log(_this.structure$);
        }, function (error) {
            console.error("Erreur lors de la récupération des structures :", error);
        });
        this.getCourriers();
        this.buildForm();
        // this.clearList()
        this.getStructureById();
        this.getAllSatutCourrier();
    };
    ExpeditionComponent.prototype.getAllSatutCourrier = function () {
        var _this = this;
        this.statutCourrierService.findAll().subscribe(function (data) {
            _this.statutCourrier = data;
            console.log(_this.statutCourrier);
            _this.idStatutFermetureCourrier = _this.statutCourrier = data.filter(function (statut) { return statut.id === 3; });
            console.log(_this.idStatutFermetureCourrier); // Afficher les résultats filtrés
        });
    };
    ExpeditionComponent.prototype.getStructureById = function () {
        var _this = this;
        this.structureService.getOne(this.sessionService.getAgentAttributes().structureId.toString()).subscribe(function (data) {
            _this.structure = data;
            console.log(_this.structure.code);
        });
    };
    ExpeditionComponent.prototype.getBadgeSeverity = function (statutCourrier) {
        switch (statutCourrier === null || statutCourrier === void 0 ? void 0 : statutCourrier.toLowerCase()) {
            case 'déposé': return 'danger'; // Rouge
            case 'reçu': return 'success'; // Vert
            default: return 'info'; // Bleu
        }
    };
    ExpeditionComponent.prototype.openDialog = function (courrie) {
        if (this.selectedColis.length > 0) {
            this.openNumExpDialog = true;
        }
        this.courrier = __assign({}, courrie);
        console.log(courrie);
        console.log(this.selectedColis);
    };
    ExpeditionComponent.prototype.openDialog1 = function (courrie) {
        console.log(this.structure.code + this.numeroDepech + this.currentYearLastTwoDigits);
        this.openCourrierDialog = true;
        this.courrier = __assign({}, courrie);
        console.log(courrie);
        console.log(this.selectedColis);
        this.openNumExpDialog = false;
    };
    ExpeditionComponent.prototype.buildForm = function () {
        this.form = this.fb.group({
            bureauDestination: [undefined, forms_1.Validators.required]
        });
    };
    ExpeditionComponent.prototype.isExpeditionDisabled = function () {
        return !this.selectedStructure;
    };
    ExpeditionComponent.prototype.mapIdsToColis = function (ids) {
        return ids.map(function (id) { return ({ colisId: id.id }); });
    };
    ExpeditionComponent.prototype.confirmReception = function () {
        // Appeler la méthode saveFermeture pour enregistrer la fermeture
        this.saveFermetureCourrier();
        this.selectedColis = []; // Réinitialiser la sélection après l'enregistrement
        this.openCourrierDialog = false;
    };
    ExpeditionComponent.prototype.getCourriers = function () {
        var _this = this;
        var idType = "1";
        var idStatu = '2';
        var idStructureDepo = this.sessionService.getAgentAttributes().structureId.toString();
        this.courrierService.findCourrierByTypeCourrierAndStructureDepotAndIdStut(idType, idStructureDepo, idStatu).subscribe(function (result) {
            _this.listeCourriers = result;
            console.log(_this.listeCourriers);
        });
    };
    ExpeditionComponent.prototype.saveFermetureCourrier = function () {
        var _this = this;
        var _a;
        try {
            var structureDepotId = Number(this.sessionService.getAgentAttributes().structureId);
            var numeroDepeche = "" + this.structure.code + this.numeroDepech + this.currentYearLastTwoDigits;
            console.log(numeroDepeche);
            // Vérification des colis sélectionnés
            if (!this.selectedColis || this.selectedColis.length === 0) {
                this.messageService.add({
                    severity: 'warn',
                    summary: 'Attention',
                    detail: 'Veuillez sélectionner au moins un colis.',
                    life: 3000
                });
                return;
            }
            // Préparation des données pour l'enregistrement
            this.fermetureData = {
                structureDepotId: structureDepotId,
                structureDestinationId: this.selectedStructure,
                numeroDepeche: numeroDepeche,
                date: new Date().toISOString(),
                userId: 1,
                idStatutCourrier: (_a = this.idStatutFermetureCourrier[0]) === null || _a === void 0 ? void 0 : _a.id,
                fermetureCourriers: this.selectedColis.map(function (colis) { return ({
                    courrierId: colis.id
                }); })
            };
            var selectedColisCopy_1 = __spreadArrays(this.selectedColis);
            console.log(this.fermetureData); // Copie défensive
            // Appel au service pour enregistrer la fermeture
            this.fermetureService.saveFermeture(this.fermetureData).subscribe(function (response) {
                // Mise à jour des courriers après la fermeture
                selectedColisCopy_1.forEach(function (colis) {
                    var _a;
                    var courrieId = colis.id.toString();
                    colis.statutCourrier.id = (_a = _this.idStatutFermetureCourrier[0]) === null || _a === void 0 ? void 0 : _a.id;
                    _this.courrierService.update(courrieId, colis).subscribe(function () {
                        _this.getCourriers();
                    }, function (error) {
                        console.error("Erreur lors de la mise \u00E0 jour du colis " + colis.id + ":", error);
                    });
                });
                _this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Colis expédié avec succès.',
                    life: 3000
                });
            }, function (error) {
                console.error('Erreur lors de l\'enregistrement de la fermeture:', error);
                _this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Une erreur s\'est produite lors de l\'enregistrement de la fermeture.',
                    life: 3000
                });
            });
        }
        catch (error) {
            console.error('Erreur inattendue:', error);
            this.messageService.add({
                severity: 'error',
                summary: 'Erreur inattendue',
                detail: 'Veuillez contacter l\'administrateur.',
                life: 3000
            });
        }
    };
    __decorate([
        core_1.ViewChild('dt')
    ], ExpeditionComponent.prototype, "dt");
    ExpeditionComponent = __decorate([
        core_1.Component({
            selector: 'app-expedition',
            templateUrl: './expedition.component.html',
            providers: [api_1.MessageService]
        })
    ], ExpeditionComponent);
    return ExpeditionComponent;
}());
exports.ExpeditionComponent = ExpeditionComponent;
