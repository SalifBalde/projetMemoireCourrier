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
exports.Cn22Service = void 0;
var core_1 = require("@angular/core");
var jspdf_1 = require("jspdf");
require("jspdf-autotable");
var jsbarcode_1 = require("jsbarcode");
var Cn22Service = /** @class */ (function () {
    function Cn22Service() {
    }
    Cn22Service.prototype.createPDF = function (data) {
        return __awaiter(this, void 0, Promise, function () {
            var doc, pageHeight, pageWidth, fileName;
            return __generator(this, function (_a) {
                doc = new jspdf_1["default"]({ format: 'a4', orientation: 'p' });
                pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
                pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
                console.log(pageHeight + ',' + pageWidth);
                this.addHeader(doc, pageWidth, data);
                this.addRecipientInfo(doc, pageWidth, data);
                this.addSenderInfo(doc, pageWidth, data);
                this.addDetails(doc, pageWidth, data);
                this.totals(doc, pageWidth, data);
                this.addFooter(doc, pageWidth, data);
                this.drawLines(doc);
                fileName = "Facture_CN23.pdf";
                doc.save(fileName);
                return [2 /*return*/];
            });
        });
    };
    Cn22Service.prototype.addHeader = function (doc, pageWidth, data) {
        var barcodeCanvas = document.createElement('canvas');
        jsbarcode_1["default"](barcodeCanvas, "" + data.codeBarre, {
            format: 'CODE128',
            displayValue: false,
            width: 1,
            height: 47
        });
        var barcodeImage = barcodeCanvas.toDataURL('image/png');
        doc.addImage(barcodeImage, 'PNG', 8, 9, 170, 30); // Déplace légèrement à gauche
        doc.setFontSize(12);
        doc.text(" " + data.codeBarre, pageWidth / 2.4, 39, { align: 'center' });
        doc.setFontSize(22);
        doc.text('CUSTUM', pageWidth / 7.6, 49, { align: 'center' });
        doc.text('DECLARATION', pageWidth / 5.4, 59, { align: 'center' });
        doc.setFontSize(15);
        doc.text('May be opened', pageWidth / 1.7, 47, { align: 'right' });
        doc.text('officialy', pageWidth / 2.4, 53, { align: 'left' });
        doc.setFontSize(42);
        doc.text('CN', pageWidth / 1.5, 58, { align: 'center' });
        doc.text('22', pageWidth / 1.3, 58, { align: 'center' });
    };
    Cn22Service.prototype.addRecipientInfo = function (doc, pageWidth, data) {
        doc.setFontSize(18);
        doc.text('Designated operator', pageWidth / 5.2, 72, { align: 'center' });
        doc.setFontSize(23);
        doc.text("" + data.paysOrigineLibelle, pageWidth / 4.3, 83, { align: 'center' });
        doc.setFontSize(15);
        doc.text('Gift', pageWidth / 9, 96, { align: 'center' });
        doc.text('Documents', pageWidth / 6.4, 104, { align: 'center' });
        doc.text('Sales of goods', pageWidth / 5.7, 112, { align: 'center' });
        doc.text('     Commercial sample', pageWidth / 2.1, 96, { align: 'center' });
        doc.text('   Returns goods', pageWidth / 2.2, 104, { align: 'center' });
        doc.text('      Other :', pageWidth / 2.5, 112, { align: 'center' });
    };
    Cn22Service.prototype.addSenderInfo = function (doc, pageWidth, data) {
        doc.text('Quantity and detailed', pageWidth / 5.7, 122, { align: 'center' });
        doc.text('description of content', pageWidth / 5.7, 129, { align: 'center' });
        doc.text('Net', pageWidth / 2.8, 122, { align: 'center' });
        doc.text('  Weight', pageWidth / 2.7, 129, { align: 'center' });
        doc.text('Value and ', pageWidth / 1.9, 122, { align: 'center' });
        doc.text('Currency', pageWidth / 1.9, 129, { align: 'center' });
        doc.text('HS tariff   ', pageWidth / 1.5, 122, { align: 'center' });
        doc.text('Number  ', pageWidth / 1.5, 129, { align: 'center' });
        doc.text('Country', pageWidth / 1.3, 122, { align: 'center' });
        doc.text('of origin', pageWidth / 1.3, 129, { align: 'center' });
    };
    Cn22Service.prototype.addDetails = function (doc, pageWidth, data) {
        var yPosition = 142;
        var montant = 5.00;
        var weight = 0;
        var totalWeight = 0;
        var totalValue = 0;
        if (data) {
            doc.text('', pageWidth / 5.7, yPosition, { align: 'center' });
            if (data.contenus && data.contenus.length > 0) {
                data.contenus.forEach(function (contenu) {
                    var itemMontant = contenu.quantite * contenu.valeur;
                    var weight = contenu.poids || 0;
                    var quantity = contenu.quantite || 0;
                    var description = contenu.description || "null";
                    doc.text("" + description, pageWidth / 5.3, yPosition, { align: 'center' });
                    doc.text("" + quantity, pageWidth / 17, yPosition, { align: 'center' });
                    doc.text(weight + " g", pageWidth / 2.6, yPosition, { align: 'center' });
                    doc.text(itemMontant + " XOF", pageWidth / 1.9, yPosition, { align: 'center' });
                    totalValue += itemMontant;
                    totalWeight += weight;
                    yPosition += 7;
                });
            }
            else {
                doc.text(montant + " XOF", pageWidth / 1.9, yPosition, { align: 'center' });
            }
            doc.text('', pageWidth / 1.6, yPosition, { align: 'center' });
            // let destinationText = doc.splitTextToSize(`${data.paysDestinationLibelle}`, pageWidth / 4);
            // doc.text(destinationText, pageWidth / 1.3, yPosition, { align: 'center' });
        }
        else {
            doc.setFontSize(9);
            doc.text('No details available.', 10, yPosition);
        }
        doc.setFont('helvetica', 'bold');
        // doc.text(`${data.poids}`, pageWidth / 2.5, 227, { align: 'center' });
        doc.setFont('helvetica', 'bold');
        doc.text(totalWeight + " g", pageWidth / 2.5, 227, { align: 'center' });
        doc.text(totalValue + " XOF", pageWidth / 1.9, 227, { align: 'center' });
    };
    Cn22Service.prototype.totals = function (doc, pageWidth, data) {
        doc.setFont('helvetica', 'italic');
        doc.text('Total weight (in kg)', pageWidth / 5.7, 231, { align: 'center' });
    };
    Cn22Service.prototype.addFooter = function (doc, pageWidth, data) {
        doc.setFont('helvetica');
        doc.setFontSize(12);
        doc.text("            I, the undersigned, whose name and address are given on the item, certify that\n         the particulars given in this declaration are correct and that this item does not\n         contain any dangerous article or articlesprohibited by legislation or by postal\n         regulation\n          ", pageWidth / 170, 247, { align: 'left' });
        doc.text("Date and sender's signature", pageWidth / 4.8, 283, { align: 'center' });
        doc.text("" + data.createdAt, pageWidth / 4.8, 288, { align: 'center' });
    };
    Cn22Service.prototype.drawLines = function (doc) {
        doc.setLineWidth(0.4);
        // Horizontal lines
        doc.line(10, 7, 175, 7);
        doc.line(10, 40, 175, 40);
        doc.line(10, 40, 175, 40);
        doc.line(10, 65, 175, 65);
        doc.line(10, 90, 175, 90);
        doc.line(10, 115, 175, 115);
        doc.line(100, 113, 172, 113);
        doc.line(10, 135, 175, 135);
        doc.line(10, 220, 175, 220);
        doc.line(10, 240, 175, 240);
        doc.line(10, 295, 175, 295);
        doc.line(98, 285, 165, 285);
        // Boxes
        doc.line(10, 98, 17, 98);
        doc.line(10, 106, 17, 106);
        doc.line(17, 106, 17, 98);
        doc.line(17, 106, 17, 115);
        doc.line(17, 106, 17, 90);
        doc.line(78, 98, 70, 98);
        doc.line(78, 106, 70, 106);
        doc.line(78, 115, 78, 90);
        // Vertical lines
        doc.line(10, 7, 10, 295);
        doc.line(175, 7, 175, 295);
        doc.line(150, 115, 150, 220);
        doc.line(125, 115, 125, 240);
        doc.line(95, 115, 95, 240);
        doc.line(70, 90, 70, 220);
        doc.line(70, 35, 70, 40);
        doc.line(80, 45, 80, 40);
    };
    Cn22Service = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], Cn22Service);
    return Cn22Service;
}());
exports.Cn22Service = Cn22Service;
