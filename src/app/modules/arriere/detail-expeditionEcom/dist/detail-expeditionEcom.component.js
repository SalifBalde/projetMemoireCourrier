"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DetailExpeditionEcomComponent = void 0;
var core_1 = require("@angular/core");
var api_1 = require("primeng/api");
var DetailExpeditionEcomComponent = /** @class */ (function () {
    function DetailExpeditionEcomComponent(expeditionEcomService, pdfService, fb, router, route) {
        this.expeditionEcomService = expeditionEcomService;
        this.pdfService = pdfService;
        this.fb = fb;
        this.router = router;
        this.route = route;
        this.expeditionEcom = null;
        this.isModalOpen = false;
        this.events1 = [];
    }
    DetailExpeditionEcomComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            var id = params['id'];
            _this.expeditionEcomService.getOne(id).subscribe(function (expeditionEcom) {
                _this.expeditionEcom = expeditionEcom;
                console.log('ExpeditionEcom data loaded:', _this.expeditionEcom); // Affichage des données dans la console
            });
        });
    };
    DetailExpeditionEcomComponent.prototype.openDialog = function () {
        this.isModalOpen = true;
        this.events1 = [
            { status: 'Ordered', date: '15/10/2020 10:30', icon: api_1.PrimeIcons.SHOPPING_CART, color: '#9C27B0', image: 'game-controller.jpg' },
            { status: 'Processing', date: '15/10/2020 14:00', icon: api_1.PrimeIcons.COG, color: '#673AB7' },
            { status: 'Shipped', date: '15/10/2020 16:15', icon: api_1.PrimeIcons.ENVELOPE, color: '#FF9800' },
            { status: 'Delivered', date: '16/10/2020 10:00', icon: api_1.PrimeIcons.CHECK, color: '#607D8B' }
        ];
    };
    DetailExpeditionEcomComponent.prototype.generatePdf = function () {
        // this.pdfService.generatePDF(this.expedition); 
    };
    DetailExpeditionEcomComponent = __decorate([
        core_1.Component({
            selector: 'app-detail-expeditionEcom',
            templateUrl: './detail-expeditionEcom.component.html'
        })
    ], DetailExpeditionEcomComponent);
    return DetailExpeditionEcomComponent;
}());
exports.DetailExpeditionEcomComponent = DetailExpeditionEcomComponent;
