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
exports.PdfService = void 0;
var core_1 = require("@angular/core");
var jspdf_1 = require("jspdf");
require("jspdf-autotable");
var jsbarcode_1 = require("jsbarcode");
var PdfService = /** @class */ (function () {
    function PdfService(sessionService) {
        this.sessionService = sessionService;
    }
    PdfService.prototype.generatePDF = function (data) {
        return __awaiter(this, void 0, Promise, function () {
            var doc, fileName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        doc = new jspdf_1["default"]();
                        return [4 /*yield*/, this.addHeader(doc)];
                    case 1:
                        _a.sent();
                        this.addRecipientAndSenderInfo(doc, data);
                        if (data.details && data.details.length > 0) {
                            this.addInvoiceDetails(doc, data);
                        }
                        else {
                            this.addInvoiceDetailsPoids(doc, data);
                        }
                        this.addFooter(doc);
                        return [4 /*yield*/, this.addHeader1(doc)];
                    case 2:
                        _a.sent();
                        this.addRecipientAndSenderInfo1(doc, data);
                        if (data.details && data.details.length > 0) {
                            this.addInvoiceDetails1(doc, data);
                        }
                        else {
                            this.addInvoiceDetailsPoids1(doc, data);
                        }
                        this.addFooter1(doc);
                        fileName = "Reçu_517" + data.code + ".pdf";
                        doc.save(fileName);
                        return [2 /*return*/];
                }
            });
        });
    };
    PdfService.prototype.addHeader = function (doc) {
        return __awaiter(this, void 0, Promise, function () {
            var logoLeft, logoWidth, logoHeight, date, printedBy, pageWidth, printedByWidth, printedByX, printedByY, title, titleWidth, centerX, titleY;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadImage("assets/layout/images/poste-removebg-preview.png")];
                    case 1:
                        logoLeft = _a.sent();
                        logoWidth = 13;
                        logoHeight = 13;
                        if (logoLeft) {
                            doc.addImage(logoLeft, "PNG", 14, 8, logoWidth, logoHeight);
                        }
                        date = new Date();
                        printedBy = "Imprim\u00E9 le " + date.toLocaleString() + " par " + this.sessionService.getAgentAttributes().prenom + " " + this.sessionService.getAgentAttributes().nom;
                        pageWidth = doc.internal.pageSize.width;
                        printedByWidth = doc.getTextWidth(printedBy);
                        printedByX = pageWidth - printedByWidth - 0.02;
                        printedByY = 14;
                        doc.setFontSize(10);
                        doc.setFont("helvetica", "normal");
                        doc.setTextColor(0, 0, 0);
                        doc.text(printedBy, printedByX, printedByY);
                        doc.setFontSize(11);
                        doc.setFont("helvetica", "bold");
                        title = "Reçu 517";
                        titleWidth = doc.getTextWidth(title);
                        centerX = (pageWidth - titleWidth) / 2;
                        titleY = 182;
                        doc.text(title, centerX, titleY);
                        return [2 /*return*/];
                }
            });
        });
    };
    PdfService.prototype.addHeader1 = function (doc) {
        return __awaiter(this, void 0, Promise, function () {
            var logoLeft, logoWidth, logoHeight, date, printedBy, pageWidth, printedByWidth, printedByX, printedByY, title, titleWidth, centerX, titleY;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadImage("assets/layout/images/poste-removebg-preview.png")];
                    case 1:
                        logoLeft = _a.sent();
                        logoWidth = 13;
                        logoHeight = 13;
                        if (logoLeft) {
                            doc.addImage(logoLeft, "PNG", 14, 160, logoWidth, logoHeight);
                        }
                        date = new Date();
                        printedBy = "Imprim\u00E9 le " + date.toLocaleString() + " par " + this.sessionService.getAgentAttributes().prenom + " " + this.sessionService.getAgentAttributes().nom;
                        pageWidth = doc.internal.pageSize.width;
                        printedByWidth = doc.getTextWidth(printedBy);
                        printedByX = pageWidth - printedByWidth - 35;
                        printedByY = 160;
                        doc.setFontSize(10);
                        doc.setFont("helvetica", "normal");
                        doc.setTextColor(0, 0, 0);
                        doc.text(printedBy, printedByX, printedByY);
                        doc.setFontSize(11);
                        doc.setFont("helvetica", "bold");
                        title = "Reçu 517";
                        titleWidth = doc.getTextWidth(title);
                        centerX = (pageWidth - titleWidth) / 2;
                        titleY = 30;
                        doc.text(title, centerX, titleY);
                        return [2 /*return*/];
                }
            });
        });
    };
    PdfService.prototype.addRecipientAndSenderInfo = function (doc, data) {
        var pageWidth = doc.internal.pageSize.width;
        var margin = 14;
        var rightMargin = margin;
        var rightTextStartX = pageWidth - rightMargin;
        var lineHeight = 6;
        var fontSize = 9;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(fontSize);
        var yOffset = 28;
        // doc.text(data.codeBarre || "", margin, yOffset);
        // yOffset += lineHeight;
        // doc.text(`Agent : ${this.sessionService.getAgentAttributes().prenom || "" + ' ' +this.sessionService.getAgentAttributes().nom || ""}`, margin, yOffset);
        // yOffset += lineHeight;
        doc.text("Structure Depot: " + (data.structureDepotLibelle || ""), margin, yOffset);
        yOffset += lineHeight;
        doc.text("Pays Origine: " + (data.paysOrigineLibelle || ""), margin, yOffset);
        yOffset += lineHeight;
        doc.text("Type Courrier: " + (data.typeCourrierLibelle || ""), margin, yOffset);
        yOffset += lineHeight;
        doc.text("Expediteur: " + (data.expediteurPrenom || "") + " " + (data.expediteurNom || ""), margin, yOffset);
        yOffset += lineHeight;
        doc.text("Adresse: " + (data.expediteurAdresse || ""), margin, yOffset);
        yOffset += lineHeight;
        var rightSectionYOffset = yOffset - 25;
        var rightYPosition = rightSectionYOffset;
        doc.text("Destinataire: " + (data.destinatairePrenom || "") + " " + (data.destinataireNom || ""), rightTextStartX, rightYPosition, { align: "right" });
        rightYPosition += lineHeight;
        doc.text("Adresse: " + (data.destinataireAdresse || 'N/A'), rightTextStartX, rightYPosition, { align: "right" });
        rightYPosition += lineHeight;
        doc.text("Pays Destination: " + (data.paysDestinationLibelle || ""), rightTextStartX, rightYPosition, { align: "right" });
        rightYPosition += lineHeight;
        var formatBoolean = function (value) { return (value ? "oui" : "non"); };
        doc.text("Recommand\u00E9: " + formatBoolean(data.recommande), rightTextStartX, rightYPosition, { align: "right" });
        rightYPosition += lineHeight;
        doc.text("AR: " + formatBoolean(data.ar), rightTextStartX, rightYPosition, { align: "right" });
        rightYPosition += lineHeight;
        doc.text("Express: " + formatBoolean(data.express), rightTextStartX, rightYPosition, { align: "right" });
        rightYPosition += lineHeight;
        this.addBarcode(doc, data.codeBarre, (pageWidth - 50) / 2, rightYPosition - 30, 50, 20);
    };
    PdfService.prototype.addRecipientAndSenderInfo1 = function (doc, data) {
        var pageWidth = doc.internal.pageSize.width;
        var margin = 14;
        var rightMargin = margin;
        var rightTextStartX = pageWidth - rightMargin;
        var lineSpacing = 6;
        var yOffset = 180;
        doc.setFont("helvetica", "normal");
        var fontSize = 9;
        doc.setFontSize(fontSize);
        doc.setTextColor(0, 0, 0);
        // doc.text(data.codeBarre || "", margin, yOffset);
        // yOffset += lineSpacing;
        // doc.text(`Agent : ${this.sessionService.getAgentAttributes().prenom || "" + ' ' +this.sessionService.getAgentAttributes().nom || ""}`, margin, yOffset);
        // yOffset += lineSpacing;
        doc.text("Structure Depot: " + (data.structureDepotLibelle || ""), margin, yOffset);
        yOffset += lineSpacing;
        doc.text("Pays d'origine: " + (data.paysOrigineLibelle || ""), margin, yOffset);
        yOffset += lineSpacing;
        doc.text("Type de Courrier: " + (data.typeCourrierLibelle || ""), margin, yOffset);
        yOffset += lineSpacing;
        // doc.text(`Categorie: ${data.categorieLibelle || ""}`, margin, yOffset,);
        // yOffset += lineSpacing;
        // doc.text(`Poids: ${data.poids || ""}`, margin, yOffset,);
        // yOffset += lineSpacing;
        doc.text("Expediteur: " + (data.expediteurPrenom || "") + " " + (data.expediteurNom || ""), margin, yOffset);
        yOffset += lineSpacing;
        doc.text("Adresse : " + (data.expediteurAdresse || "N/A"), margin, yOffset);
        yOffset += lineSpacing;
        var rightSectionYOffset = yOffset - 32;
        var rightYPosition = rightSectionYOffset;
        doc.text("Destinataire: " + (data.destinatairePrenom || "") + " " + (data.destinataireNom || ""), rightTextStartX, rightYPosition, { align: "right" });
        rightYPosition += lineSpacing;
        doc.text("Adresse : " + (data.destinataireAdresse || "N/A"), rightTextStartX, rightYPosition, { align: "right" });
        rightYPosition += lineSpacing;
        doc.text("Pays Destination: " + (data.paysDestinationLibelle || ""), rightTextStartX, rightYPosition, { align: "right" });
        rightYPosition += lineSpacing;
        var formatBoolean = function (value) { return (value ? "oui" : "non"); };
        doc.text("Recommand\u00E9: " + formatBoolean(data.recommande), rightTextStartX, rightYPosition, { align: "right" });
        rightYPosition += lineSpacing;
        doc.text("AR: " + formatBoolean(data.ar), rightTextStartX, rightYPosition, { align: "right" });
        rightYPosition += lineSpacing;
        doc.text("Express: " + formatBoolean(data.express), rightTextStartX, rightYPosition, { align: "right" });
        rightYPosition += lineSpacing;
        this.addBarcode(doc, data.codeBarre, (pageWidth - 50) / 2, rightYPosition - 15, 50, 20);
    };
    PdfService.prototype.addWatermark1 = function (doc, xOffset, yOffset, payer) {
        var text = payer ? "PAYÉ" : "NON PAYÉ";
        var fontSize = 12;
        var padding = 2;
        var originalTextColor = doc.getTextColor();
        doc.setFont("helvetica", "bold");
        doc.setFontSize(fontSize);
        var textWidth = doc.getTextWidth(text);
        var textHeight = fontSize * 0.35;
        var rectWidth = textWidth + padding * 2;
        var rectHeight = textHeight + padding * 2;
        var rectX = xOffset - rectWidth;
        var rectY = yOffset - rectHeight / 2 + 5;
        var color = payer ? [0, 128, 0] : [255, 0, 0];
        doc.setDrawColor(color[0], color[1], color[2]);
        doc.setLineWidth(1);
        doc.rect(rectX, rectY, rectWidth, rectHeight);
        doc.setTextColor(color[0], color[1], color[2]);
        var textX = rectX + rectWidth / 2;
        var textY = rectY + rectHeight / 2 + textHeight / 3;
        doc.text(text, textX, textY, { align: "center" });
        doc.setTextColor(originalTextColor);
    };
    PdfService.prototype.addInvoiceDetails = function (doc, data) {
        return __awaiter(this, void 0, Promise, function () {
            var tableColumn, tableRows, finalY, totalBoxWidth, totalBoxHeight, totalBoxX, totalBoxY;
            return __generator(this, function (_a) {
                tableColumn = ["Contenu"];
                tableRows = [];
                [data].forEach(function (item) {
                    var itemData = [item.contenu];
                    tableRows.push(itemData);
                });
                if (tableRows.length > 0) {
                    doc.autoTable({
                        head: [tableColumn],
                        body: tableRows,
                        startY: 68,
                        theme: "striped",
                        headStyles: { fillColor: [77, 77, 255] },
                        styles: { fontSize: 9, halign: "center" },
                        margin: { top: 10 }
                    });
                    finalY = doc.autoTable.previous.finalY + 5;
                    doc.setFontSize(9);
                    doc.setFont("helvetica", "normal");
                    doc.text("Poids : " + data.poids + " g", 190, finalY + 5, { align: "right" });
                    doc.text("Montant : " + data.montant + " CFA", 195, finalY + 10, { align: "right" });
                    totalBoxWidth = 30;
                    totalBoxHeight = 9;
                    totalBoxX = 195 - totalBoxWidth;
                    totalBoxY = finalY + 26;
                    doc.setDrawColor(77, 77, 255);
                    doc.setFillColor(77, 77, 255);
                    doc.rect(totalBoxX, totalBoxY, totalBoxWidth, totalBoxHeight, "FD");
                    doc.setFontSize(9);
                    doc.setTextColor(255, 255, 255);
                    doc.text("Total: " + (data.taxeDouane + data.montant + data.taxePresentation) + " CFA", totalBoxX + 2, totalBoxY + 6);
                    doc.setFontSize(9);
                    doc.setTextColor(77, 77, 255);
                    doc.text("Informations de paiement :", 14, finalY + 10);
                    doc.setFontSize(9);
                    doc.setTextColor(0, 0, 0);
                    doc.text('Méthode de paiement :espéce', 14, finalY + 20);
                }
                return [2 /*return*/];
            });
        });
    };
    PdfService.prototype.addInvoiceDetails1 = function (doc, data) {
        var tableColumn = ["Contenu"];
        var tableRows = [];
        [data].forEach(function (item) {
            var itemData = [item.contenu];
            tableRows.push(itemData);
        });
        if (tableRows.length > 0) {
            doc.autoTable({
                head: [tableColumn],
                body: tableRows,
                startY: 224,
                theme: "striped",
                headStyles: { fillColor: [77, 77, 255] },
                styles: { fontSize: 9, halign: "center" },
                margin: { top: 10 }
            });
            var finalY = doc.autoTable.previous.finalY + 5;
            doc.setFontSize(9);
            doc.setFont("helvetica", "normal");
            doc.text("Poids : " + data.poids + " g", 190, finalY + 5, { align: "right" });
            doc.text("Montant: " + data.montant + " CFA", 195, finalY + 10, { align: "right" });
            var totalBoxWidth = 30;
            var totalBoxHeight = 9;
            var totalBoxX = 195 - totalBoxWidth;
            var totalBoxY = finalY + 26;
            doc.setDrawColor(77, 77, 255);
            doc.setFillColor(77, 77, 255);
            doc.rect(totalBoxX, totalBoxY, totalBoxWidth, totalBoxHeight, "FD");
            doc.setFontSize(9);
            doc.setTextColor(255, 255, 255);
            doc.text("Total: " + (data.taxeDouane +
                data.montant +
                data.taxePresentation) + " CFA", totalBoxX + 2, totalBoxY + 5);
            doc.setFontSize(9);
            doc.setTextColor(77, 77, 255);
            doc.text("Informations de paiement :", 14, finalY + 10);
            doc.setFontSize(9);
            doc.setTextColor(0, 0, 0);
            var path = window.location.hash.split("guichet")[1];
            //  doc.text(`Options de paiement :  ${"nean"}`, 14, finalY + 15);
            doc.text("M\u00E9thode de paiement : esp\u00E9ce", 14, finalY + 20);
            doc.setLineWidth(0.2);
            doc.setDrawColor(0, 0, 0);
            var startX = 10;
            var startY = 150;
            var lineLength = 200;
            var pageWidth = doc.internal.pageSize.width;
            var endX = startX + lineLength;
            if (endX > pageWidth - 10) {
                endX = pageWidth - 10;
            }
            for (var i = startX; i < endX; i += 5) {
                doc.line(i, startY, i + 3, startY);
            }
        }
    };
    PdfService.prototype.addInvoiceDetailsPoids = function (doc, data) {
        var tableColumn = ["Contenu"];
        var tableRows = [];
        [data].forEach(function (item) {
            var itemData = [
                item.contenu,
            ];
            tableRows.push(itemData);
        });
        if (tableRows.length > 0) {
            doc.autoTable({
                head: [tableColumn],
                body: tableRows,
                startY: 85,
                theme: "striped",
                headStyles: { fillColor: [77, 77, 255] },
                styles: { fontSize: 9, halign: "center" },
                margin: { top: 10 }
            });
            var finalY = doc.autoTable.previous.finalY + 5;
            doc.setFontSize(9);
            doc.setFont("helvetica", "normal");
            doc.text("Poids : " + data.poids + " g", 190, finalY + 5, { align: "right" });
            doc.text("Montant: " + data.montant + " CFA", 195, finalY + 10, { align: "right" });
            //   doc.text(`Taxe douane: ${data.taxeDouane} CFA`, 195, finalY + 15, { align: "right" });
            //   doc.text(`Taxe presentation: ${data.taxePresentation} CFA`, 195, finalY + 20, { align: "right" });
            var totalBoxWidth = 30;
            var totalBoxHeight = 9;
            var totalBoxX = 195 - totalBoxWidth;
            var totalBoxY = finalY + 18;
            doc.setDrawColor(77, 77, 255);
            doc.setFillColor(77, 77, 255);
            doc.rect(totalBoxX, totalBoxY, totalBoxWidth, totalBoxHeight, "FD");
            doc.setFontSize(9);
            doc.setTextColor(255, 255, 255);
            doc.text("Total: " + (data.taxeDouane + data.montant + data.taxePresentation) + " CFA", totalBoxX + 2, totalBoxY + 6);
            doc.setFontSize(9);
            doc.setTextColor(77, 77, 255);
            doc.text("Informations de paiement :", 14, finalY + 10);
            doc.setFontSize(9);
            doc.setTextColor(0, 0, 0);
            //     doc.text(`Options de paiement :  ${"NEAN"}`, 14, finalY + 15);
            doc.text("M\u00E9thode de paiement : esp\u00E9ce", 14, finalY + 20);
        }
    };
    PdfService.prototype.addInvoiceDetailsPoids1 = function (doc, data) {
        var tableColumn = ["Contenu"];
        var tableRows = [];
        [data].forEach(function (item) {
            var itemData = [
                item.contenu,
            ];
            tableRows.push(itemData);
        });
        if (tableRows.length > 0) {
            doc.autoTable({
                head: [tableColumn],
                body: tableRows,
                startY: 232,
                theme: "striped",
                headStyles: { fillColor: [77, 77, 255] },
                styles: { fontSize: 9, halign: "center" },
                margin: { top: 10 }
            });
            var finalY = doc.autoTable.previous.finalY + 5;
            doc.setFontSize(9);
            doc.setFont("helvetica", "normal");
            doc.text("Poids : " + data.poids + " g", 190, finalY + 5, { align: "right" });
            doc.text("Montant: " + data.montant + " CFA", 195, finalY + 10, { align: "right" });
            /*   doc.text(`Taxe douane: ${data.taxeDouane} CFA`, 195, finalY + 15, {
                  align: "right",
              });
              doc.text(`Taxe presentation: ${data.taxePresentation} CFA`, 195, finalY + 20, {
                  align: "right",
              }); */
            var totalBoxWidth = 30;
            var totalBoxHeight = 9;
            var totalBoxX = 195 - totalBoxWidth;
            var totalBoxY = finalY + 18;
            doc.setDrawColor(77, 77, 255);
            doc.setFillColor(77, 77, 255);
            doc.rect(totalBoxX, totalBoxY, totalBoxWidth, totalBoxHeight, "FD");
            doc.setFontSize(9);
            doc.setTextColor(255, 255, 255);
            doc.text("Total: " + (data.taxeDouane +
                data.montant +
                data.taxePresentation) + " CFA", totalBoxX + 2, totalBoxY + 5);
            doc.setFontSize(9);
            doc.setTextColor(77, 77, 255);
            doc.text("Informations de paiement :", 14, finalY + 10);
            doc.setFontSize(9);
            doc.setTextColor(0, 0, 0);
            ///   doc.text(`Options de paiement :  ${"NEAN"}`, 14, finalY + 15);
            doc.text("M\u00E9thode de paiement : esp\u00E9ce", 14, finalY + 20);
            doc.setLineWidth(0.2);
            doc.setDrawColor(0, 0, 0);
            var startX = 10;
            var startY = 150;
            var lineLength = 200;
            var pageWidth = doc.internal.pageSize.width;
            var endX = startX + lineLength;
            if (endX > pageWidth - 10) {
                endX = pageWidth - 10;
            }
            for (var i = startX; i < endX; i += 5) {
                doc.line(i, startY, i + 3, startY);
            }
        }
    };
    PdfService.prototype.addFooter = function (doc) {
        doc.setFontSize(7);
        doc.setFont("helvetica", "italic");
        doc.setTextColor(77, 77, 255);
        var footerText = "Groupe La Poste | Adresse: Avenue Peytavin Dakar, Senegal | Tel: +221 33 839 34 34 | Email: serviceclient@laposte.sn | Site Web: www.laposte.sn";
        var pageWidth = doc.internal.pageSize.width;
        var textWidth = doc.getTextWidth(footerText);
        var centerX = (pageWidth - textWidth) / 2;
        doc.text(footerText, centerX, doc.internal.pageSize.height - 160);
    };
    PdfService.prototype.addFooter1 = function (doc) {
        doc.setFontSize(7);
        doc.setFont("helvetica", "italic");
        doc.setTextColor(77, 77, 255);
        var footerText = "Groupe La Poste | Adresse: Avenue Peytavin Dakar, Senegal | Tel: +221 33 839 34 34 | Email: serviceclient@laposte.sn | Site Web: www.laposte.sn";
        var pageWidth = doc.internal.pageSize.width;
        var textWidth = doc.getTextWidth(footerText);
        var centerX = (pageWidth - textWidth) / 2;
        doc.text(footerText, centerX, doc.internal.pageSize.height - 9);
    };
    PdfService.prototype.addBarcode = function (doc, text, x, y, width, height) {
        var canvas = document.createElement("canvas");
        jsbarcode_1["default"](canvas, text, {
            format: "CODE128",
            displayValue: true
        });
        var barcodeImage = canvas.toDataURL("image/png");
        doc.addImage(barcodeImage, "PNG", x, y, width, height);
    };
    PdfService.prototype.loadImage = function (src) {
        return new Promise(function (resolve, reject) {
            var img = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = function () {
                var canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                var ctx = canvas.getContext("2d");
                if (ctx) {
                    ctx.drawImage(img, 0, 0);
                    resolve(canvas.toDataURL("image/png"));
                }
                else {
                    reject(new Error("Failed to get canvas context"));
                }
            };
            img.onerror = function () { return reject(new Error("Image failed to load: " + src)); };
            img.src = src;
        });
    };
    PdfService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], PdfService);
    return PdfService;
}());
exports.PdfService = PdfService;
