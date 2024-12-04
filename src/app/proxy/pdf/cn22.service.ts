import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


@Injectable({
    providedIn: 'root',
})
export class Cn22Service {
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
        const doc = new jsPDF({ format: 'a3', orientation: 'landscape' });

        const pageHeight =
            doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
        const pageWidth =
            doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
        console.log(pageHeight + ',' + pageWidth);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        //exterieur tableau


        //intérieur du tableau

        doc.text('DECLARATION EN DOUANE', pageWidth / 13, 55, {
            align: 'center',
        });

        doc.text('Peut etre ouvert d\'office', pageWidth / 5, 55, {
            align: 'center',
        });

        doc.text('CN22', pageWidth / 3, 53, {
            align: 'center',
        });


        doc.text('Important!\nVoir instructions\n au verso', pageHeight / 2, 67, {
            align: 'right',
        });
        doc.text('', pageHeight / 2, 69, {
            align: 'right',
        });

        doc.text('Administration des ', pageHeight / 7, 67, {
            align: 'right',
        });

        doc.text(' Cadeau\n Documents', pageHeight / 6, 83, {
            align: 'right',
        });
        doc.text(' Echantillons commercial\n Autres', pageHeight / 3, 83, {
            align: 'center',
        });

        doc.text(' Cooner la ou les cases\n appropriées', pageHeight / 2.1, 85, {
            align: 'center',
        });
        doc.setLineWidth(0.5);

        doc.line(10, 46, 10, 199);
        doc.line(60, 46, 60, 53);
        doc.line(120, 60, 120,66 );
        // doc.line(130, 46, 130, 80);
        doc.line(20, 90, 20, 80);
        doc.line(10, 86, pageWidth - 400, 86);
        doc.line(80, 90, 80, 80);
        doc.line(75, 90, 75, 80);
        doc.line(75, 86, pageWidth - 340, 86);
        doc.line(10, 86, pageWidth - 400, 86);
        doc.line(10, 149, pageWidth - 310, 149);
        doc.line(138, 160, 138, 90);
        doc.line(110, 160, 110, 90);
        doc.line(10, 105, pageWidth - 260, 105);
        doc.line(10, 130, pageWidth - 260, 130);
        doc.line(10, 160, pageWidth - 260, 160);
        doc.line(10, 199, pageWidth - 260, 199);
        doc.setLineHeightFactor(0.5);

        doc.line(10, 46, pageWidth - 260, 46);
        doc.line(10, 90, pageWidth - 260, 90);
        doc.line(10, 80, pageWidth - 260, 80);
        doc.line(10, 60, pageWidth - 260, 60);
        doc.line(pageWidth - 260, 46, pageWidth - 260, 199);


        // generate
        let pdf = doc.output('datauristring', { filename: 'RAB' });
        let uri = pdf.split(',')[1];
        console.log(uri);
        this.src = this._base64ToArrayBuffer(uri);
    }
}
