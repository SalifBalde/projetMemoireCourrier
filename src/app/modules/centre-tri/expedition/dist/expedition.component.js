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
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var ExpeditionComponent = /** @class */ (function () {
    function ExpeditionComponent(colisService, expeditionService, pdfService, sessionService, fb, router, route, structureService, messageService, noeuxService, achemeniService, courrierService, bureauxDouanier, fermetureService, statutCourrierService, suiviCourrier) {
        this.colisService = colisService;
        this.expeditionService = expeditionService;
        this.pdfService = pdfService;
        this.sessionService = sessionService;
        this.fb = fb;
        this.router = router;
        this.route = route;
        this.structureService = structureService;
        this.messageService = messageService;
        this.noeuxService = noeuxService;
        this.achemeniService = achemeniService;
        this.courrierService = courrierService;
        this.bureauxDouanier = bureauxDouanier;
        this.fermetureService = fermetureService;
        this.statutCourrierService = statutCourrierService;
        this.suiviCourrier = suiviCourrier;
        this.isModalOpen = false;
        this.montant = 0;
        //colis$: ColisDto[] = [];
        this.cols = [];
        this.rowsPerPageOptions = [5, 10, 20];
        this.id = "";
        this.expedition = {};
        this.listAchemin = [];
        this.showMontantField = false; // Control visibility of montant field
        this.montants = null;
        this.openNumExpDialog = false;
        this.openCourrierDialog = false;
        this.courrier = {};
        this.suiviCourriers = {};
        this.loading = false;
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
        var _a;
        console.log(this.sessionService.getAgentAttributes().structureId.toString());
        this.noeuxService.findNoeuxByIdstruct(this.sessionService.getAgentAttributes().structureId.toString()).subscribe(function (result) {
            _this.Bestnoeux = result;
            console.log(_this.Bestnoeux);
            _this.getAcheminByIdNoeux();
        });
        this.structureService.findAll().subscribe(function (result) {
            _this.structure$ = result;
        });
        this.getCourriers();
        this.buildForm();
        this.getAllNoeux();
        this.getAllCourrier();
        this.getStructureById();
        this.getAllSatutCourrier();
        this.iduser = (_a = this.sessionService.getAgentAttributes()) === null || _a === void 0 ? void 0 : _a.id;
        console.log(this.iduser);
    };
    ExpeditionComponent.prototype.getStructureById = function () {
        var _this = this;
        this.structureService.getOne(this.sessionService.getAgentAttributes().structureId.toString()).subscribe(function (data) {
            _this.structure = data;
            console.log(_this.structure.code);
        });
    };
    ExpeditionComponent.prototype.buildForm = function () {
        this.form = this.fb.group({
            bureauDestination: [undefined, forms_1.Validators.required]
        });
    };
    ExpeditionComponent.prototype.getAllCourrier = function () {
        var _this = this;
        var idstatut = "16";
        this.courrierService.findCourrierByStrutureDepotAndStatutId(this.sessionService.getAgentAttributes().structureId.toString(), idstatut).subscribe(function (result) {
            _this.listcourriers = result;
            console.log(_this.listcourriers);
        });
    };
    ExpeditionComponent.prototype.getAllSatutCourrier = function () {
        var _this = this;
        this.statutCourrierService.findAll().subscribe(function (data) {
            _this.statutCourrier = data;
            console.log(_this.statutCourrier);
            _this.idStatutFermetureCourrier = _this.statutCourrier = data.filter(function (statut) { return statut.id === 21; });
            console.log(_this.idStatutFermetureCourrier); // Afficher les résultats filtrés
        });
    };
    ExpeditionComponent.prototype.getCourriers = function () {
        var _this = this;
        var idStatu = '16';
        var idStructureDepo = this.sessionService.getAgentAttributes().structureId.toString();
        this.courrierService.findCourrierByStrutureDepotAndStatutId(idStructureDepo, idStatu).subscribe(function (result) {
            _this.listeCourriers = result;
            console.log(_this.listeCourriers);
        });
    };
    ExpeditionComponent.prototype.getBadgeSeverity = function (statutCourrier) {
        switch (statutCourrier === null || statutCourrier === void 0 ? void 0 : statutCourrier.toLowerCase()) {
            // case 'déposé': return 'danger';  // Rouge
            case 'Reçu CT':
                return 'success'; // Vert
            default:
                return 'success'; // Bleu
        }
    };
    ExpeditionComponent.prototype.getAllNoeux = function () {
        var _this = this;
        this.noeuxService.findAll().subscribe(function (result) {
            _this.listnoeux = result;
            console.log(_this.listnoeux);
        });
    };
    ExpeditionComponent.prototype.getAcheminByIdNoeux = function () {
        var _this = this;
        var _a;
        console.log((_a = this.Bestnoeux) === null || _a === void 0 ? void 0 : _a.id);
        this.achemeniService.findById(this.Bestnoeux.id).subscribe(function (result) {
            console.log(result);
            var structureId = _this.sessionService.getAgentAttributes().structureId;
            // Créez un tableau de promesses pour attendre toutes les requêtes asynchrones
            var structureRequests = result
                .filter(function (achemine) { return (achemine === null || achemine === void 0 ? void 0 : achemine.structureId.toString()) !== structureId; }) // Filtrer les éléments avant de créer les observables
                .map(function (achemine) {
                console.log(achemine === null || achemine === void 0 ? void 0 : achemine.structureId);
                return _this.structureService.getOne(achemine === null || achemine === void 0 ? void 0 : achemine.structureId.toString()).pipe(
                // Utilisez "map" pour ajouter le libellé à l'acheminement
                operators_1.map(function (structure) {
                    achemine.libelle = structure.libelle;
                    console.log(achemine); // Affichez l'acheminement mis à jour
                    return achemine;
                }));
            });
            // Attendez que toutes les requêtes se terminent
            rxjs_1.forkJoin(structureRequests).subscribe(function (updatedAcheminements) {
                // Mettez à jour la liste des acheminements avec ceux dont le libellé est maintenant défini
                _this.listAchemin = updatedAcheminements;
                console.log(_this.listAchemin); // Affichez la liste mise à jour
            }, function (error) {
                console.error('Erreur lors de la récupération des structures:', error);
            });
        }, function (error) {
            console.error('Erreur lors de la récupération des acheminements:', error);
        });
    };
    ExpeditionComponent.prototype.openDialog1 = function (courrier) {
        console.log(this.structure.code + this.numeroDepech + this.currentYearLastTwoDigits);
        this.openCourrierDialog = true;
        this.courrier = __assign({}, courrier);
        console.log(courrier);
        console.log(this.selectedColis);
        this.openNumExpDialog = false;
    };
    ExpeditionComponent.prototype.openDialog = function (courrier) {
        if (this.selectedColis.length > 0) {
            this.openNumExpDialog = true;
        }
        this.courrier = __assign({}, courrier);
        console.log(courrier);
        console.log(this.selectedColis);
    };
    ExpeditionComponent.prototype.isExpeditionDisabled = function () {
        return !this.selectedStructure;
    };
    ExpeditionComponent.prototype.mapIdsToColis = function (ids) {
        return ids.map(function (id) { return ({ colisId: id.id }); });
    };
    // Handle structure change
    // onStructureChange(structureId: number): void {
    //     if (structureId) {
    //         this.bureauxDouanier.isStructureDouaniere(structureId).subscribe({
    //             next: (isDouanier) => {
    //                 this.showMontantField = isDouanier;
    //                 if (!isDouanier) {
    //                     this.montant = null; // Reset montant if not douanier
    //                 }
    //             },
    //             error: (err) => {
    //                 this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur est survenue.' });
    //             },
    //         });
    //     } else {
    //         this.showMontantField = false;
    //         this.montant = null; // Reset montant if no structure selected
    //     }
    //
    //
    // }
    ExpeditionComponent.prototype.confirmReception = function () {
        this.saveFermetureCourrier();
        this.selectedColis = []; // Réinitialiser la sélection après l'enregistrement
        this.openCourrierDialog = false;
    };
    ExpeditionComponent.prototype.saveFermetureCourrier = function () {
        var _this = this;
        var _a;
        try {
            var structureDepotId_1 = Number(this.sessionService.getAgentAttributes().structureId);
            var numeroDepeche = "" + this.structure.code + this.numeroDepech + this.currentYearLastTwoDigits;
            console.log(numeroDepeche);
            console.log(this.selectedStructure);
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
                structureDepotId: structureDepotId_1,
                structureDestinationId: this.selectedStructure,
                numeroDepeche: numeroDepeche,
                date: new Date().toISOString(),
                userId: this.iduser,
                idstatutCourrier: (_a = this.idStatutFermetureCourrier[0]) === null || _a === void 0 ? void 0 : _a.id,
                fermetureCourriers: this.selectedColis.map(function (colis) { return ({
                    courrierId: colis.id
                }); })
            };
            console.log(this.fermetureData);
            var selectedColisCopy_1 = __spreadArrays(this.selectedColis); // Copie défensive
            console.log(selectedColisCopy_1);
            // Appel au service pour enregistrer la fermeture
            this.fermetureService.saveFermeture(this.fermetureData).subscribe(function (response) {
                // Mise à jour des courriers et ajout des suivis
                selectedColisCopy_1.forEach(function (colis) {
                    var courrieId = colis.id;
                    colis.statutCourrier = _this.idStatutFermetureCourrier[0];
                    colis.structureDestinationId = _this.selectedStructure;
                    console.log(courrieId, colis);
                    // Mise à jour du courrier
                    _this.courrierService.update(courrieId, colis).subscribe(function () {
                        _this.getAllCourrier();
                        // Ajout du suivi pour chaque courrier après mise à jour
                        var suiviCourrier = {
                            courrierId: colis.id,
                            idstatutCourrier: colis.statutCourrier.id,
                            userId: _this.iduser,
                            structureDepotId: structureDepotId_1,
                            structureDestinationId: _this.selectedStructure,
                            date: new Date().toISOString()
                        };
                        _this.suiviCourrier.save(suiviCourrier).subscribe(function (data) {
                            // console.log("Suivi courrier sauvegardé : ", data);
                        }, function (error) {
                            console.error("Erreur lors de la sauvegarde du suivi : ", error);
                        });
                        // Rafraîchir la liste des courriers
                    }, function (error) {
                        console.error("Erreur lors de la mise \u00E0 jour du colis " + colis.id + ":", error);
                    });
                });
                _this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Courrier expédié avec succès.',
                    life: 3000
                });
                // Message de succès
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
