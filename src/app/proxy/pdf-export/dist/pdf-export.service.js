"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PdfExportService = void 0;
var core_1 = require("@angular/core");
var jspdf_1 = require("jspdf");
var jspdf_autotable_1 = require("jspdf-autotable");
var PdfExportService = /** @class */ (function () {
    function PdfExportService() {
    }
    PdfExportService.prototype.exportPDF = function (data, name, columns, dateRange, bureauRange) {
        if (data.length > 0) {
            var doc = new jspdf_1["default"]('landscape');
            var leftLogo = 'assets/layout/images/laposte.jpeg';
            var rightLogo = 'assets/layout/images/logo.png';
            doc.addImage(leftLogo, 'PNG', 10, 10, 30, 15);
            doc.addImage(rightLogo, 'PNG', 250, 10, 30, 15);
            var title = 'Rapport Jotnaci';
            var titleWidth = doc.getTextWidth(title);
            var titleX = (doc.internal.pageSize.getWidth() - titleWidth) / 1.7;
            var titleY = 20;
            doc.setFontSize(20);
            doc.text(title, titleX, titleY, { align: 'center' });
            var dateRangeY = titleY + 15;
            var leftPosition = -29;
            doc.setFontSize(12);
            doc.text(" " + dateRange, titleX - leftPosition, dateRangeY);
            var bureauX = titleX + -75;
            doc.text(bureauRange, bureauX, dateRangeY);
            var formattedData = data.map(function (item) {
                var formattedItem = {};
                columns.forEach(function (col) {
                    formattedItem[col.dataKey] = item[col.dataKey];
                });
                return formattedItem;
            });
            jspdf_autotable_1["default"](doc, {
                head: [columns.map(function (col) { return col.header; })],
                body: formattedData.map(function (row) { return columns.map(function (col) { return row[col.dataKey]; }); }),
                startY: dateRangeY + 10,
                margin: { horizontal: 10 }
            });
            doc.save("Rapport Jotnaci.pdf");
        }
        else {
            console.error('No data available to export');
        }
    };
    PdfExportService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], PdfExportService);
    return PdfExportService;
}());
exports.PdfExportService = PdfExportService;
