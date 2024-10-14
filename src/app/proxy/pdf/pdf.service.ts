import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import JsBarcode from 'jsbarcode';
import {ColisDto} from "../colis";

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor() {}

  async generatePDF(data: any): Promise<void> {
    const doc = new jsPDF();
    await this.addHeader(doc);
    this.addRecipientAndSenderInfo(doc, data);
    this.addInvoiceDetails(doc, data);
    this.addFooter(doc);
    const fileName = 'Facture'+data.code+'.pdf'
    doc.save(fileName);
  }

  private async addHeader(doc: jsPDF): Promise<void> {
    // Load images
    const logoLeft = await this.loadImage('assets/layout/images/laposte.jpeg');
    const logoRight = await this.loadImage('assets/layout/images/logo.png');
    // Add left logo
    if (logoLeft) {
      doc.addImage(logoLeft, 'PNG', 14, 10, 25, 25);
    } else {
      console.error('Logo gauche non téléchargé.');
    }

    // Add right logo
    if (logoRight) {
      doc.addImage(logoRight, 'PNG', 176, 10, 25, 25);
    } else {
      console.error('Logo droit non téléchargé.');
    }

    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    const title = 'Facture';
    const titleWidth = doc.getTextWidth(title);
    const pageWidth = doc.internal.pageSize.width;
    const centerX = (pageWidth - titleWidth) / 2;
    doc.text(title, centerX, 22);

     // Add underline below the title
  const titleY = 25; // Adjust the Y position for the underline
  doc.setLineWidth(0.5);
  doc.setDrawColor(0, 0, 139); // Line color
  doc.line(centerX, titleY, centerX + titleWidth, titleY); // Draw line below title

  }

  private addRecipientAndSenderInfo(doc: jsPDF, data: any): void {
    const pageWidth = doc.internal.pageSize.width;

    // Add recipient's information on the left
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(data.bureauDepotLibelle, 14, 42);
    doc.setFontSize(12);
    doc.text(`Expéditeur: ${data.nomClient}`, 14, 50);
    doc.text(`Prénom: ${data.prenomDestinataire}`, 14, 55);
    doc.text(`Addresse: ${data.adresseDestinataire}`, 14, 60);
    doc.text(`Téléphone: ${data.telephoneDestinataire}`, 14, 65);

    // Add sender's information on the right
    doc.setFontSize(14);
    doc.text(data.bureauDestinationLibelle, pageWidth - 14, 42, { align: 'right' });
    doc.setFontSize(12);
    doc.text(`Destinataire: ${data.prenomDestinataire} ${data.nomDestinataire}`, pageWidth - 14, 50, { align: 'right' });
    doc.text(`Téléphone: ${data.telephoneDestinataire}`, pageWidth - 14, 55, { align: 'right' });
    doc.text(`Adresse: ${data.adresseDestinataire}`, pageWidth - 14, 60, { align: 'right' });

    // Add barcode in the middle
    this.addBarcode(doc, data.code, (pageWidth - 50) / 2, 70, 50, 20);  // Adjusted size and position
  }

  private addInvoiceDetails(doc: jsPDF, data: any): void {
    const tableColumn = ["Code", "Prénom destinataire", "Nom destinataire", "Montant", "Date d'envoi"];
    const tableRows = [];

    data.details.forEach((item, index) => {
      const itemData = [
        item.code,
          item.prenomDestinataire,
        item.nomDestinataire,
        item.montant,
          item.createdAt
      ];
      tableRows.push(itemData);
    });

    // Use autoTable from jspdf-autotable
    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 100,
      theme: 'striped',
      headStyles: { fillColor: [0, 0, 139] },
      styles: { fontSize: 12, halign: 'center' },
    });

    const finalY = (doc as any).autoTable.previous.finalY + 10;

    // Add totals
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Montant: ${data.montant} CFA`, 190, finalY, { align: "right" });
    doc.text(`Livraison: ${data.fraisLivraison} CFA`, 190, finalY + 5, { align: "right" });
    doc.text(`Enlevement: ${data.fraisEnlevement} CFA`, 190, finalY + 10, { align: "right" });

    // Add total box
    const totalBoxWidth = 40;
    const totalBoxHeight = 10;
    const totalBoxX = 196 - totalBoxWidth;
    const totalBoxY = finalY + 12;

    doc.setDrawColor(0, 0, 190);
    doc.setFillColor(0, 0, 190);
    doc.rect(totalBoxX, totalBoxY, totalBoxWidth, totalBoxHeight, 'FD');

    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.text(`Total: ${data.fraisLivraison + data.montant + data.fraisEnlevement} CFA`, totalBoxX + 2, totalBoxY + 7);

    // Add payment information
    doc.setDrawColor(0, 0, 139);
    doc.setLineWidth(1);
    doc.line(14, finalY + 25, 196, finalY + 25);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 139);
    doc.text('Payment Information:', 14, finalY + 35);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Payment Options: Counter', 14, finalY + 45);
    doc.text('Payment Method: Wave', 14, finalY + 55);
  }


  async generateAgentSalesReport(data: ColisDto[]): Promise<void> {
    const doc = new jsPDF();
    await this.addHeader(doc);
    this.addSalesByAgent(doc, data);
    this.addFooter(doc);
    doc.save('rapport_periodique.pdf');
  }

  private addHeaderReport1(doc: jsPDF, data: any): void {
    // Title
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Rapport périodique', 14, 25);

    // Subtitle with date range
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Period: ${data.startDate} to ${data.endDate}`, 14, 35);

    // Add a line below the title
    doc.setLineWidth(1);
    doc.setDrawColor(0, 0, 139);
    doc.line(14, 40, doc.internal.pageSize.width - 14, 40);
  }

  private addSalesByAgent(doc: jsPDF, data: ColisDto[]): void {
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Liste Colis', 14, 50);

    const tableColumn = ["Code", "Prénom destinataire", "Nom destinataire", "Montant", "Date d'envoi"];
    const tableRows = [];

    if (data && Array.isArray(data)) {
      data.forEach((item: ColisDto) => {
        if (item.code && item.prenomDestinataire && item.nomDestinataire && item.montant && item.createdAt) {
          const itemData = [
            item.code,
            item.prenomDestinataire,
            item.nomDestinataire,
            `${item.montant} CFA`,
              item.createdAt,
          ];
          tableRows.push(itemData);
        }
      });

      (doc as any).autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 60,
        theme: 'striped',
        headStyles: { fillColor: [0, 0, 139], textColor: [255, 255, 255] },
        styles: { fontSize: 12, halign: 'center' },
        columnStyles: { 0: { cellWidth: 40 }, 1: { cellWidth: 30 }, 2: { cellWidth: 60 }, 3: { cellWidth: 30 }, 4: { cellWidth: 40 } }
      });

      // Summary
      const totalSales = data.reduce((acc: number, item: any) => acc + item.montant, 0);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(`Total Sales: ${totalSales} CFA`, 190, (doc as any).autoTable.previous.finalY + 10, { align: 'right' });
    } else {
      console.error('Invalid sales data.');
    }
  }



  private addFooter(doc: jsPDF): void {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(0, 0, 139);
    //doc.text('Company Information', 14, doc.internal.pageSize.height - 40);
    doc.setFont('helvetica', 'normal');
    doc.text('Groupe La Poste', 14, doc.internal.pageSize.height - 30);
    doc.text('Address: Avenue Peytavin Dakar, Senegal', 14, doc.internal.pageSize.height - 25);
    doc.text('Tel: +221 33 839 34 34', 14, doc.internal.pageSize.height - 20);
    doc.text('Email: serviceclient@laposte.sn', 14, doc.internal.pageSize.height - 15);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(0, 0, 139);
    doc.text('www.laposte.com', 14, doc.internal.pageSize.height - 10);
  }

  private addBarcode(doc: jsPDF, text: string, x: number, y: number, width: number, height: number): void {
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, text, {
      format: 'CODE128',
      displayValue: true,
     // width: width / 100,  // Adjusted width for scaling
     // height: height       // Adjusted height for scaling
    });

    const barcodeImage = canvas.toDataURL('image/png');
    doc.addImage(barcodeImage, 'PNG', x, y, width, height);
  }

  private loadImage(src: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/png'));
        } else {
          reject(new Error('Failed to get canvas context'));
        }
      };
      img.onerror = () => reject(new Error('Image failed to load: ' + src));
      img.src = src;
    });
  }
}
