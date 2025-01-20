"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.RapportCriteresComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var api_1 = require("primeng/api");
var RapportCriteresComponent = /** @class */ (function () {
    function RapportCriteresComponent(courrierService, pdfService, fb, router, statutCourrierService, tyoeCourrierService, structureService, paysService, route, messageService, keycloak) {
        this.courrierService = courrierService;
        this.pdfService = pdfService;
        this.fb = fb;
        this.router = router;
        this.statutCourrierService = statutCourrierService;
        this.tyoeCourrierService = tyoeCourrierService;
        this.structureService = structureService;
        this.paysService = paysService;
        this.route = route;
        this.messageService = messageService;
        this.keycloak = keycloak;
        this.isModalOpen = false;
        this.montant = 0;
        this.courrier$ = [];
        this.courrierSearch = {};
        this.formDialog = false;
        this.cols = [];
        this.rowsPerPageOptions = [5, 10, 20];
        this.id = "";
        this.structure$ = [];
        this.pays$ = [];
        this.typeCourrier$ = [];
        this.statutCourrier$ = [];
        this.loadingcourrier = false;
        this.loadingReset = false;
    }
    RapportCriteresComponent.prototype.resetForm = function () {
        var _this = this;
        this.loadingReset = true;
        setTimeout(function () {
            _this.loadingReset = false;
        }, 1000);
        this.buildForm();
    };
    RapportCriteresComponent.prototype.generatePdf = function () {
        // this.pdfService.generateAgentSalesReport(this.courrier$);
    };
    RapportCriteresComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                this.buildForm();
                this.setCourrier();
                return [2 /*return*/];
            });
        });
    };
    RapportCriteresComponent.prototype.buildForm = function () {
        this.form = this.fb.group({
            debut: [this.courrierSearch.debut ? new Date(this.courrierSearch.debut) : new Date(), forms_1.Validators.required],
            fin: [this.courrierSearch.fin ? new Date(this.courrierSearch.fin) : new Date(), forms_1.Validators.required],
            structureDestinationId: [null],
            structureDepotId: [null],
            typeCourrierId: [null],
            statutCourrierId: [null],
            paysOrigineId: [null],
            paysDestinationId: [null]
        });
    };
    RapportCriteresComponent.prototype.setCourrier = function () {
        var _this = this;
        this.statutCourrierService.findAll().subscribe(function (result) {
            _this.statutCourrier$ = result;
        });
        this.tyoeCourrierService.findAll().subscribe(function (result) {
            _this.typeCourrier$ = result;
        });
        this.structureService.findAll().subscribe(function (result) {
            _this.structure$ = result;
        });
        this.paysService.findAll().subscribe(function (result) {
            _this.pays$ = result;
        });
    };
    RapportCriteresComponent.prototype.searchcourrierByCriteres = function () {
        var _this = this;
        this.loadingcourrier = true;
        setTimeout(function () {
            _this.loadingcourrier = false;
        }, 1000);
        this.courrierService.findCourrierByCriteres(this.form.value).subscribe(function (courrier) {
            _this.courrier$ = courrier;
            _this.montant = _this.courrier$.reduce(function (sum, item) { return sum + Number(item.montant); }, 10);
        });
    };
    RapportCriteresComponent.prototype.isEmpty = function () {
        return !this.form.value.debut && !this.form.value.fin &&
            !this.form.value.structureDepotId && !this.form.value.structureDestinationId &&
            !this.form.value.typeCourrierId && !this.form.value.statutCourrierId && !this.form.value.paysOrigineId && !this.form.value.paysDestinationId;
    };
    __decorate([
        core_1.ViewChild('dt')
    ], RapportCriteresComponent.prototype, "dt");
    RapportCriteresComponent = __decorate([
        core_1.Component({
            selector: 'app-rapport-criteres',
            templateUrl: './rapport-criteres.component.html',
            providers: [api_1.MessageService]
        })
    ], RapportCriteresComponent);
    return RapportCriteresComponent;
}());
exports.RapportCriteresComponent = RapportCriteresComponent;
