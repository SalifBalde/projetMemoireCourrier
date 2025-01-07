"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LivraisonEcomComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var api_1 = require("primeng/api");
var LivraisonEcomComponent = /** @class */ (function () {
    function LivraisonEcomComponent(fb, sessionService, router, messageService, confirmationService, ecommerceService, modePaiementService, cdr) {
        this.fb = fb;
        this.sessionService = sessionService;
        this.router = router;
        this.messageService = messageService;
        this.confirmationService = confirmationService;
        this.ecommerceService = ecommerceService;
        this.modePaiementService = modePaiementService;
        this.cdr = cdr;
        this.montant = 0;
        this.ecommerce$ = [];
        this.loadingEcommerce = false;
        this.selectedEcommerce = null;
        this.displayDialog = false;
        this.montantTotal = 0;
        this.payer = false;
        this.isModalOpen = false;
        this.mode$ = [];
        this.selectedEcommerceForDeletion = new Set();
        this.selectedModePaiement = null;
        this.allSelected = false;
        this.events1 = [];
        this.loading = false;
    }
    LivraisonEcomComponent.prototype.ngOnInit = function () {
        this.buildForm();
        this.getAllEcommerceALivrer();
    };
    LivraisonEcomComponent.prototype.buildForm = function () {
        this.form = this.fb.group({
            dateDebut: [undefined, forms_1.Validators.required],
            dateFin: [undefined, forms_1.Validators.required]
        });
    };
    LivraisonEcomComponent.prototype.getAllEcommerceALivrer = function () {
        var _this = this;
        this.loading = true;
        this.ecommerceService.findEcommerceALivrer(1).subscribe(function (result) {
            console.log(result);
            _this.loading = false;
            if (result && result.length > 0) {
                _this.ecommerce$ = result;
                _this.cdr.detectChanges();
            }
            else {
                _this.messageService.add({ severity: 'info', summary: 'Pas d\'envoie', detail: 'Aucun envoie à livrer' });
            }
        }, function (error) {
            _this.loading = false;
            console.error('Erreur lors du chargement des ecommerces', error);
            _this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not load ecommerce data.' });
        });
    };
    LivraisonEcomComponent.prototype.voirEcommerce = function (ecommerce) {
        this.selectedEcommerce = ecommerce;
        this.payer = ecommerce.payer;
        this.displayDialog = true;
    };
    LivraisonEcomComponent.prototype.livrer = function () {
        var _this = this;
        if (!this.selectedEcommerce) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Avertissement',
                detail: 'Aucun envoi e-commerce sélectionné pour la livraison.'
            });
            return;
        }
        if (!this.selectedEcommerce.payer) {
            this.selectedEcommerce.payer = true;
        }
        this.ecommerceService.livrer(this.selectedEcommerce.id).subscribe(function (result) {
            _this.displayDialog = false;
            _this.messageService.add({
                severity: 'success',
                summary: 'Succès',
                detail: 'L\'envoi ecommerce a été livré avec succès.'
            });
            setTimeout(function () {
                if (result && result.id) {
                    _this.router.navigateByUrl('/guichet/livraisonDetails/' + result.id);
                }
            }, 500);
            _this.selectedEcommerce = null;
        }, function (error) {
            console.error('Erreur lors de la mise à jour de l\'envoie ecommerce', error);
            _this.messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: 'Une erreur est survenue lors de la mise à jour de l\'envoie ecommerce.'
            });
        });
    };
    LivraisonEcomComponent.prototype.toggleSelection = function (ecommerce) {
        if (this.selectedEcommerceForDeletion.has(ecommerce)) {
            this.selectedEcommerceForDeletion["delete"](ecommerce);
        }
        else {
            this.selectedEcommerceForDeletion.add(ecommerce);
        }
        this.allSelected = this.selectedEcommerceForDeletion.size === this.ecommerce$.length;
    };
    LivraisonEcomComponent.prototype.selectAll = function (event) {
        var _this = this;
        if (event.checked) {
            this.ecommerce$.forEach(function (ecommerce) { return _this.selectedEcommerceForDeletion.add(ecommerce); });
        }
        else {
            this.selectedEcommerceForDeletion.clear();
        }
        this.allSelected = event.checked;
    };
    LivraisonEcomComponent.prototype.onRowSelect = function (event) {
        var ecommerce = event.data;
        this.selectedEcommerceForDeletion.add(ecommerce);
        console.log('Row Selected:', ecommerce);
        this.allSelected = this.selectedEcommerceForDeletion.size === this.ecommerce$.length;
    };
    LivraisonEcomComponent.prototype.onRowUnselect = function (event) {
        var ecommerce = event.data;
        this.selectedEcommerceForDeletion["delete"](ecommerce);
        console.log('Row Unselected:', ecommerce);
        this.allSelected = this.selectedEcommerceForDeletion.size === this.ecommerce$.length;
    };
    LivraisonEcomComponent = __decorate([
        core_1.Component({
            selector: 'app-livraison-ecom',
            templateUrl: './livraison-ecom.component.html',
            providers: [api_1.ConfirmationService]
        })
    ], LivraisonEcomComponent);
    return LivraisonEcomComponent;
}());
exports.LivraisonEcomComponent = LivraisonEcomComponent;
