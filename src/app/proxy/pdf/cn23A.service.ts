import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import JsBarcode from 'jsbarcode';
import { CourrierDto } from '../courrier';

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

    createPDF(data: any): void {
        const doc = new jsPDF({ format: 'a4', orientation: 'landscape' });

        this.addHeader(doc, data);
        this.addRecipientInfo(doc, data);
        this.addSenderInfo(doc, data);
        this.addDetails(doc, data);
        this.addFooter(doc, data);
        this.drawLines(doc);

        const fileName = `CN23${data.expediteurPrenom}.pdf`;
        doc.save(fileName);
    }

    addHeader(doc: jsPDF, data: CourrierDto): void {
        const pageHeight = doc.internal.pageSize.height;
        const pageWidth = doc.internal.pageSize.width;

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(13);
        doc.text('CUSTOMS DECLARATION                        CN23', pageHeight / 1.1, 45, { align: 'left' });
        doc.setFontSize(9)

        const barcodeCanvas = document.createElement('canvas');
        JsBarcode(barcodeCanvas, `${data.codeBarre}`, {
            format: 'CODE128',
            displayValue: true,
            width: 1,
            height: 25,
        });

        const barcodeImage = barcodeCanvas.toDataURL('image/png');
        doc.addImage(barcodeImage, 'PNG', 196, 63, 80, 30);
        doc.line(pageWidth - 38, 46, pageWidth - 38, 52);
        doc.line(pageWidth - 38, 59.2, pageWidth - 38, 65);
    }

    addRecipientInfo(doc: jsPDF, data: CourrierDto): void {
        const pageHeight = doc.internal.pageSize.height;

        doc.text('No. of item (barcode if any)', pageHeight / 1.1, 50, { align: 'left' });

        doc.text("N° de l'envoie(code à barres ,s'il existe)", pageHeight / 1.1, 63, { align: 'left' });


        doc.text(`Name : ${data.expediteurPrenom} ${data.expediteurNom}`, pageHeight / 19, 49, { align: 'left' });
        doc.text(`Adresse :  `, pageHeight / 19, 57, { align: 'left' });
        doc.text('Adresse (count)', pageHeight / 19, 63, { align: 'left' });
        doc.text(`PostCode   ${data.expediteurPrenom}    City DAKAR`, pageHeight / 19, 73, { align: 'left' });
        doc.text(`State ${data.paysOrigineLibelle}                        COUNTRY SN (${data.paysOrigineLibelle})`, pageHeight / 2.2, 78, { align: 'right' });
        doc.setFontSize(6)
        doc.text(`             Sender’s Customs reference
             (if any) Référence en douane
             de l'expéditeur (si elle existe)`, pageHeight / 1.4, 49, { align: 'left' });
        doc.setFontSize(13);
        doc.text('DECLARATION EN DOUANE', pageHeight / 1.1, 58, { align: 'left' });
        doc.setFontSize(10);
        doc.text('From', pageHeight / 290, 49, { align: 'left' });
        doc.setFontSize(9)
        doc.text('De', pageHeight / 290, 52, { align: 'left' });
        doc.setFontSize(7)

        doc.text("Peut être ouvert d'office", pageHeight / 0.8, 63, { align: 'left' });
        doc.text("May be opened officially", pageHeight / 0.8, 50, { align: 'left' });
    }

    addSenderInfo(doc: jsPDF, data: CourrierDto): void {
        const pageHeight = doc.internal.pageSize.height;

        doc.text(`Name : ${data.destinatairePrenom}  ${data.destinataireNom}`, pageHeight / 19, 83, { align: 'left' });
        doc.text(`Adresse : ${data.destinataireAdresse} `, pageHeight / 19, 88, { align: 'left' });
        doc.text('Adresse (count) ', pageHeight / 19, 94, { align: 'left' });
        doc.text('Impoter reference', pageHeight / 1, 94, { align: 'center' });
        doc.text('Impoter telephone', pageHeight / 1, 103, { align: 'center' });
        doc.text(`PostCode ${data.destinataireCodePostal}    City  `, pageHeight / 19, 99, { align: 'left' });
        doc.text(`State ${data.paysDestinationLibelle}                                           COUNTRY US(${data.paysDestinationLibelle})`, pageHeight / 19, 103, { align: 'left' });
        doc.setFontSize(10)
        doc.text('To', pageHeight / 290, 83, { align: 'left' });
        doc.setFontSize(9)
        doc.text('A', pageHeight / 290, 88, { align: 'left' });
    }


    addDetails(doc: jsPDF, data: CourrierDto): void {
        // Étape 1: Diviser et filtrer les éléments
        const items = data.contenu.split(';').filter(item => item); // Filtrer pour supprimer les chaînes vides

        // Étape 2: Transformer chaque entrée en objet
        const result = items.map(item => {
            const [description, quantite, valeur, poids] = item.split(':'); // Diviser par :
            return {
                description, // "DOCS" ou "CHAUSS"
                col1: Number(quantite), // Convertir en nombre
                col2: Number(valeur),
                col3: Number(poids),
            };
        });

        const date = new Date();
        const createdAt = new Date(data.createdAt);
        const formattedDateNow = date.toLocaleDateString("fr-FR");
        const formattedDate = createdAt.toLocaleDateString("fr-FR");

        const pageHeight = doc.internal.pageSize.height;
        const startY = 120; // Position Y de départ pour le tableau
        const startX = 20;  // Position X de départ pour le tableau
        const rowHeight = 5; // Hauteur de chaque ligne du tableau
        const colWidth = 40; // Largeur de chaque colonne du tableau

        let sumCol3 = 0;
        let sumCol2 = 0;

        // Dessiner les lignes du tableau
        result.forEach((detail, index) => {
            const y = startY + (index * rowHeight);

            sumCol3 += Number(detail.col3) || 0;
             sumCol2 += Number(detail.col2) || 0;

            doc.text(detail.description || '', startX, y);
            doc.text(detail.col1.toString(), startX + colWidth +22, y);
            doc.text(detail.col3.toString(), startX + 3 * colWidth, y);
            doc.text(detail.col2.toString(), startX + 4 * colWidth, y);
        });

        // Continuer avec le reste du formulaire
        doc.setFontSize(9);
        doc.text('Description', startX, startY - 10);
        doc.text('         Net Weight(3) ', pageHeight / 1.4 , 109, { align: 'left' });
        doc.setFontSize(7);
        doc.text(`            Poids Net(in kg)`, pageHeight / 1.4, 112, { align: 'left' });
        doc.setFontSize(9);
        doc.text('Quantity(2)', startX + colWidth +22, 109, { align: 'left' });
        doc.setFontSize(7);
        doc.text('Quantité', startX + colWidth+ 22, 112, { align: 'left' });

        doc.setFontSize(9);
        doc.text('For commercial items only ', pageHeight / 1, 108, { align: 'left' });
        doc.text('HS tarif numner(7)      Country of Origin of goods(8)', pageHeight / 1, 113, { align: 'left' });
        // doc.text(`${data.poids}`, pageHeight / 1.2, 118, { align: 'left' });
        // doc.text(`${data.valeurDeclare}`, pageHeight / 1.6, 118, { align: 'left' });

        doc.setFontSize(9);
        doc.text('Valeur(5)', startX + 3 * colWidth, 109, { align: 'left' });
        doc.setFontSize(7);
        doc.text('Valeur', startX + 3 * colWidth, 112, { align: 'left' });

        let yPosition = 118;
        let montant = 0;
        let totalWeight = 0;
        let weight = 0;
        let totalValue = 0 ;


        // Section Totals
        const hierarchicalValue = '1.2.9';
        const parts = hierarchicalValue.split('.');
        const positionFactor = parseInt(parts[0]) + parseInt(parts[1]) / 6.2 + parseInt(parts[2]) / 1000;
        const yPos = pageHeight / positionFactor;
        doc.text(`Total gross weight (4)`, yPos, 143, { align: 'left' });
        doc.setFontSize(7);
        doc.text('Poids total (4)', yPos, 146, { align: 'left' });
        doc.setFontSize(10);
        doc.text(`${sumCol2} Kg`, pageHeight / 1.1, 149, { align: 'right' });

        doc.setFontSize(9);
        doc.text(`Total value (5)`, pageHeight / 1.4, 143, { align: 'right' });
        doc.setFontSize(7);
        doc.text(' Valeur total (5)', pageHeight / 1.8, 146, { align: 'left' });
        doc.setFontSize(10);
        doc.text(`${sumCol3} XOF`, pageHeight / 1.5, 149, { align: 'left' });


        // doc.setFontSize(9);
        // doc.text('Total gross weight (4)', pageHeight / 1.4, 143, { align: 'right' });
        // doc.setFontSize(7);
        // doc.text('Poids total (5)', pageHeight / 1.8, 146, { align: 'left' });
        // doc.setFontSize(10);
        // doc.text('11300000', pageHeight / 1.5, 149, { align: 'left' });

        // Postal Charges/Fees
        doc.setFontSize(9);
        doc.text('Postal Charges/Fees (9)', pageHeight / 1.06, 143, { align: 'left' });
        doc.setFontSize(7);
        doc.text('Frais de port/Frais', pageHeight / 0.9, 143, { align: 'left' });
        doc.setFontSize(10);
        doc.text(``, pageHeight / 0.8, 149, { align: 'left' });

        // Category of item
        doc.setFontSize(9);
        doc.text('Category of item(10)', pageHeight / 19, 153, { align: 'left' });
        doc.setFontSize(5);
        doc.text('Catégorie de l\'envoi', pageHeight / 5, 153, { align: 'left' });
        doc.setFontSize(8);
        doc.text('Gift ', pageHeight / 13, 158, { align: 'left' });
        doc.text(`Documents`, pageHeight / 13, 162, { align: 'left' });

        doc.setFontSize(5);
        doc.text('cadeau', pageHeight / 9, 158, { align: 'left' });
        doc.setFontSize(9);
        doc.text(`Commercial sample (10)`, pageHeight / 3.2, 153, { align: 'left' });
        doc.setFontSize(5)
        doc.text('     Echantillon commercial', pageHeight / 2.08, 153, { align: 'left' });
        doc.setFontSize(8);
        doc.text('Returned goods ', pageHeight / 3.2, 158, { align: 'left' });
        doc.text(`Other`, pageHeight / 3.2, 162, { align: 'left' });
        doc.setFontSize(9);
        doc.text('              Sales of goods :', pageHeight / 1.7, 153, { align: 'left' });
        doc.setFontSize(9);
        doc.text('           Explanation:', pageHeight / 1.7, 162, { align: 'left' });
        doc.setFontSize(7)
        doc.text('   Explication:', pageHeight / 1.4, 162, { align: 'left' });
        doc.setFontSize(5)
        doc.text(`Vente de biens`, pageHeight / 1.3, 153, { align: 'left' });


        // // Sales of goods
        // doc.setFontSize(9);
        // doc.text('Sales of goods:', pageHeight / 1.7, 153, { align: 'left' });
        // doc.setFontSize(9);
        // doc.text('Explanation:', pageHeight / 1.7, 162, { align: 'left' });
        // doc.setFontSize(7);
        // doc.text('Explication:', pageHeight / 1.4, 162, { align: 'left' });
        // doc.setFontSize(7);
        // doc.text('Vente de biens', pageHeight / 1.3, 153, { align: 'left' });

        // Office of origin/Date of posting
        doc.setFontSize(9);
        doc.text('Office of origin/Date of posting', pageHeight / 1.06, 153, { align: 'left' });
        doc.setFontSize(7);
        doc.text('Bureau d\'origine/Date de dépôt', pageHeight / 0.9, 155, { align: 'left' });
        doc.setFontSize(9);
        doc.text(formattedDateNow, pageHeight / 0.9, 162, { align: 'left' });



        // Certification
        doc.setFontSize(7);
        doc.text('I certify that the particulars given in this customs declaration are \n correct and that this item does not contain any \ndangerous article or articles prohibited by legislation or\n by postal or customs regulations.', pageHeight / 1.06, 167, { align: 'left' });
        doc.setFontSize(7);
        doc.text('Date and sender’s signature (15)', pageHeight / 1.06, 180, { align: 'left' });
        doc.setFontSize(9);
        doc.text(formattedDate, pageHeight / 1.06, 184, { align: 'left' });

        // Comments
        doc.setFontSize(8);
        doc.text('Comments (11): (e.g.: goods subject to quarantine, sanitary/phytosanitary inspection or other restrictions)', pageHeight / 19, 167, { align: 'left' });
        doc.setFontSize(7);
        doc.text('Observations: (p. ex. Marchandise soumise à la quarantaine/à des contrôles sanitaires, phytosanitaires ou à d\'autres restrictions)', pageHeight / 19, 171, { align: 'left' });

        // Licence, Certificate, Invoice
        doc.setFontSize(9);
        doc.text('Licence (12)', pageHeight / 13, 187, { align: 'left' });
        doc.setFontSize(6);
        doc.text('Licence', pageHeight / 6, 187, { align: 'left' });
        doc.setFontSize(8);
        doc.text('No(s). of licence(s)', pageHeight / 19, 192, { align: 'left' });

        doc.setFontSize(9);
        doc.text('Certificate (13)', pageHeight / 3.2, 187, { align: 'left' });
        doc.setFontSize(6);
        doc.text('Certificat', pageHeight / 2.3, 187, { align: 'left' });
        doc.setFontSize(8);
        doc.text('No(s). of certificate(s)', pageHeight / 3.4, 192, { align: 'left' });

        doc.setFontSize(9);
        doc.text('Invoice (14)', pageHeight / 1.7, 187, { align: 'left' });
        doc.setFontSize(6);
        doc.text('Facture', pageHeight / 1.4, 187, { align: 'left' });
        doc.setFontSize(8);
        doc.text('No. of invoice', pageHeight / 1.8, 192, { align: 'left' });
    }

    addFooter(doc: jsPDF, data: CourrierDto): void {
        const pageHeight = doc.internal.pageSize.height;
        const pageWidth = doc.internal.pageSize.width;

        // doc.text('Page footer - CN23', pageWidth - 50, pageHeight - 10, { align: 'center' });
    }

    drawLines(doc: jsPDF): void {
        const pageHeight = doc.internal.pageSize.height;
        const pageWidth = doc.internal.pageSize.width;

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
        doc.line(pageWidth - 59, 140, pageWidth - 59, 110);
        doc.line(197, 110, pageWidth - 10, 110);
        doc.line(pageWidth - 110, 46, pageWidth - 110, 105);
        doc.line(10, 164, pageWidth - 10, 164);
        doc.line(10, 184, pageWidth - 100, 184);
        doc.line(197, 177, pageWidth - 90, 177);
        doc.line(197, 187, pageWidth - 10, 187);
        doc.rect(10, 160, 5, 4);
        doc.rect(10, 155, 5, 9);
        doc.rect(60, 160, 5, 4);
        doc.rect(60, 155, 5, 5);
        doc.rect(60, 150, 5, 5);
        doc.rect(130, 150, 5, 5);
        doc.rect(60, 184, 5, 5);
        doc.rect(10, 184, 5, 5);
        doc.rect(117, 184, 5, 5);
        doc.line(pageWidth - 237, 200, pageWidth - 237, 185);
        doc.line(pageWidth - 180, 200, pageWidth - 180, 185);
    }
}
