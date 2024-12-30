// pdf-generator.service.ts
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
 class PdfGeneratorService {
  private _base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binary_string = window.atob(base64.replace(/\\n/g, ''));
    const bytes = new Uint8Array(binary_string.length);
    for (let i = 0; i < binary_string.length; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  generateShippingBulletin(data: ShippingData): ArrayBuffer {
    const doc = new jsPDF({ format: 'a4', orientation: 'landscape' });
    
    this.drawHeader(doc);
    this.drawSenderInfo(doc, data.sender);
    this.drawReceiverInfo(doc, data.receiver);
    this.drawShippingDetails(doc, data.shipping);
    this.drawFooter(doc);
    this.drawBorders(doc);

    const pdf = doc.output('datauristring', { filename: 'BulletinExpedition' });
    return this._base64ToArrayBuffer(pdf.split(',')[1]);
  }

  private drawHeader(doc: jsPDF): void {
    const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    
    doc.text('De', pageWidth / 50, 10, { align: 'right' });
    doc.text('BULLETIN EXPEDITION', pageWidth / 2, 4, { align: 'left' });
    doc.text('CP71', pageWidth / 2, 3, { align: 'center' });
    doc.text('(ancien CP2)', pageWidth / 2, 13, { align: 'left' });
    doc.text('CP0016011001SN', pageWidth / 2, 20, { align: 'left' });
  }

  private drawSenderInfo(doc: jsPDF, sender: SenderInfo): void {
    const pageWidth = doc.internal.pageSize.width;
    
    doc.text('Nom et Adresse, Colis Postal et Téléphone de expéditeur', pageWidth / 3, 3, {
      align: 'right'
    });
    doc.text(sender.name, pageWidth / 8, 9, { align: 'right' });
    doc.text(sender.firstName, pageWidth / 3, 10, { align: 'center' });
    doc.text(sender.address, pageWidth / 6, 15, { align: 'right' });
    doc.text(sender.phone, pageWidth / 7, 20, { align: 'right' });
    doc.text(sender.postalCode, pageWidth / 11, 25, { align: 'right' });
  }

  private drawReceiverInfo(doc: jsPDF, receiver: ReceiverInfo): void {
    const pageHeight = doc.internal.pageSize.height;
    
    doc.text('A', pageHeight / 50, 39, { align: 'right' });
    doc.text('Nom et Adresse, Colis Postal et le Téléphone du destinataire y compris', pageHeight / 13, 35, {
      align: 'left'
    });
    doc.text(receiver.name, pageHeight / 13, 40, { align: 'left' });
    doc.text(receiver.firstName, pageHeight / 3, 40, { align: 'left' });
    doc.text(receiver.address, pageHeight / 13, 48, { align: 'left' });
    doc.text(receiver.country, pageHeight / 13, 55, { align: 'left' });
    doc.text(receiver.phone, pageHeight / 13, 60, { align: 'left' });
    doc.text(receiver.postalCode, pageHeight / 13, 68, { align: 'left' });
  }

  private drawShippingDetails(doc: jsPDF, shipping: ShippingDetails): void {
    const pageWidth = doc.internal.pageSize.width;
    
    doc.text(`Valeur déclarée: ${shipping.declaredValue}`, pageWidth / 2, 50, { align: 'left' });
    doc.text('(Apposer les étiquettes officielles le cas échéant)', pageWidth / 2, 77, { align: 'left' });
    doc.text(`Poids: ${shipping.weight} g`, pageWidth / 2, 88, { align: 'left' });
    doc.text(`Taxe de port: ${shipping.shippingCost}`, pageWidth / 2, 95, { align: 'left' });
    doc.text(`Taxe VD: ${shipping.vdTax}`, pageWidth / 2, 100, { align: 'left' });
    doc.text(`Net A payer: ${shipping.totalAmount}`, pageWidth / 2, 108, { align: 'left' });
  }

  private drawFooter(doc: jsPDF): void {
    const pageHeight = doc.internal.pageSize.height;
    
    doc.text('Instruction de l\'expéditeur en cas de non-livraison', pageHeight / 13, 160, { align: 'left' });
    doc.text('Renvoyer à l\'expéditeur', pageHeight / 13, 170, { align: 'left' });
    doc.text('Remarque: Pour tenir compte des besoins de leur service, les Administrations ont la latitude d\'utiliser cette formule unique, soit comme partie de la formule-liasse CP72', 
      pageHeight / 13, 201, { align: 'left' });
  }

  private drawBorders(doc: jsPDF): void {
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    
    doc.setLineWidth(0.5);
    
    // Vertical lines
    doc.line(0, 0, 0, 270);
    doc.line(10, 5, 10, 130);
    doc.line(pageWidth - 20, -10, pageWidth - 20, 250);
    doc.line(pageWidth - 1, 0, pageWidth - 0, 280);
    
    // Horizontal lines
    doc.line(0, 0, pageWidth - 1, 0);
    doc.line(10, 5, pageHeight - 63, 5);
    doc.line(147, 125, pageWidth - 62, 125);
    // ... autres lignes de bordure
  }
}

// models.ts
interface ShippingData {
  sender: SenderInfo;
  receiver: ReceiverInfo;
  shipping: ShippingDetails;
}

interface SenderInfo {
  name: string;
  firstName: string;
  address: string;
  phone: string;
  postalCode: string;
}

interface ReceiverInfo {
  name: string;
  firstName: string;
  address: string;
  country: string;
  phone: string;
  postalCode: string;
}

interface ShippingDetails {
  declaredValue: number;
  weight: number;
  shippingCost: number;
  vdTax: number;
  totalAmount: number;
}

// shipping-bulletin.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shipping-bulletin',
  template: `
    <div class="shipping-bulletin">
      <!-- Votre template ici -->
    </div>
  `
})
export class ShippingBulletinComponent implements OnInit {
  src: ArrayBuffer;

  constructor(private pdfGenerator: PdfGeneratorService) {}

  ngOnInit(): void {
    const shippingData: ShippingData = {
      sender: {
        name: 'PATERSON',
        firstName: 'BARBARA',
        address: 'HOTEL NDIAMBOUR',
        phone: '00221338227745',
        postalCode: '13000'
      },
      receiver: {
        name: 'PATERSON',
        firstName: 'BARBARA',
        address: '123 GREY ST EAST MELBOURNE VICTORIA 300S AUSTRALIA',
        country: 'AUSTRALIA',
        phone: '+61413542629',
        postalCode: '3002'
      },
      shipping: {
        declaredValue: 0,
        weight: 5000,
        shippingCost: 57.96,
        vdTax: 0,
        totalAmount: 57.96
      }
    };

    this.src = this.pdfGenerator.generateShippingBulletin(shippingData);
  }
}