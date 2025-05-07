import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import JsBarcode from 'jsbarcode';
import { CourrierDto } from '../courrier';
import { SessionService } from '../auth/Session.service';

@Injectable({
    providedIn: 'root',
})
export class PdfService {

    constructor(private sessionService: SessionService) { }
    async generatePDF(data: any): Promise<void> {
        const doc = new jsPDF();

        await this.addHeader(doc);
        this.addRecipientAndSenderInfo(doc, data);
        if (data.details && data.details.length > 0) {
            this.addInvoiceDetails(doc, data);
        } else {
            this.addInvoiceDetailsPoids(doc, data);
        }
        this.addFooter(doc);

        await this.addHeader1(doc);
        this.addRecipientAndSenderInfo1(doc, data);
        if (data.details && data.details.length > 0) {
            this.addInvoiceDetails1(doc, data);
        } else {
            this.addInvoiceDetailsPoids1(doc, data);
        }

        this.addFooter1(doc);
        const fileName = "Reçu_517" + data.code + ".pdf";
        doc.save(fileName);
    }


    private async addHeader(doc: jsPDF): Promise<void> {
        const logoLeft = await this.loadImage("assets/layout/images/poste-removebg-preview.png");

        const logoWidth = 13;
        const logoHeight = 13;

        if (logoLeft) {
            doc.addImage(logoLeft, "PNG", 14, 8, logoWidth, logoHeight);
        }

        const date: Date = new Date();
        const printedBy = `Imprimé le ${date.toLocaleString()} par ${this.sessionService.getAgentAttributes().prenom} ${this.sessionService.getAgentAttributes().nom}`;

        const pageWidth = doc.internal.pageSize.width;
        const printedByWidth = doc.getTextWidth(printedBy);

        const printedByX = pageWidth - printedByWidth - 0.02;
        const printedByY = 14;

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(0, 0, 0);
        doc.text(printedBy, printedByX, printedByY);

        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        const title = "Reçu 517";
        const titleWidth = doc.getTextWidth(title);
        const centerX = (pageWidth - titleWidth) / 2;
        const titleY = 182;
        doc.text(title, centerX, titleY);
    }


    private async addHeader1(doc: jsPDF): Promise<void> {
        const logoLeft = await this.loadImage("assets/layout/images/poste-removebg-preview.png");

        const logoWidth = 13;
        const logoHeight = 13;

        if (logoLeft) {
            doc.addImage(logoLeft, "PNG", 14, 160, logoWidth, logoHeight);
        }

        const date: Date = new Date();
        const printedBy = `Imprimé le ${date.toLocaleString()} par ${this.sessionService.getAgentAttributes().prenom} ${this.sessionService.getAgentAttributes().nom}`;

        const pageWidth = doc.internal.pageSize.width;

        const printedByWidth = doc.getTextWidth(printedBy);

        const printedByX = pageWidth - printedByWidth - 35;

        const printedByY = 160;

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(0, 0, 0);
        doc.text(printedBy, printedByX, printedByY);

        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        const title = "Reçu 517";
        const titleWidth = doc.getTextWidth(title);
        const centerX = (pageWidth - titleWidth) / 2;
        const titleY = 30;
        doc.text(title, centerX, titleY);
    }


    private addRecipientAndSenderInfo(doc: jsPDF, data: CourrierDto): void {
        const pageWidth = doc.internal.pageSize.width;
        const margin = 14;
        const rightMargin = margin;
        const rightTextStartX = pageWidth - rightMargin;

        const lineHeight = 6;
        const fontSize = 9;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(fontSize);

        let yOffset = 28;

        // doc.text(data.codeBarre || "", margin, yOffset);
        // yOffset += lineHeight;

        // doc.text(`Agent : ${this.sessionService.getAgentAttributes().prenom || "" + ' ' +this.sessionService.getAgentAttributes().nom || ""}`, margin, yOffset);
        // yOffset += lineHeight;

        doc.text(`Structure Depot: ${data.structureDepotLibelle || ""}`, margin, yOffset);
        yOffset += lineHeight;

        doc.text(`Pays Origine: ${data.paysOrigineLibelle || ""}`, margin, yOffset);
        yOffset += lineHeight;


        doc.text(`Type Courrier: ${data.typeCourrierLibelle || ""}`, margin, yOffset);
        yOffset += lineHeight;

        doc.text(`Expediteur: ${data.expediteurPrenom || ""} ${data.expediteurNom || ""}`, margin, yOffset);
        yOffset += lineHeight;

        doc.text(`Adresse: ${data.expediteurAdresse || ""} ${data.expediteurNom || ""}`, margin, yOffset);
        yOffset += lineHeight;


        const rightSectionYOffset = yOffset -25;

        let rightYPosition = rightSectionYOffset;

        doc.text(`Destinataire: ${data.destinatairePrenom || ""} ${data.destinataireNom || ""}`, rightTextStartX, rightYPosition, { align: "right" });
        rightYPosition += lineHeight;

        doc.text(`Adresse: ${data.destinataireAdresse || 'N/A'}`, rightTextStartX, rightYPosition, { align: "right" });
        rightYPosition += lineHeight;

        doc.text(`Pays Destination: ${data.paysDestinationLibelle || ""}`, rightTextStartX, rightYPosition, { align: "right" });
        rightYPosition += lineHeight;

        const formatBoolean = (value) => (value ? "oui" : "non");

        doc.text(`Recommandé: ${formatBoolean(data.recommande)}`, rightTextStartX, rightYPosition, { align: "right" });
        rightYPosition += lineHeight;

        doc.text(`AR: ${formatBoolean(data.ar)}`, rightTextStartX, rightYPosition, { align: "right" });
        rightYPosition += lineHeight;

        doc.text(`Express: ${formatBoolean(data.express)}`, rightTextStartX, rightYPosition, { align: "right" });
        rightYPosition += lineHeight;

        this.addBarcode(doc, data.codeBarre, (pageWidth - 50) / 2, rightYPosition - 30, 50, 20);
    }

    private addRecipientAndSenderInfo1(doc: jsPDF, data: CourrierDto): void {
        const pageWidth = doc.internal.pageSize.width;
        const margin = 14;
        const rightMargin = margin;
        const rightTextStartX = pageWidth - rightMargin;
        const lineSpacing = 6;
        let yOffset = 180;

        doc.setFont("helvetica", "normal");
        const fontSize = 9;
        doc.setFontSize(fontSize);
        doc.setTextColor(0, 0, 0);

        // doc.text(data.codeBarre || "", margin, yOffset);
        // yOffset += lineSpacing;

        // doc.text(`Agent : ${this.sessionService.getAgentAttributes().prenom || "" + ' ' +this.sessionService.getAgentAttributes().nom || ""}`, margin, yOffset);
        // yOffset += lineSpacing;


        doc.text(`Structure Depot: ${data.structureDepotLibelle || ""}`, margin, yOffset);
        yOffset += lineSpacing;

        doc.text(`Pays d'origine: ${data.paysOrigineLibelle || ""}`, margin, yOffset);
        yOffset += lineSpacing;

        doc.text(`Type de Courrier: ${data.typeCourrierLibelle || ""}`, margin, yOffset);
        yOffset += lineSpacing;

        // doc.text(`Categorie: ${data.categorieLibelle || ""}`, margin, yOffset,);
        // yOffset += lineSpacing;

        // doc.text(`Poids: ${data.poids || ""}`, margin, yOffset,);
        // yOffset += lineSpacing;

        doc.text(`Expediteur: ${data.expediteurPrenom || ""} ${data.expediteurNom || ""}`, margin, yOffset, );
        yOffset += lineSpacing;


        doc.text(`Adresse : ${data.expediteurAdresse || "N/A"}`, margin, yOffset, );
        yOffset += lineSpacing;

        const rightSectionYOffset = yOffset - 32;

        let rightYPosition = rightSectionYOffset;



        doc.text(`Destinataire: ${data.destinatairePrenom || ""} ${data.destinataireNom || ""}`, rightTextStartX, rightYPosition, { align: "right" });
        rightYPosition += lineSpacing;

        doc.text(`Adresse : ${data.destinataireAdresse || "N/A"}`, rightTextStartX, rightYPosition, { align: "right" });
        rightYPosition += lineSpacing;

        doc.text(`Pays Destination: ${data.paysDestinationLibelle || ""}`, rightTextStartX, rightYPosition, { align: "right" });
        rightYPosition += lineSpacing;

        const formatBoolean = (value) => (value ? "oui" : "non");

        doc.text(`Recommandé: ${formatBoolean(data.recommande)}`, rightTextStartX, rightYPosition, { align: "right" });
        rightYPosition += lineSpacing;

        doc.text(`AR: ${formatBoolean(data.ar)}`, rightTextStartX, rightYPosition, { align: "right" });
        rightYPosition += lineSpacing;

        doc.text(`Express: ${formatBoolean(data.express)}`, rightTextStartX, rightYPosition, { align: "right" });
        rightYPosition += lineSpacing;
        this.addBarcode(doc, data.codeBarre, (pageWidth - 50) / 2, rightYPosition - 15, 50, 20);
    }




    private addWatermark1(
        doc: jsPDF,
        xOffset: number,
        yOffset: number,
        payer: boolean
    ): void {
        const text = payer ? "PAYÉ" : "NON PAYÉ";
        const fontSize = 12;
        const padding = 2;

        const originalTextColor = doc.getTextColor();

        doc.setFont("helvetica", "bold");
        doc.setFontSize(fontSize);

        const textWidth = doc.getTextWidth(text);
        const textHeight = fontSize * 0.35;

        const rectWidth = textWidth + padding * 2;
        const rectHeight = textHeight + padding * 2;

        const rectX = xOffset - rectWidth;
        const rectY = yOffset - rectHeight / 2 + 5;

        const color = payer ? [0, 128, 0] : [255, 0, 0];
        doc.setDrawColor(color[0], color[1], color[2]);
        doc.setLineWidth(1);
        doc.rect(rectX, rectY, rectWidth, rectHeight);

        doc.setTextColor(color[0], color[1], color[2]);
        const textX = rectX + rectWidth / 2;
        const textY = rectY + rectHeight / 2 + textHeight / 3;
        doc.text(text, textX, textY, { align: "center" });

        doc.setTextColor(originalTextColor);
    }

    private async addInvoiceDetails(doc: jsPDF, data: any): Promise<void> {
        const tableColumn = ["Contenu"];
        const tableRows: any[] = [];

        [data].forEach((item) => {
            const itemData = [item.contenu];
            tableRows.push(itemData);
        });

        if (tableRows.length > 0) {
            (doc as any).autoTable({
                head: [tableColumn],
                body: tableRows,
                startY: 68,
                theme: "striped",
                headStyles: { fillColor: [77, 77, 255] },
                styles: { fontSize: 9, halign: "center" },
                margin: { top: 10 },
            });

            const finalY = (doc as any).autoTable.previous.finalY + 5;
            doc.setFontSize(9);
            doc.setFont("helvetica", "normal");
            doc.text(`Poids : ${data.poids} g`, 190, finalY + 5, { align: "right" });
            doc.text(`Montant : ${data.montant} CFA`, 195, finalY + 10, { align: "right" });
         //   doc.text(`Taxe douane: ${data.taxeDouane} CFA`, 195, finalY + 15, { align: "right" });
           // doc.text(`Taxe presentation: ${data.taxePresentation} CFA`, 195, finalY + 20, { align: "right" });

            const totalBoxWidth = 30;
            const totalBoxHeight = 9;
            const totalBoxX = 195 - totalBoxWidth;
            const totalBoxY = finalY + 26;

            doc.setDrawColor(77, 77, 255);
            doc.setFillColor(77, 77, 255);
            doc.rect(totalBoxX, totalBoxY, totalBoxWidth, totalBoxHeight, "FD");

            doc.setFontSize(9);
            doc.setTextColor(255, 255, 255);
            doc.text(
                `Total: ${data.taxeDouane + data.montant + data.taxePresentation} CFA`,
                totalBoxX + 2,
                totalBoxY + 6
            );

            doc.setFontSize(9);
            doc.setTextColor(77, 77, 255);
            doc.text(`Informations de paiement :`, 14, finalY + 10);
            doc.setFontSize(9);
            doc.setTextColor(0, 0, 0);



            doc.text(
                'Méthode de paiement :espéce',
                14,
                finalY + 20
            );
        }
    }

    private addInvoiceDetails1(doc: jsPDF, data: any): void {
        const tableColumn = ["Contenu"];
        const tableRows: any[] = [];

        [data].forEach(item => {
            const itemData = [item.contenu];
            tableRows.push(itemData);
        });

        if (tableRows.length > 0) {
            (doc as any).autoTable({
                head: [tableColumn],
                body: tableRows,
                startY: 224,
                theme: "striped",
                headStyles: { fillColor: [77, 77, 255] },
                styles: { fontSize: 9, halign: "center" },
                margin: { top: 10 },
            });

            const finalY = (doc as any).autoTable.previous.finalY + 5;

            doc.setFontSize(9);
            doc.setFont("helvetica", "normal");
            doc.text(`Poids : ${data.poids} g`, 190, finalY + 5, { align: "right" });
            doc.text(`Montant: ${data.montant} CFA`, 195, finalY + 10, { align: "right" });


            const totalBoxWidth = 30;
            const totalBoxHeight = 9;
            const totalBoxX = 195 - totalBoxWidth;
            const totalBoxY = finalY + 26;

            doc.setDrawColor(77, 77, 255);
            doc.setFillColor(77, 77, 255);
            doc.rect(totalBoxX, totalBoxY, totalBoxWidth, totalBoxHeight, "FD");

            doc.setFontSize(9);
            doc.setTextColor(255, 255, 255);
            doc.text(
                `Total: ${data.taxeDouane +
                data.montant +
                data.taxePresentation} CFA`,
                totalBoxX + 2,
                totalBoxY + 5
            );

            doc.setFontSize(9);
            doc.setTextColor(77, 77, 255);
            doc.text(`Informations de paiement :`, 14, finalY + 10);
            doc.setFontSize(9);
            doc.setTextColor(0, 0, 0);
            const path = window.location.hash.split("guichet")[1];

          //  doc.text(`Options de paiement :  ${"nean"}`, 14, finalY + 15);
            doc.text(
                `Méthode de paiement : espéce`,
                14,
                finalY + 20
            );

            doc.setLineWidth(0.2);
            doc.setDrawColor(0, 0, 0);
            const startX = 10;
            const startY = 150;
            const lineLength = 200;
            const pageWidth = doc.internal.pageSize.width;

            let endX = startX + lineLength;
            if (endX > pageWidth - 10) {
                endX = pageWidth - 10;
            }

            for (let i = startX; i < endX; i += 5) {
                doc.line(i, startY, i + 3, startY);
            }
        }
    }

    private addInvoiceDetailsPoids(doc: jsPDF, data: CourrierDto): void {
        const tableColumn = ["Contenu"];
        const tableRows: any[] = [];

        [data].forEach(item => {
            const itemData = [
                item.contenu,

            ];
            tableRows.push(itemData);
        });

        if (tableRows.length > 0) {
            (doc as any).autoTable({
                head: [tableColumn],
                body: tableRows,
                startY: 85,
                theme: "striped",
                headStyles: { fillColor: [77, 77, 255] },
                styles: { fontSize: 9, halign: "center" },
                margin: { top: 10 },
            })

            const finalY = (doc as any).autoTable.previous.finalY + 5;
            doc.setFontSize(9);
            doc.setFont("helvetica", "normal");
            doc.text(`Poids : ${data.poids} g`, 190, finalY + 5, { align: "right" });
            doc.text(`Montant: ${data.montant} CFA`, 195, finalY + 10, { align: "right" });
         //   doc.text(`Taxe douane: ${data.taxeDouane} CFA`, 195, finalY + 15, { align: "right" });
         //   doc.text(`Taxe presentation: ${data.taxePresentation} CFA`, 195, finalY + 20, { align: "right" });

            const totalBoxWidth = 30;
            const totalBoxHeight = 9;
            const totalBoxX = 195 - totalBoxWidth;
            const totalBoxY = finalY + 18;

            doc.setDrawColor(77, 77, 255);
            doc.setFillColor(77, 77, 255);
            doc.rect(totalBoxX, totalBoxY, totalBoxWidth, totalBoxHeight, "FD");

            doc.setFontSize(9);
            doc.setTextColor(255, 255, 255);
            doc.text(
                `Total: ${data.taxeDouane + data.montant + data.taxePresentation} CFA`,
                totalBoxX + 2,
                totalBoxY + 6
            );

            doc.setFontSize(9);
            doc.setTextColor(77, 77, 255);
            doc.text(`Informations de paiement :`, 14, finalY + 10);
            doc.setFontSize(9);
            doc.setTextColor(0, 0, 0);


       //     doc.text(`Options de paiement :  ${"NEAN"}`, 14, finalY + 15);
            doc.text(
                `Méthode de paiement : espéce`,
                14,
                finalY + 20
            );
        }
    }

    private addInvoiceDetailsPoids1(doc: jsPDF, data: CourrierDto): void {
        const tableColumn = ["Contenu"];
        const tableRows: any[] = [];

        [data].forEach(item => {
            const itemData = [
                item.contenu,
            ];
            tableRows.push(itemData);
        });
        if (tableRows.length > 0) {
            (doc as any).autoTable({
                head: [tableColumn],
                body: tableRows,
                startY: 232,
                theme: "striped",
                headStyles: { fillColor: [77, 77, 255] },
                styles: { fontSize: 9, halign: "center" },
                margin: { top: 10 },
            });

            const finalY = (doc as any).autoTable.previous.finalY + 5;

            doc.setFontSize(9);
            doc.setFont("helvetica", "normal");
            doc.text(`Poids : ${data.poids} g`, 190, finalY + 5, { align: "right" });
            doc.text(`Montant: ${data.montant} CFA`, 195, finalY + 10, { align: "right" });
          /*   doc.text(`Taxe douane: ${data.taxeDouane} CFA`, 195, finalY + 15, {
                align: "right",
            });
            doc.text(`Taxe presentation: ${data.taxePresentation} CFA`, 195, finalY + 20, {
                align: "right",
            }); */

            const totalBoxWidth = 30;
            const totalBoxHeight = 9;
            const totalBoxX = 195 - totalBoxWidth;
            const totalBoxY = finalY + 18;

            doc.setDrawColor(77, 77, 255);
            doc.setFillColor(77, 77, 255);
            doc.rect(totalBoxX, totalBoxY, totalBoxWidth, totalBoxHeight, "FD");

            doc.setFontSize(9);
            doc.setTextColor(255, 255, 255);
            doc.text(
                `Total: ${data.taxeDouane +
                data.montant +
                data.taxePresentation} CFA`,
                totalBoxX + 2,
                totalBoxY + 5
            );

            doc.setFontSize(9);
            doc.setTextColor(77, 77, 255);
            doc.text(`Informations de paiement :`, 14, finalY + 10);
            doc.setFontSize(9);
            doc.setTextColor(0, 0, 0);

         ///   doc.text(`Options de paiement :  ${"NEAN"}`, 14, finalY + 15);
            doc.text(
                `Méthode de paiement : espéce`,
                14,
                finalY + 20
            );

            doc.setLineWidth(0.2);
            doc.setDrawColor(0, 0, 0);
            const startX = 10;
            const startY = 150;
            const lineLength = 200;
            const pageWidth = doc.internal.pageSize.width;

            let endX = startX + lineLength;
            if (endX > pageWidth - 10) {
                endX = pageWidth - 10;
            }

            for (let i = startX; i < endX; i += 5) {
                doc.line(i, startY, i + 3, startY);
            }
        }
    }

    private addFooter(doc: jsPDF): void {
        doc.setFontSize(7);
        doc.setFont("helvetica", "italic");
        doc.setTextColor(77, 77, 255);
        const footerText =
            "Groupe La Poste | Adresse: Avenue Peytavin Dakar, Senegal | Tel: +221 33 839 34 34 | Email: serviceclient@laposte.sn | Site Web: www.laposte.sn";
        const pageWidth = doc.internal.pageSize.width;
        const textWidth = doc.getTextWidth(footerText);
        const centerX = (pageWidth - textWidth) / 2;
        doc.text(footerText, centerX, doc.internal.pageSize.height - 160);


    }
    private addFooter1(doc: jsPDF): void {
        doc.setFontSize(7);
        doc.setFont("helvetica", "italic");
        doc.setTextColor(77, 77, 255);
        const footerText =
            "Groupe La Poste | Adresse: Avenue Peytavin Dakar, Senegal | Tel: +221 33 839 34 34 | Email: serviceclient@laposte.sn | Site Web: www.laposte.sn";
        const pageWidth = doc.internal.pageSize.width;
        const textWidth = doc.getTextWidth(footerText);
        const centerX = (pageWidth - textWidth) / 2;


        doc.text(footerText, centerX, doc.internal.pageSize.height - 9);
    }

    private addBarcode(
        doc: jsPDF,
        text: string,
        x: number,
        y: number,
        width: number,
        height: number
    ): void {
        const canvas = document.createElement("canvas");
        JsBarcode(canvas, text, {
            format: "CODE128",
            displayValue: true,
            // width: width / 100,
            // height: height
        });

        const barcodeImage = canvas.toDataURL("image/png");
        doc.addImage(barcodeImage, "PNG", x, y, width, height);
    }

    private loadImage(src: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                if (ctx) {
                    ctx.drawImage(img, 0, 0);
                    resolve(canvas.toDataURL("image/png"));
                } else {
                    reject(new Error("Failed to get canvas context"));
                }
            };
            img.onerror = () => reject(new Error("Image failed to load: " + src));
            img.src = src;
        });
    }

}
