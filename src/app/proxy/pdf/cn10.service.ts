import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Injectable({
    providedIn: 'root',
})
export class C10PdfService{
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
        //exterieur tableau
        doc.text('Logo', pageWidth / 15, 15, {
            align: 'right',
        });
        doc.text('Carnet C10 Bureau', pageHeight / 2, 19, {
            align: 'center',
        });
        doc.text('Bureau: DAKAR PEYTAVIN', pageWidth / 7, 25, {
            align: 'right',
        });
        doc.text('Responsable:Serigne yamar', pageWidth / 7, 30, {
            align: 'right',
        });
        doc.text(
            'Période du: 30/10/2024    au      04/11/2024',
            pageWidth / 45,
            40,
            {
                align: 'left',
            }
        );
        //intérieur du tableau

        doc.text('Numéro', pageWidth / 9, 50, {
            align: 'right',
        });
        doc.text('Expediteur', pageWidth / 5, 50, {
            align: 'center',
        });
        doc.text('Destinataire', pageWidth / 3, 50, {
            align: 'center',
        });
        doc.text('Code Vignette', pageWidth / 2, 50, {
            align: 'center',
        });
        doc.text('Pays', pageWidth / 1.6, 50, {
            align: 'right',
        });
        doc.text('Valeur Declarée', pageWidth / 1.5, 50, {
            align: 'left',
        });
        doc.text('Poids', pageWidth / 1.3, 50, {
            align: 'left',
        });
        doc.text('Montant', pageWidth / 1.1, 50, {
            align: 'left',
        });
        doc.text('19,452', pageWidth / 1.1, 67, {
            align: 'center',
        });
        doc.text('20,260', pageWidth / 1.1, 75, {
            align: 'center',
        });
        doc.text('2000.0', pageWidth / 1.3, 67, {
            align: 'left',
        });
        doc.text('2000.0', pageWidth / 1.3, 75, {
            align: 'left',
        });
        doc.text('0', pageWidth / 1.5, 67, {
            align: 'left',
        });
        doc.text('0', pageWidth / 1.5, 75, {
            align: 'left',
        });
        doc.text('SUEDE', pageWidth / 1.7, 67, {
            align: 'left',
        });
        doc.text('FRANCE', pageWidth / 1.7, 75, {
            align: 'left',
        });
        doc.text('CP001582378SN', pageWidth / 2, 67, {
            align: 'center',
        });
        doc.text('CP001418589SN', pageWidth / 2, 75, {
            align: 'center',
        });
        doc.text('MOHAMED AATIF', pageHeight / 2, 67, {
            align: 'center',
        });
        doc.text('FIAGNON ENYOMMI', pageHeight / 2, 75, {
            align: 'center',
        });
        doc.text('AHMED AATIF', pageHeight / 3, 67, {
            align: 'right',
        });
        doc.text('MAGUY MARSO', pageHeight / 3, 75, {
            align: 'right',
        });
        doc.text('1', pageHeight / 10, 67, {
            align: 'right',
        });
        doc.text('2', pageHeight / 10, 77, {
            align: 'right',
        });
        doc.setLineWidth(0.5);

        doc.line(10, 46, 10, 80);
        doc.line(40, 46, 40, 80);
        doc.line(80, 46, 80, 80);
        doc.line(130, 46, 130, 80);
        doc.line(170, 46, 170, 80);
        doc.line(194, 46, 194, 80);
        doc.line(225, 46, 225, 80);
        doc.line(255, 46, 255, 80);

        doc.setLineHeightFactor(0.5);

        doc.line(10, 46, pageWidth - 10, 46);
        doc.line(10, 70, pageWidth - 10, 70);
        doc.line(10, 80, pageWidth - 10, 80);
        doc.line(pageWidth - 10, 46, pageWidth - 10, 80); //ligne fermante Milieu

        doc.line(10, 60, pageWidth - 10, 60);

        // generate
        let pdf = doc.output('datauristring', { filename: 'RAB' });
        let uri = pdf.split(',')[1];
        console.log(uri);
        this.src = this._base64ToArrayBuffer(uri);
    }
}
