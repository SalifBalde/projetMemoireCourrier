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


    async  generateReceipt(courrier) {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: [210, 297], // Format A4
        });

       // const logo = await loadImage('assets/layout/images/logo.png');
        let currentY = 10; // Position initiale Y

        // En-tête avec logo et titre
        // Ligne verticale

      //  doc.addImage(logo, 'PNG', 10, currentY, 30, 15);
        doc.setFontSize(16);
        doc.text('Feuille de Route', 105, currentY + 10, { align: 'center' });
        currentY += 5;
        doc.setFontSize(12);
        doc.text('Expédition Envoi Colis', 105, currentY + 15, { align: 'center' });
        currentY += 25;


        doc.line(200, currentY, 200, currentY + 55); // Ligne verticale de 50mm de longueur à la position X=100
        // Ligne horizontale
        doc.line(10, currentY, 200, currentY); // Ligne de séparation

        doc.line(10, currentY, 10, currentY + 55); // Ligne verticale de 50mm de longueur à la position X=100
        currentY += 5;


        // Informations générales
        doc.setFontSize(10);
        doc.text(`Agent: ${courrier.expediteurNom || 'N/A'}`, 10, currentY);
        currentY += 5;
        doc.text(`Bureau Expéditeur: ${courrier.structureDepotLibelle || 'N/A'}`, 10, currentY);
        currentY += 5;
        // Ligne horizontale
        doc.line(10, currentY, 200, currentY); // Ligne de séparation
        currentY += 5;

        doc.text(`Bureau Destinataire: ${courrier.structureDestinationLibelle || 'N/A'}`, 10, currentY);
        currentY += 5;
        doc.text(`Date Expédition: ${courrier.dateExpedition || 'N/A'}`, 10, currentY);
        currentY += 5;

        // Ligne horizontale
        doc.line(10, currentY, 200, currentY); // Ligne de séparation
        currentY += 5;

        // Table des colis - Entêtes
        doc.setFontSize(10);
        doc.text('N°', 15, currentY);
        doc.text('Code Barre', 30, currentY);
        doc.text('Poids (g)', 60, currentY);
        doc.text('Destinataire', 90, currentY);
        doc.text('Expediteur', 120, currentY);
        doc.text('Pays', 150, currentY);
        doc.text('Taxe ', 170, currentY);
        doc.text('Taxe Douane', 180, currentY);
        currentY += 5;

        // Ligne de séparation
        doc.line(10, currentY, 200, currentY);
        currentY += 5;



        // Remplir les détails du colis
        doc.text(`1`, 15, currentY); // N°
        doc.text(`${courrier.codeBarre || 'N/A'}`, 30, currentY); // Code Barre
        doc.text(`${courrier.poids || 0}`, 60, currentY); // Poids
        doc.text(`${courrier.destinataireNom || 'N/A'}`, 90, currentY); // Nom Destinataire
        doc.text(`${courrier.expediteurNom || 'N/A'}`, 120, currentY); // Nom Destinataire
        doc.text(`${courrier.paysOrigineLibelle || 'N/A'}`, 150, currentY); // Pays
        doc.text(`${courrier.taxePresentation || 0}`, 170, currentY); // Taxe Port
        doc.text(`${courrier.taxeDouane || 0}`, 180, currentY); // Taxe Douane
        //currentY += 5;

        // Ligne de séparation
        doc.line(10, currentY, 200, currentY);
        currentY += 5;

        // Totaux
        doc.setFontSize(12);
        const totalPoids = courrier?.taxePresentation?.reduce((acc, colis) => acc + (colis.poids || 0), 0);
        const totalTaxeDouane = courrier?.taxePresentation?.reduce((acc, colis) => acc + (colis.taxeDouane || 0), 0);
        currentY += 8;
        doc.text(`Totaux:`, 10, currentY);
        doc.text(`Poids Total: ${totalPoids} g`, 40, currentY);
        doc.text(`Taxe : ${totalTaxeDouane} FCFA`, 170, currentY);


// Ligne de séparation
        doc.line(10, currentY, 200, currentY);
        currentY += 5;





        // Pied de page
      //  doc.addImage(logo, 'PNG', 10, 270, 30, 15);
        doc.setFontSize(10);
        doc.text('Merci pour votre confiance !', 105, 280, { align: 'center' });

        // Sauvegarder le PDF
        doc.save(`Feuille_De_Route_${courrier.id || 'N/A'}.pdf`);
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
