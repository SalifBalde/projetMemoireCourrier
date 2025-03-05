import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { CourrierDto } from '../courrier';
import JsBarcode from 'jsbarcode';

@Injectable({
    providedIn: 'root',
})
export class Cn22Service {
    async createPDF(data: any): Promise<void> {
        const doc = new jsPDF({ format: 'a4', orientation: 'p' });
        const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
        const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
        console.log(pageHeight + ',' + pageWidth);
        this.addHeader(doc, pageWidth, data);
        this.addRecipientInfo(doc, pageWidth, data);
        this.addSenderInfo(doc, pageWidth, data);
        this.addDetails(doc, pageWidth, data);
        this.totals(doc, pageWidth, data);
        this.addFooter(doc, pageWidth, data);
        this.drawLines(doc);

        const fileName = "Facture_CN23.pdf";
        doc.save(fileName);
    }

    private addHeader(doc: jsPDF, pageWidth: number, data: CourrierDto): void {


        const barcodeCanvas = document.createElement('canvas');
        JsBarcode(barcodeCanvas, `${data.codeBarre}`, {
            format: 'CODE128',
            displayValue: false,
            width: 1,
            height: 47,
        });
        const barcodeImage = barcodeCanvas.toDataURL('image/png');
        doc.addImage(barcodeImage, 'PNG', 8, 9, 170, 30); // Déplace légèrement à gauche
        doc.setFontSize(12);
        doc.text(` ${data.codeBarre}`, pageWidth / 2.4, 39, { align: 'center', });
        doc.setFontSize(22);
        doc.text('CUSTUM', pageWidth / 7.6, 49, { align: 'center' });
        doc.text('DECLARATION', pageWidth / 5.4, 59, { align: 'center' });
        doc.setFontSize(15);
        doc.text('May be opened', pageWidth / 1.7, 47, { align: 'right' });
        doc.text('officialy', pageWidth / 2.4, 53, { align: 'left' });
        doc.setFontSize(42);
        doc.text('CN', pageWidth / 1.5, 58, { align: 'center' });
        doc.text('22', pageWidth / 1.3, 58, { align: 'center' });
    }

    private addRecipientInfo(doc: jsPDF, pageWidth: number, data: CourrierDto): void {
        doc.setFontSize(18);
        doc.text('Designated operator', pageWidth / 5.2, 72, { align: 'center' });
        doc.setFontSize(23);
        doc.text(`${data.paysOrigineLibelle}`, pageWidth / 4.3, 83, { align: 'center' });
        doc.setFontSize(15);
        doc.text('Gift', pageWidth / 9, 96, { align: 'center' });
        doc.text('Documents', pageWidth / 6.4, 104, { align: 'center' });
        doc.text('Sales of goods', pageWidth / 5.7, 112, { align: 'center' });
        doc.text('     Commercial sample', pageWidth / 2.1, 96, { align: 'center', });
        doc.text('   Returns goods', pageWidth / 2.2, 104, { align: 'center', });
        doc.text('      Other :', pageWidth / 2.5, 112, { align: 'center', });
    }

    private addSenderInfo(doc: jsPDF, pageWidth: number, data: CourrierDto): void {
        doc.text('Quantity and detailed', pageWidth / 5.7, 122, { align: 'center', });
        doc.text('description of content', pageWidth / 5.7, 129, { align: 'center', });
        doc.text('Net', pageWidth / 2.8, 122, { align: 'center', });
        doc.text('  Weight', pageWidth / 2.7, 129, { align: 'center', });
        doc.text('Value and ', pageWidth / 1.9, 122, { align: 'center', });
        doc.text('Currency', pageWidth / 1.9, 129, { align: 'center', });
        doc.text('HS tariff   ', pageWidth / 1.5, 122, { align: 'center', });
        doc.text('Number  ', pageWidth / 1.5, 129, { align: 'center', });
        doc.text('Country', pageWidth / 1.3, 122, { align: 'center', });
        doc.text('of origin', pageWidth / 1.3, 129, { align: 'center', });
    }

    private addDetails(doc: jsPDF, pageWidth: number, data: CourrierDto): void {

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


        let yPosition = 142;
        let montant = 5.00;
        let weight = 0;
        let totalWeight = 0;
        let totalValue = 0;
        if (data) {
            doc.text('', pageWidth / 5.7, yPosition, { align: 'center' });
            if (result && result.length > 0) {
                result.forEach((contenu) => {
                    let itemMontant = contenu.col2;
                    let weight = contenu.col3 || 0;
                    let quantity = contenu.col1 || 0;
                    let description = contenu.description || "null";
                    doc.text(`${description}`, pageWidth / 5.3, yPosition, { align: 'center', });
                    doc.text(`${quantity}`, pageWidth / 17, yPosition, { align: 'center', });
                    doc.text(`${weight} g`, pageWidth / 2.6, yPosition, { align: 'center' });
                    doc.text(`${itemMontant} XOF`, pageWidth / 1.9, yPosition, { align: 'center' });
                    totalValue += itemMontant;
                    totalWeight += weight;
                    yPosition += 7;
                });
            } else {
                doc.text(`${montant} XOF`, pageWidth / 1.9, yPosition, { align: 'center' });
            }

            doc.text('', pageWidth / 1.6, yPosition, { align: 'center' });
            // let destinationText = doc.splitTextToSize(`${data.paysDestinationLibelle}`, pageWidth / 4);
            // doc.text(destinationText, pageWidth / 1.3, yPosition, { align: 'center' });
        } else {
            doc.setFontSize(9);
            doc.text('No details available.', 10, yPosition);
        }
        doc.setFont('helvetica', 'bold');
        // doc.text(`${data.poids}`, pageWidth / 2.5, 227, { align: 'center' });
        doc.setFont('helvetica', 'bold');
        doc.text(`${totalWeight} g`, pageWidth / 2.5, 227, { align: 'center' });
        doc.text(`${totalValue} XOF`, pageWidth / 1.9, 227, { align: 'center' });
    }

    private totals(doc: jsPDF, pageWidth: number, data: CourrierDto): void {
        doc.setFont('helvetica', 'italic');
        doc.text('Total weight (in kg)', pageWidth / 5.7, 231, { align: 'center' });
    }

    private addFooter(doc: jsPDF, pageWidth: number, data: CourrierDto): void {
        doc.setFont('helvetica');
        doc.setFontSize(12);
        doc.text(`            I, the undersigned, whose name and address are given on the item, certify that
         the particulars given in this declaration are correct and that this item does not
         contain any dangerous article or articlesprohibited by legislation or by postal
         regulation
          `, pageWidth / 170, 247, { align: 'left', });

        doc.text(`Date and sender's signature`, pageWidth / 4.8, 283, { align: 'center' });
        doc.text(`${data.createdAt}`, pageWidth / 4.8, 288, { align: 'center' });
    }

    private drawLines(doc: jsPDF): void {
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
    }
}

