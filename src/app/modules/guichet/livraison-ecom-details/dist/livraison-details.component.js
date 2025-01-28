"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LivraisonDetailsComponent = void 0;
var core_1 = require("@angular/core");
var LivraisonDetailsComponent = /** @class */ (function () {
    function LivraisonDetailsComponent(ecommerceService, pdfService, fb, router, route) {
        this.ecommerceService = ecommerceService;
        this.pdfService = pdfService;
        this.fb = fb;
        this.router = router;
        this.route = route;
        this.ecommerce = {};
        this.isModalOpen = false;
        this.events1 = [];
    }
    LivraisonDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            var id = params["id"];
            //   this.updateTimeline();
            _this.ecommerceService.getOne(id).subscribe(function (ecommerce) {
                _this.ecommerce = ecommerce;
            });
        });
    };
    LivraisonDetailsComponent.prototype.getStatusColor = function (statusLibelle) {
        var colors = {
            'En Instance': '#03A9F4',
            'Enleve': '#4CAF50',
            'Expedié': '#FFC107',
            'traitement en cours': '#FFC107',
            'reception bureau': '#9C27B0',
            'Livré': '#4CAF50'
        };
        return colors[statusLibelle] || '#FFC107';
    };
    LivraisonDetailsComponent.prototype.getNormalizedStatus = function (statusLibelle) {
        var specialStatuses = ['En Instance', 'Enleve', 'Expedié', 'Livré'];
        return specialStatuses.includes(statusLibelle) ? statusLibelle : 'Traitement en cours';
    };
    LivraisonDetailsComponent.prototype.openDialog = function () {
        this.isModalOpen = true;
        // this.updateTimeline();
    };
    //   updateTimeline() {
    //     if (!this.ecommerce || !this.ecommerce.suivisColisList) return;
    //     this.events1 = this.ecommerce.suivisColisList.map((suivi, index) => {
    //       const status = this.getNormalizedStatus(this.ecommerce.etatEcomId.toString());
    //       return {
    //         status: status,
    //         color: this.getStatusColor(status),
    //         date: suivi.createdAt, // Assuming `createdAt` exists in `suivi`
    //         agent: suivi.agent, // Assuming `agent` exists in `suivi`
    //         isActive: index === this.ecommerce.suivisColisList.length - 1 // Mark the last one as active
    //       };
    //     });
    //   }
    LivraisonDetailsComponent.prototype.generatePdf = function () {
        this.pdfService.generatePDF(this.ecommerce); // Assuming `ecommerce` is correct for PDF generation
    };
    LivraisonDetailsComponent = __decorate([
        core_1.Component({
            selector: "app-livraison-details",
            templateUrl: "./livraison-details.component.html"
        })
    ], LivraisonDetailsComponent);
    return LivraisonDetailsComponent;
}());
exports.LivraisonDetailsComponent = LivraisonDetailsComponent;
