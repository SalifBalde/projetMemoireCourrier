import {Component, Injectable, OnInit} from '@angular/core';
import jsPDF from 'jspdf';
import JsBarcode from 'jsbarcode';
import 'jspdf-autotable';

@Injectable({
    providedIn: 'root',
})
export class Cn23AService {
    _base64ToArrayBuffer(base64) {
        var binary_string = base64.replace(/\\n/g, '');
        binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }
    src: any;

    ngOnInit(): void {
        const doc = new jsPDF({ format: 'a4', orientation: 'l' });

        const pageHeight =
            doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
        const pageWidth =
            doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
        console.log(pageHeight + ',' + pageWidth);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);

        const barcodeCanvas = document.createElement('canvas');
        JsBarcode(barcodeCanvas, 'CV000189933SN', {
            format: 'CODE128',
            displayValue: true,
            width: 1,
            height: 25,
        });

        // Convertissez le canvas en Data URL
        const barcodeImage = barcodeCanvas.toDataURL('image/png');

        // Ajoutez le code-barres au PDF
        doc.addImage(barcodeImage, 'PNG', 190, 63, 80, 30); // Position (x, y) et dimensions (width, height)

        // Ajoutez d'autres contenus comme avant
        doc.text(
            'CUSTOMS DECLARATION                        CN23',
            pageHeight / 1,
            45,
            {
                align: 'left',
            }
        );
        doc.line(pageWidth - 43, 44, pageWidth - 43, 53);
        doc.line(pageWidth - 20, 60, pageWidth - 20, 68);
        doc.text('No. of item (barcode if any)', pageHeight / 1, 50, {
            align: 'left',
        });
        doc.text('DECLARATION EN DOUANE', pageHeight / 1, 58, {
            align: 'left',
        });
        doc.text("N° de l'envoie(code à barres ,s'il existe)", pageHeight / 1, 65, {
            align: 'left',
        });

        doc.text('FROM \nDe', pageHeight / 20, 49, {
            align: 'right',
        });
        doc.text('Name BABACAR FALL', pageHeight / 4, 49, {
            align: 'right',
        });
        doc.text('Adresse MEDICAL RUE 35* 28 DAKAR SENEGAL', pageHeight / 2.3, 57, {
            align: 'right',
        });
        doc.text('Adresse (count)', pageHeight / 5, 63, {
            align: 'right',
        });
        doc.text(
            'PostCode 10500                         City DAKAR',
            pageHeight / 2.6,
            73,
            {
                align: 'right',
            }
        );
        doc.text(
            'State SENEGAL                        COUNTRY SN(Sénégal)',
            pageHeight / 2.2,
            78,
            {
                align: 'right',
            }
        );
        doc.text('Name CORONIKA Wave ', pageHeight / 4.1, 83, {
            align: 'right',
        });
        doc.text(
            'Adresse 787 LAUREL WALK APT J, GOLETA,CA 93117 USA ',
            pageHeight / 2,
            88,
            {
                align: 'right',
            }
        );
        doc.text('Adresse (count) ', pageHeight / 5.5, 94, {
            align: 'right',
        });
        doc.text('Impoter reference', pageHeight / 1, 94, {
            align: 'center',
        });
        doc.text('Impoter telephone', pageHeight / 1, 103, {
            align: 'center',
        });
        doc.text(
            'PostCode 93117                         City DAKAR ',
            pageHeight / 2.6,
            99,
            {
                align: 'right',
            }
        );
        doc.text(
            'State USA                                          COUNTRY US(Stats-Unis)                       ',
            pageHeight / 1.7,
            103,
            {
                align: 'right',
            }
        );
        doc.text('Detailed description of contents(1) ', pageHeight / 3, 109, {
            align: 'right',
        });
        doc.text('Quality(2) ', pageHeight / 2, 109, { align: 'right' });
        doc.text('Net Weight(3) ', pageHeight / 1.5, 109, { align: 'right' });
        doc.text('Valeur(5) ', pageHeight / 1.2, 109, { align: 'right' });
        doc.text('For commercial items only ', pageHeight / 1, 108, {
            align: 'left',
        });
        doc.text('HS tarif numner(7)      Contry of Origin of goods(8)', pageHeight / 1, 113, { align: 'left' });
        doc.text('', pageHeight / 3, 113, {
            align: 'right',
        });
        doc.text('PATALON ', pageHeight / 7, 118, { align: 'left' });
        doc.text('1', pageHeight / 2, 118, { align: 'left' });
        doc.text('3.500', pageHeight / 1.5, 118, { align: 'left' });
        doc.text('620343                          SN(Sénégal)', pageHeight / 1, 118, { align: 'left' });
        // doc.text('Total groos weight', pageHeight / 2, 148, { align: 'center' });
        doc.text('1', pageHeight / 2, 118, { align: 'left' });


        doc.setLineWidth(0.5);
        doc.line(10, 46, 10, 205);
        doc.line(287, 205, 287, 90);
        doc.setLineHeightFactor(0.5);

        doc.line(0, 46, pageWidth - 110, 46);
        doc.line(10, 53, pageWidth - 140, 53);
        doc.line(pageWidth - 140, 46, pageWidth - 140, 60);
        doc.line(10, 60, pageWidth - 110, 60);
        doc.line(10, 69, pageWidth - 110, 69);
        doc.line(10, 75, pageWidth - 110, 75);
        doc.line(0, 79, pageWidth - 110, 79);
        doc.line(10, 85, pageWidth - 110, 85);
        doc.line(10, 90, pageWidth - 10, 90);
        doc.line(10, 95, pageWidth - 110, 95);
        doc.line(187, 97, pageWidth - 10, 97);
        doc.line(10, 100, pageWidth - 110, 100);
        doc.line(0, 105, pageWidth - 10, 105);
        doc.line(10, 115, pageWidth - 10, 115);
        doc.line(10, 120, pageWidth - 10, 120);
        doc.line(10, 125, pageWidth - 10, 125);
        doc.line(10, 130, pageWidth - 10, 130);
        doc.line(10, 135, pageWidth - 10, 135);
        doc.line(10, 140, pageWidth - 10, 140);
        doc.line(10, 150, pageWidth - 10, 150);
        doc.line(10, 205, pageWidth - 10, 205);
        doc.line(10, 200, pageWidth - 100, 200);
        doc.line(pageWidth - 220, 150, pageWidth - 220, 105);
        doc.line(pageWidth - 180, 150, pageWidth - 180, 105);
        doc.line(pageWidth - 140, 150, pageWidth - 140, 105);
        doc.line(pageWidth - 100, 200, pageWidth - 100, 105);
        doc.line(pageWidth - 59, 140, pageWidth - 59, 110); //
        doc.line(197, 110, pageWidth - 10, 110);
        doc.line(pageWidth - 110, 46, pageWidth - 110, 105); //ligne fermante Milieu
        doc.line(10, 164, pageWidth - 10, 164);
        doc.line(10, 184, pageWidth - 100, 184);
        doc.line(197, 177, pageWidth - 90, 177);
        doc.line(197, 187, pageWidth - 10, 187);

        //Carre
        doc.rect(10, 160, 5, 4);
        doc.rect(10, 155, 5, 9);
        doc.rect(60, 160, 5, 4);
        doc.rect(60, 155, 5, 9);
        doc.rect(60, 150, 5, 9);
        doc.rect(130, 150, 5, 6);
        //
        doc.rect(60, 184, 5, 5);
        doc.rect(10, 184, 5, 4);
        doc.rect(117, 184, 5, 6);
        doc.line(pageWidth - 237, 200, pageWidth - 237, 185);
        doc.line(pageWidth - 180, 200, pageWidth - 180, 185);
        // generate
        let pdf = doc.output('datauristring', { filename: 'RAB' });
        let uri = pdf.split(',')[1];
        console.log(uri);
        this.src = this._base64ToArrayBuffer(uri);
    }
}
