import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import JsBarcode from 'jsbarcode';
import { CourrierDto } from '../courrier/models';

@Injectable({
  providedIn: 'root',
})
export class FactureService {
  constructor() {}


 async generateReceipt(courrier: CourrierDto) {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [80, 150], // Format ticket : largeur 80mm
    });

    const logoRight = await this.loadImage('assets/layout/images/laposte.jpeg');

    let currentY = 10; // Position Y initiale

    // Logo
    doc.addImage(logoRight, 'PNG', 25, currentY, 30, 10);
    currentY += 15;

    // Titre
    doc.setFontSize(12);
    doc.text('Groupe La Poste Sénégal', 10, currentY);
    currentY += 5;

    doc.setFontSize(10);
    doc.text(`Structure: ${courrier.structureDepotLibelle || 'N/A'}`, 10, currentY);
    currentY += 5;

    doc.text(`Ticket N°: ${courrier.id || 'N/A'}`, 10, currentY);
    currentY += 5;

    doc.text('-------------------------------', 10, currentY);
    currentY += 5;

    // Expéditeur
    doc.text('Expéditeur:', 10, currentY);
    currentY += 5;
    doc.text(`${courrier.expediteurNom || ''} ${courrier.expediteurPrenom || ''}`, 10, currentY);
    currentY += 5;
    doc.text(`Tel: ${courrier.expediteurTelephone || 'N/A'}`, 10, currentY);
    currentY += 5;

    // Destinataire
    doc.text('Destinataire:', 10, currentY);
    currentY += 5;
    doc.text(`${courrier.destinataireNom || ''} ${courrier.destinatairePrenom || ''}`, 10, currentY);
    currentY += 5;
    doc.text(`Tel: ${courrier.destinataireTelephone || 'N/A'}`, 10, currentY);
    currentY += 5;

    doc.text('-------------------------------', 10, currentY);
    currentY += 5;

    // Détails du courrier
    doc.text(`Type: ${courrier.typeCourrierLibelle}`, 10, currentY);
    currentY += 5;
    doc.text(`Code Barre: ${courrier.codeBarre || 'N/A'}`, 10, currentY);
    currentY += 5;
    doc.text(`Poids: ${courrier.poids || 0} kg`, 10, currentY);
    currentY += 5;

    // Montants
    doc.text('-------------------------------', 10, currentY);
    currentY += 5;
    doc.text(`Montant: ${courrier.montant || 0} FCFA`, 10, currentY);
    currentY += 5;
    doc.text(`Taxe Douane: ${courrier.taxeDouane || 0} FCFA`, 10, currentY);
    currentY += 5;
    doc.text(`Taxe Présentation: ${courrier.taxePresentation || 0} FCFA`, 10, currentY);
    currentY += 5;

    doc.text('-------------------------------', 10, currentY);
    currentY += 5;
    doc.setFontSize(12);
    doc.text(`Total: ${courrier.montant || 0} FCFA`, 10, currentY);
    currentY += 10;

    // Message de fin
    doc.setFontSize(10);
    doc.text('Merci pour votre confiance !', 15, currentY);
    currentY += 5;

    doc.text('-------------------------------', 10, currentY);
    currentY += 5;

    // Génération du PDF
    doc.save(`Ticket_Courrier_${courrier.id || 'N/A'}.pdf`);
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
