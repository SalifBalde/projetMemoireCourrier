"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LivraisonComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var LivraisonComponent = /** @class */ (function () {
    function LivraisonComponent(colisService, fb, router, messageService, confirmationService) {
        this.colisService = colisService;
        this.fb = fb;
        this.router = router;
        this.messageService = messageService;
        this.confirmationService = confirmationService;
        this.montant = 0;
        this.colis$ = [];
        this.loadingColis = false;
        this.selectedColis = null;
        this.displayDialog = false;
        this.montantTotal = 0;
        this.payer = false;
        this.selectedColisForDeletion = new Set();
        this.allSelected = false;
    }
    LivraisonComponent.prototype.ngOnInit = function () {
        this.buildForm();
        this.getAllColis();
    };
    LivraisonComponent.prototype.buildForm = function () {
        this.form = this.fb.group({
            dateDebut: [undefined, forms_1.Validators.required],
            dateFin: [undefined, forms_1.Validators.required]
        });
    };
    LivraisonComponent.prototype.getAllColis = function () {
        var _this = this;
        this.loadingColis = true;
        this.colisService.findAll().subscribe(function (result) {
            _this.colis$ = result;
            _this.montant = _this.colis$.reduce(function (sum, item) { return sum + Number(item.montant || 0); }, 0);
            _this.loadingColis = false;
        }, function (error) {
            console.error('Erreur lors de la récupération des colis:', error);
            _this.loadingColis = false;
        });
    };
    LivraisonComponent.prototype.voirColis = function (colis) {
        this.selectedColis = colis;
        this.calculerMontantTotal();
        this.payer = colis.payer;
        console.log('payer:', this.payer);
        this.displayDialog = true;
    };
    LivraisonComponent.prototype.calculerMontantTotal = function () {
        if (this.selectedColis) {
            var fraisEnlevement = Number(this.selectedColis.fraisEnlevement) || 0;
            var fraisLivraison = Number(this.selectedColis.fraisLivraison) || 0;
            var montant = Number(this.selectedColis.montant) || 0;
            this.montantTotal = fraisEnlevement + fraisLivraison + montant;
        }
    };
    LivraisonComponent.prototype.Livrer = function () {
        var _this = this;
        if (this.selectedColis) {
            this.colisService.livrer(this.selectedColis.id.toString(), this.selectedColis).subscribe(function (response) {
                console.log('Colis livré avec succès', response);
                _this.displayDialog = false;
                _this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Le colis a été livré avec succès.'
                });
                setTimeout(function () {
                    location.reload();
                }, 1000);
            }, function (error) {
                console.error('Erreur lors de la livraison du colis', error);
                _this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Une erreur est survenue lors de la livraison du colis.'
                });
            });
        }
        else {
            console.error('Aucun colis sélectionné');
            this.messageService.add({
                severity: 'warn',
                summary: 'Avertissement',
                detail: 'Aucun colis sélectionné pour la livraison.'
            });
        }
    };
    LivraisonComponent.prototype.supprimerSelection = function () {
        var _this = this;
        if (this.selectedColisForDeletion.size === 0) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Avertissement',
                detail: 'Aucun colis sélectionné pour la suppression.'
            });
            return;
        }
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir supprimer ces colis ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: function () {
                _this.selectedColisForDeletion.forEach(function (colis) {
                    _this.colisService["delete"](colis.id.toString()).subscribe(function () {
                        console.log("le colis " + colis.code + " vient d'etre supprimer avec succes");
                        _this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: "Le colis " + colis.code + " a \u00E9t\u00E9 supprim\u00E9."
                        });
                        _this.getAllColis();
                    }, function (error) {
                        console.error("Erreur lors du suppression du colis " + colis.code, error);
                        _this.messageService.add({
                            severity: 'error',
                            summary: 'Erreur',
                            detail: "Error lors de la supreesion du colis " + colis.code
                        });
                    });
                });
                _this.selectedColisForDeletion.clear();
            },
            reject: function () {
                _this.messageService.add({
                    severity: 'info',
                    summary: 'Annulé',
                    detail: 'Suppression annulée.'
                });
            }
        });
    };
    LivraisonComponent.prototype.toggleSelection = function (colis) {
        if (this.selectedColisForDeletion.has(colis)) {
            this.selectedColisForDeletion["delete"](colis);
        }
        else {
            this.selectedColisForDeletion.add(colis);
        }
        console.log('Colis sélectionnés pour suppression:', Array.from(this.selectedColisForDeletion).map(function (c) { return c.id; }));
    };
    LivraisonComponent.prototype.selectAll = function (event) {
        var _this = this;
        if (event.checked) {
            this.colis$.forEach(function (colis) { return _this.selectedColisForDeletion.add(colis); });
        }
        else {
            this.selectedColisForDeletion.clear();
        }
        this.allSelected = event.checked;
    };
    LivraisonComponent.prototype.onRowSelect = function (event) {
        var colis = event.data;
        this.toggleSelection(colis);
    };
    LivraisonComponent.prototype.onRowUnselect = function (event) {
        var colis = event.data;
        this.selectedColisForDeletion["delete"](colis);
        console.log("Row Unselected: ", colis);
    };
    LivraisonComponent = __decorate([
        core_1.Component({
            selector: 'app-livraison',
            templateUrl: './livraison.component.html'
        })
    ], LivraisonComponent);
    return LivraisonComponent;
}());
exports.LivraisonComponent = LivraisonComponent;
