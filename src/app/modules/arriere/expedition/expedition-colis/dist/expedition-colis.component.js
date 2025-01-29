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
exports.ExpeditionColisComponent = void 0;
var core_1 = require("@angular/core");
var api_1 = require("primeng/api");
var forms_1 = require("@angular/forms");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var ExpeditionColisComponent = /** @class */ (function () {
    function ExpeditionColisComponent(colisService, expeditionService, pdfService, sessionService, fb, router, route, structureService, messageService, noeuxService, achemeniService, courrierService, bureauxDouanier, fermetureService, statutCourrierService, suiviCourrier) {
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
        this.openNumExpDialog = false;
        this.openCourrierDialog = false;
        this.courrier = {};
        this.suiviCourriers = {};
        this.showMontantField = false;
        this.montants = null;
        this.loading = false;
        var currentYear = new Date().getFullYear();
        this.currentYearLastTwoDigits = currentYear.toString().slice(-2); // Prendre les 2 derniers chiffres
    }
    ExpeditionColisComponent.prototype.load = function () {
        var _this = this;
        this.loading = true;
        setTimeout(function () {
            _this.loading = false;
        }, 2000);
    };
    ExpeditionColisComponent.prototype.ngOnInit = function () {
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
        this.buildForm();
        this.getAllNoeux();
        this.getStructureById();
        this.getAllSatutCourrier();
        this.getCourrierByStructureDepotAndStatutIds();
        this.iduser = (_a = this.sessionService.getAgentAttributes()) === null || _a === void 0 ? void 0 : _a.id;
        console.log(this.iduser);
    };
    ExpeditionColisComponent.prototype.getStructureById = function () {
        var _this = this;
        this.structureService.getOne(this.sessionService.getAgentAttributes().structureId.toString()).subscribe(function (data) {
            _this.structure = data;
            console.log(_this.structure.code);
        });
    };
    ExpeditionColisComponent.prototype.buildForm = function () {
        this.form = this.fb.group({
            bureauDestination: [undefined, forms_1.Validators.required]
        });
    };
    ExpeditionColisComponent.prototype.getCourrierByStructureDepotAndStatutIds = function () {
        var _this = this;
        var statutIds = 19;
        var structureDestination = Number(this.sessionService.getAgentAttributes().structureId);
        // console.log(structureDestination)// Statut IDs sous forme de nombres
        var typecourrier = 2;
        var paysOrigineId = 210;
        this.courrierService.findCourrierByStructureDepotAndStatutIdsAndPaysOrigi(structureDestination, typecourrier, statutIds, paysOrigineId).subscribe(function (result) {
            _this.listcourriers = result;
            console.log(_this.listcourriers);
        }, function (error) {
            console.error('Erreur lors de la récupération des courriers:', error);
        });
    };
    ExpeditionColisComponent.prototype.getAllSatutCourrier = function () {
        var _this = this;
        this.statutCourrierService.findAll().subscribe(function (data) {
            _this.statutCourrier = data;
            console.log(_this.statutCourrier);
            _this.idStatutFermetureCourrier = _this.statutCourrier = data.filter(function (statut) { return statut.id === 21; });
            console.log(_this.idStatutFermetureCourrier); // Afficher les résultats filtrés
        });
    };
    ExpeditionColisComponent.prototype.onStructureChange = function () {
        var _this = this;
        if (this.selectedStructure) {
            this.bureauxDouanier.isStructureDouaniere(this.selectedStructure).subscribe({
                next: function (isDouanier) {
                    _this.showMontantField = !isDouanier;
                    if (isDouanier) {
                        _this.montants = null; // Réinitialise le champ montant si douanier
                    }
                },
                error: function () {
                    _this.messageService.add({
                        severity: 'error',
                        summary: 'Erreur',
                        detail: 'Une erreur est survenue lors de la vérification de la structure.'
                    });
                }
            });
        }
        else {
            this.showMontantField = false;
            this.montants = null; // Réinitialiser si aucune structure n'est sélectionnée
        }
    };
    ExpeditionColisComponent.prototype.getBadgeSeverity = function (statutLibelle) {
        switch (statutLibelle === null || statutLibelle === void 0 ? void 0 : statutLibelle.toLowerCase()) {
            case 'reexpédier':
                return 'danger'; // Rouge pour "reexpédier"
            // case 'reçu bureau':
            //     return 'success'; // Vert pour "Reçu bureau"
            case 'en transit':
                return 'info'; // Bleu pour "En transit"
            default:
                return 'secondary'; // Gris pour les autres statuts
        }
    };
    ExpeditionColisComponent.prototype.getAllNoeux = function () {
        var _this = this;
        this.noeuxService.findAll().subscribe(function (result) {
            _this.listnoeux = result;
            console.log(_this.listnoeux);
        });
    };
    ExpeditionColisComponent.prototype.getAcheminByIdNoeux = function () {
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
    ExpeditionColisComponent.prototype.openDialog1 = function (courrier) {
        console.log(this.structure.code + this.numeroDepech + this.currentYearLastTwoDigits);
        this.openCourrierDialog = true;
        this.courrier = __assign({}, courrier);
        console.log(courrier);
        console.log(this.selectedColis);
        this.openNumExpDialog = false;
    };
    ExpeditionColisComponent.prototype.openDialog = function (courrier) {
        if (this.selectedColis.length > 0) {
            this.openNumExpDialog = true;
        }
        this.courrier = __assign({}, courrier);
        console.log(courrier);
        console.log(this.selectedColis);
    };
    ExpeditionColisComponent.prototype.isExpeditionDisabled = function () {
        return !this.selectedStructure;
    };
    ExpeditionColisComponent.prototype.confirmReception = function () {
        this.saveFermetureCourrier();
        this.selectedColis = []; // Réinitialiser la sélection après l'enregistrement
        this.openCourrierDialog = false;
    };
    ExpeditionColisComponent.prototype.saveFermetureCourrier = function () {
        var _this = this;
        try {
            for (var _i = 0, _a = this.selectedColis; _i < _a.length; _i++) {
                var courri = _a[_i];
                console.log(typeof (courri.statutCourrier.id));
                if (courri.statutCourrier.id === 19) { // Utilisez '===' pour une comparaison stricte
                    this.idStatutFermetureCourrier = 21;
                }
                else {
                    this.idStatutFermetureCourrier = 16;
                }
            }
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
                idstatutCourrier: this.idStatutFermetureCourrier,
                fermetureCourriers: this.selectedColis.map(function (colis) { return ({
                    courrierId: colis.id
                }); })
            };
            console.log(this.fermetureData);
            var selectedColisCopy_2 = __spreadArrays(this.selectedColis);
            for (var _b = 0, selectedColisCopy_1 = selectedColisCopy_2; _b < selectedColisCopy_1.length; _b++) {
                var courri = selectedColisCopy_1[_b];
                console.log(typeof (courri.statutCourrier.id));
                if (courri.statutCourrier.id === 19) { // Utilisez '===' pour une comparaison stricte
                    this.idStatutFermetureCourrier = 21;
                }
                else {
                    this.idStatutFermetureCourrier = 16;
                }
            } // Copie défensive
            console.log(selectedColisCopy_2);
            // Appel au service pour enregistrer la fermeture
            this.fermetureService.saveFermetureImport(this.fermetureData).subscribe(function (response) {
                // Mise à jour des courriers et ajout des suivis
                selectedColisCopy_2.forEach(function (colis) {
                    var courrieId = colis.id;
                    colis.statutCourrier.id = _this.idStatutFermetureCourrier;
                    colis.structureDestinationId = _this.selectedStructure;
                    colis.taxeDouane = colis.montantTaxeDouane;
                    console.log(courrieId, colis);
                    // Mise à jour du courrier
                    _this.courrierService.update(courrieId, colis).subscribe(function () {
                        _this.getCourrierByStructureDepotAndStatutIds();
                        _this.selectedStructure = null;
                        _this.numeroDepech = null;
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
    ], ExpeditionColisComponent.prototype, "dt");
    ExpeditionColisComponent = __decorate([
        core_1.Component({
            selector: 'app-expedition-colis',
            templateUrl: './expedition-colis.component.html',
            styleUrl: './expedition-colis.component.scss',
            providers: [api_1.MessageService]
        })
    ], ExpeditionColisComponent);
    return ExpeditionColisComponent;
}());
exports.ExpeditionColisComponent = ExpeditionColisComponent;
