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
exports.Cn23Service = void 0;
var core_1 = require("@angular/core");
var jspdf_1 = require("jspdf");
require("jspdf-autotable");
var rxjs_1 = require("rxjs");
var Cn23Service = /** @class */ (function () {
    function Cn23Service(sessionService, clientService) {
        this.sessionService = sessionService;
        this.clientService = clientService;
    }
    Cn23Service.prototype.createPDF = function (data, fullname) {
        return __awaiter(this, void 0, Promise, function () {
            var doc, keyword, client, error_1, fileName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        doc = new jspdf_1["default"]({ format: 'A4', orientation: 'landscape' });
                        keyword = data.destinataireTelephone;
                        if (!keyword) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, rxjs_1.firstValueFrom(this.clientService.searchClient(keyword))];
                    case 2:
                        client = _a.sent();
                        if (client === null || client === void 0 ? void 0 : client.adresse) {
                            data.destinataireAdresse = client.adresse;
                            data.destinataireNom = data.destinataireNom || client.nom;
                            data.destinatairePrenom = data.destinatairePrenom || client.prenom;
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Erreur lors de la récupération du client :', error_1);
                        return [3 /*break*/, 4];
                    case 4:
                        this.addHeader(doc, data);
                        this.addRecipientInfo(doc, data);
                        this.addSenderInfo(doc, data);
                        this.addDetails(doc, data);
                        this.addFooter(doc, data, fullname);
                        this.drawLines(doc, data);
                        fileName = 'CP71.pdf';
                        doc.save(fileName);
                        return [2 /*return*/];
                }
            });
        });
    };
    Cn23Service.prototype.addHeader = function (doc, data) {
        var _a, _b, _c, _d;
        var pageHeight = doc.internal.pageSize.height;
        var pageWidth = doc.internal.pageSize.width;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.text('De', pageWidth / 50, 25, { align: 'right' });
        doc.text('BULLETIN EXPEDITION', pageWidth / 2, 14, { align: 'left' });
        doc.text(' CP71', pageHeight / 1, 14, { align: 'center' });
        doc.text('(ancien CP2)', pageWidth / 1.5, 28, { align: 'left' });
        doc.text("" + data.codeBarre, pageWidth / 2, 26, { align: 'left' });
        doc.text(' ', pageWidth / 2, 40, { align: 'left' });
        doc.text('Valeur déclarée', pageWidth / 2, 55, { align: 'left' });
        doc.text("" + ((_a = data.valeurDeclare) !== null && _a !== void 0 ? _a : ''), pageHeight / 1, 55, { align: 'center' });
        doc.text('(Apposer les étiquettes officielles le cas échéant)', pageWidth / 2.3, 75, { align: 'left' });
        var valeurDeclaree = (_b = data.valeurDeclare) !== null && _b !== void 0 ? _b : 0;
        var taxeVD = 0;
        if (valeurDeclaree === 0) {
            taxeVD = 0;
        }
        else if (valeurDeclaree <= 10000) {
            taxeVD = 1500;
        }
        else {
            taxeVD = Math.ceil(valeurDeclaree / 10000) * 250;
        }
        var montantTotal = (_c = data.montant) !== null && _c !== void 0 ? _c : 0;
        var taxePort = montantTotal - taxeVD;
        // Affichage
        doc.text("Poids:                 " + ((_d = data.poids) !== null && _d !== void 0 ? _d : '0') + "              g", pageWidth / 2.3, 90, { align: 'left' });
        doc.text("Taxe de port:     " + (taxePort !== null && taxePort !== void 0 ? taxePort : '0') + " CFA", pageWidth / 2.3, 95, { align: 'left' });
        doc.text("Taxe VD:            " + (taxeVD !== null && taxeVD !== void 0 ? taxeVD : '0') + " CFA", pageWidth / 2.3, 100, { align: 'left' });
        doc.text("Net \u00E0 payer:      " + (montantTotal !== null && montantTotal !== void 0 ? montantTotal : '0') + " CFA", pageWidth / 2.3, 105, { align: 'left' });
    };
    Cn23Service.prototype.addRecipientInfo = function (doc, data) {
        var _a, _b, _c, _d, _e, _f, _g;
        var pageWidth = doc.internal.pageSize.width;
        var marginRight = pageWidth / 1.14;
        var lineHeight = 6;
        doc.text('Reçu de dépot d\'un colis postal', pageWidth / 1.01, 18, { align: 'right' });
        doc.text("" + ((_a = data.typeCourrierLibelle) !== null && _a !== void 0 ? _a : ''), pageWidth / 1.03, 7, { align: 'right' });
        doc.text('Numéro  ', pageWidth / 1.01, 3, { align: 'right' });
        doc.text("     Partie à remplir par l'expediteur", pageWidth / 1.01, 30, { align: 'right' });
        doc.text('DESTINATAIRE', pageWidth / 1.05, 40, { align: 'right' });
        var labelX = 241;
        var valueX = 264;
        doc.text("Pr\u00E9nom :", labelX, 47);
        doc.text("" + ((_b = data.destinatairePrenom) !== null && _b !== void 0 ? _b : ''), valueX, 47, { align: 'right' });
        doc.text("Nom :", labelX, 55);
        doc.text("" + ((_c = data.destinataireNom) !== null && _c !== void 0 ? _c : ''), valueX, 55, { align: 'right' });
        var adresse = (_d = data.destinataireAdresse) !== null && _d !== void 0 ? _d : '';
        var splitByChars = function (text, maxLength) {
            var result = [];
            for (var i = 0; i < text.length; i += maxLength) {
                result.push(text.slice(i, i + maxLength));
            }
            return result;
        };
        function splitTextByWordsSmart(text, maxChars) {
            var words = text.split(' ');
            var lines = [];
            var currentLine = '';
            for (var _i = 0, words_1 = words; _i < words_1.length; _i++) {
                var word = words_1[_i];
                var testLine = currentLine ? currentLine + ' ' + word : word;
                if (testLine.length <= maxChars || word.match(/^\d+[ᵉer]{1,2}$/)) {
                    currentLine = testLine;
                }
                else {
                    lines.push(currentLine.trim());
                    currentLine = word;
                }
            }
            if (currentLine) {
                lines.push(currentLine.trim());
            }
            return lines;
        }
        var adresseTexte = "Adresse : " + (data.destinataireAdresse || '');
        var adresseLines = splitTextByWordsSmart(adresseTexte, 35);
        var adresseX = labelX;
        var adresseY = 62;
        adresseLines.forEach(function (line) {
            doc.text(line, adresseX, adresseY);
            adresseY += 4;
        });
        var valeurDeclaree = (_e = data.valeurDeclare) !== null && _e !== void 0 ? _e : 0;
        var taxeVD = 0;
        if (valeurDeclaree === 0) {
            taxeVD = 0;
        }
        else if (valeurDeclaree <= 10000) {
            taxeVD = 1500;
        }
        else {
            taxeVD = Math.ceil(valeurDeclaree / 10000) * 250;
        }
        var montantTotal = (_f = data.montant) !== null && _f !== void 0 ? _f : 0;
        var taxePort = montantTotal - taxeVD;
        doc.text("Poids :", labelX, 85);
        doc.text(((_g = data.poids) !== null && _g !== void 0 ? _g : '0') + " g", valueX, 85);
        doc.text("Taxe de port :", labelX, 89);
        doc.text(taxePort + " CFA", valueX, 89);
        doc.text("Taxe VD :", labelX, 94);
        doc.text(taxeVD + " CFA", valueX, 94);
        doc.text("Net \u00E0 payer :", labelX, 99);
        doc.text(montantTotal + " CFA", valueX, 99);
    };
    Cn23Service.prototype.addSenderInfo = function (doc, data) {
        var _a, _b, _c;
        var pageWidth = doc.internal.pageSize.width;
        var pageHeight = doc.internal.pageSize.height;
        doc.text('01  ', pageWidth / 2, 120, { align: 'center' });
        doc.text('Bureau ', pageHeight / 1, 120, { align: 'left' });
        doc.text("" + ((_a = data.structureDepotLibelle) !== null && _a !== void 0 ? _a : ''), pageHeight / 1, 135, { align: 'center' });
        doc.text('Valeur déclarée en CFA ', pageWidth / 2, 130, { align: 'center' });
        doc.text("" + data.valeurDeclare, pageWidth / 2, 136, { align: 'center' });
        doc.text('Poids brute ', pageWidth / 2, 145, { align: 'center' });
        doc.text(((_b = data.poids) !== null && _b !== void 0 ? _b : '') + " g", pageWidth / 2, 149, { align: 'center' });
        doc.text("Taxes", pageWidth / 1.8, 145, { align: 'left' });
        doc.text(((_c = data.montant) !== null && _c !== void 0 ? _c : '') + " CFA", pageWidth / 1.8, 149, { align: 'left' });
        doc.text("J'ai perçu le colis sur ce ", pageHeight / 1, 160, { align: 'center' });
        doc.text('Déclaration ', pageWidth / 2.040, 158, { align: 'center' });
        doc.text('Date et signature ', pageWidth / 2.05, 163, { align: 'center' });
        doc.text('Je certifie que cette envoie ne contient   ', pageWidth / 2, 180, { align: 'left' });
        doc.text('aucun objet dangereux interdit par la   ', pageWidth / 2, 189, { align: 'left' });
    };
    Cn23Service.prototype.addDetails = function (doc, data) {
        var _a;
        var pageWidth = doc.internal.pageSize.width;
        doc.text('A remplir par le bureau de  ', pageWidth / 1.05, 110, { align: 'right' });
        doc.text('Numéro colis: ', pageWidth / 1.11, 120, { align: 'right' });
        doc.text("" + data.codeBarre, pageWidth / 1.10, 130, { align: 'right' });
        doc.text('NOTA -Aucune réclamation ne peut   ', pageWidth / 1, 170, { align: 'right' });
        doc.text('etre examinée sans la production du', pageWidth / 1.0085, 178, { align: 'right' });
        doc.text("Taxe re\u00E7ue : ", pageWidth / 1.1, 195, { align: 'right' });
        doc.text(((_a = data.montant) !== null && _a !== void 0 ? _a : '0') + " CFA", pageWidth / 1.1, 195, { align: 'left' });
    };
    Cn23Service.prototype.addFooter = function (doc, data, fullname) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        return __awaiter(this, void 0, void 0, function () {
            var pageWidth, pageHeight, imagePath, labelX, valueX, labeX, valuX, yPosition, destinataireAdresse, date;
            return __generator(this, function (_p) {
                pageWidth = doc.internal.pageSize.width;
                pageHeight = doc.internal.pageSize.height;
                imagePath = 'assets/layout/images/poste-removebg-preview.png';
                doc.addImage(imagePath, 'PNG', pageWidth / 15, -1, 12, 7);
                doc.setFontSize(9);
                labelX = 20;
                valueX = 44;
                doc.text("Nom :", labelX, 22);
                doc.text("" + ((_a = data.expediteurNom) !== null && _a !== void 0 ? _a : ''), valueX, 22);
                doc.text("Pr\u00E9nom :", labelX, 27);
                doc.text("" + ((_b = data.expediteurPrenom) !== null && _b !== void 0 ? _b : ''), valueX, 27);
                doc.text("Adresse :", labelX, 32);
                doc.text("" + ((_c = data.expediteurAdresse) !== null && _c !== void 0 ? _c : ''), valueX, 32);
                doc.text("Pays d'origine :", labelX, 37);
                doc.text("" + ((_d = data.paysOrigineLibelle) !== null && _d !== void 0 ? _d : ''), valueX, 37);
                doc.text("T\u00E9l\u00E9phone :", labelX, 42);
                doc.text("" + ((_e = data.expediteurTelephone) !== null && _e !== void 0 ? _e : ''), valueX, 42);
                doc.text("Code postal :", labelX, 47);
                doc.text("" + ((_f = data.expediteurCodePostal) !== null && _f !== void 0 ? _f : ''), valueX, 47);
                doc.text('A', pageWidth / 50, 59, { align: 'right' });
                labeX = 20;
                valuX = 49;
                // Nom
                doc.text("Nom : ", labeX, 59, { align: 'left' });
                doc.text("" + ((_g = data.destinataireNom) !== null && _g !== void 0 ? _g : ''), valuX, 59, { align: 'left' });
                // Prenom
                doc.text("Prenom : ", labeX, 64, { align: 'left' });
                doc.text("" + ((_h = data.destinatairePrenom) !== null && _h !== void 0 ? _h : ''), valuX, 64, { align: 'left' });
                yPosition = 37;
                doc.text("Adresse : ", labeX, 69, { align: 'left' });
                destinataireAdresse = "" + ((_j = data.destinataireAdresse) !== null && _j !== void 0 ? _j : '');
                yPosition = 69;
                this.addTextInLines(doc, destinataireAdresse, valuX, yPosition, 9);
                doc.text("Pays de destination : ", labeX, 74, { align: 'left' });
                doc.text("     " + ((_k = data.paysDestinationLibelle) !== null && _k !== void 0 ? _k : ''), valuX, 74, { align: 'left' });
                doc.text("T\u00E9l\u00E9phone : ", labeX, 79, { align: 'left' });
                doc.text("" + ((_l = data.destinataireTelephone) !== null && _l !== void 0 ? _l : ''), valuX, 79, { align: 'left' });
                doc.text("Code Postal :", labeX, 84, { align: 'left' });
                doc.text("" + ((_m = data.destinataireCodePostal) !== null && _m !== void 0 ? _m : ''), valuX, 84, { align: 'left' });
                doc.text('Timbre de la ', pageHeight / 13, 95, { align: 'left' });
                doc.text('Bureau ', pageHeight / 3, 95, { align: 'left' });
                doc.text("" + 'DAKAR MESSAGERIE', pageWidth / 4, 104, { align: 'left' });
                doc.text('Droit de douane ', pageHeight / 13, 105, { align: 'left' });
                doc.text('Catégorie de colis ', pageHeight / 13, 115, { align: 'left' });
                doc.text('aerien ', pageHeight / 10, 150, { align: 'left' });
                doc.text('surface ', pageWidth / 4, 150, { align: 'left' });
                doc.text('A', pageWidth / 50, 59, { align: 'right' });
                doc.text("Bureau: " + ((_o = data.structureDepotLibelle) !== null && _o !== void 0 ? _o : ''), pageHeight / 10, 8, { align: 'left' });
                doc.text('LA POSTE SENEGAL', pageHeight / 2, 3, { align: 'right' });
                doc.text("Agent: " + fullname, pageWidth / 2, 8, { align: 'center' });
                date = new Date();
                doc.text("Date d'op\u00E9ration: " + date.toLocaleString(), pageWidth / 1.4, 8, { align: 'center' });
                doc.text("Instruction de l'expéditeur en cas de non-livraison ", pageHeight / 13, 160, { align: 'left' });
                doc.text("Renvoyer à l'expéditeur ", pageHeight / 13, 170, { align: 'left' });
                doc.text('Remarque: Pour tenir compte des besoins de leur service, les Administrations ont l\'habitude d\'utiliser cette formule unique , soit comme partie de la formule-Liasse CP72 ', pageHeight / 29, 209, { align: 'left' });
                doc.setLineWidth(0.5);
                return [2 /*return*/];
            });
        });
    };
    Cn23Service.prototype.addTextInLines = function (doc, text, x, y, wordsPerLine) {
        var words = text.split(' ');
        var line = '';
        var yPosition = y;
        for (var i = 0; i < words.length; i++) {
            line += words[i] + ' ';
            if ((i + 1) % wordsPerLine === 0) {
                doc.text(line.trim(), x, yPosition, { align: 'left' });
                yPosition += 3;
                line = '';
            }
        }
        if (line.trim().length > 0) {
            doc.text(line.trim(), x, yPosition, { align: 'left' });
        }
    };
    Cn23Service.prototype.drawLines = function (doc, data) {
        var pageWidth = doc.internal.pageSize.width;
        var pageHeight = doc.internal.pageSize.height;
        doc.setLineWidth(0.7);
        doc.line(0, 10, 0, 206);
        doc.line(10, 0, 10, 0);
        doc.line(10, 17, 10, 203);
        doc.line(pageWidth - 0, -105, pageWidth - 0, 206);
        doc.line(pageWidth - 57, 10, pageWidth - 57, 206);
        doc.line(0, 10, pageWidth - 0, 10);
        doc.circle(270, 155, 10);
        doc.rect(65, 146, 8, 4);
        doc.rect(11, 146, 8, 4);
        doc.line(300, 20, pageWidth - 57, 20);
        doc.line(300, 80, pageWidth - 57, 80);
        doc.line(300, 100, pageWidth - 57, 100);
        doc.line(300, 140, pageWidth - 57, 140);
        doc.line(300, 190, pageWidth - 57, 190);
        doc.line(300, 206, pageWidth - 57, 206);
        doc.setLineHeightFactor(0.5);
        doc.line(0, 17, pageHeight - 83, 17);
        doc.line(127, 125, pageWidth - 102, 125);
        doc.line(127, 140, pageWidth - 102, 140);
        doc.line(195, 110, 195, 153);
        doc.line(0, 50, pageWidth - 60, 50);
        doc.line(pageWidth - 60, 50, pageWidth - 60, 202);
        doc.line(10, 90, pageWidth - 170, 90);
        doc.line(127, 175, pageWidth - 60, 175);
        doc.line(160, 140, 160, 175);
        doc.line(10, 110, pageWidth - 60, 110);
        doc.line(10, 153, pageWidth - 60, 153);
        doc.line(0, 206, pageWidth - 10, 206);
        doc.line(10, 203, pageWidth - 60, 202);
        doc.line(10, 100, 65, 100);
        doc.line(10, 110, 65, 110);
        doc.line(10, 60, 10, 193);
        doc.line(127, 70, pageWidth - 60, 70);
        doc.line(pageWidth - 170, 17, pageWidth - 170, 202);
        doc.line(65, 90, 65, 110);
    };
    Cn23Service = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], Cn23Service);
    return Cn23Service;
}());
exports.Cn23Service = Cn23Service;
