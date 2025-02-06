import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import JsBarcode from 'jsbarcode';
import { CourrierDto } from '../courrier/models';
import {FermetureService} from "../fermeture";
import {SessionService} from "../auth/Session.service";

@Injectable({
  providedIn: 'root',
})
export class FactureService {
     user: any;
  constructor(  private  fermetureService: FermetureService,
                private sessionService: SessionService,
  ) {
      this.user= this.sessionService.getAgentAttributes()
      console.log(this.user)
  }

    async generateReceipt(courriers: any, fermeture: any) {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: [210, 297], // Format A4
        });

        // Charger l'image du logo en base64
        try {
            const logoBase64 = await this.loadImage("assets/layout/images/poste-removebg-preview.png"); // Remplace par l'URL de ton logo
            // Ajouter le logo en haut à gauche
            doc.addImage(logoBase64, 'PNG', 5, 5, 40, 30); // Position (10, 10) et taille (30, 20)
        } catch (error) {
            console.error('Erreur lors du chargement de l\'image : ', error);
        }
        const date = new Date(); // Obtenir l'heure actuelle du système
        const heure = date.getHours(); // Récupérer l'heure
        const minutes = date.getMinutes(); // Récupérer les minutes
        const secondes = date.getSeconds(); // Récupérer les secondes

        // Diminuer la taille de la police
        doc.setFontSize(4); // Réduit la taille de la police à 4 pour le contenu général
        const heureFormatee = `${heure}:${minutes < 10 ? '0' + minutes : minutes}:${secondes < 10 ? '0' + secondes : secondes}`;
        const formattedDate = date.toLocaleString('fr-FR', { // formatage en français
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
        // Calculer le nombre d'objets
        const numberOfObjects = courriers.length;
        let currentY = 10;
        let currentG = 100;

        doc.setFontSize(9); // Réduire la taille pour l'en-tête secondaire
        doc.text(` Le  ${formattedDate}`, 250, currentY, { align: 'center' });
        currentY += 18;

        // En-tête
        doc.setFontSize(12); // Taille de police plus grande pour l'en-tête
        doc.text('Feuille de Route', 148.5, currentY, { align: 'center' });
        currentY += 8;
        const dateText = heureFormatee; // Utilisez la variable `fermeture` iciconst dateText = fermeture; // Utilisez la variable `fermeture` ici
        doc.setFontSize(9); // Réduire la taille pour l'en-tête secondaire
        doc.text(`Expédition Envoi : ${courriers[0].typeCourrierLibelle}`, 148.5, currentY, { align: 'center' });
        currentY += 3;


        // Ligne de séparation
        doc.line(10, currentY, 287, currentY);
        currentY += 6;

        // Informations générales
        doc.setFont("helvetica", "bold");
        doc.text('Agent: ', 10, currentY); // "Agent" en gras
        doc.setFont("helvetica", "normal");
        doc.text(`${this.user.prenom + ' ' + this.user.nom || 'N/A'}`, 30, currentY); // Nom de l'agent en normal
        currentY += 6;

        doc.setFont("helvetica", "bold");
        doc.text('Bureau Expéditeur: ', 10, currentY);
        doc.setFont("helvetica", "normal");
        doc.text(`${fermeture.structureDepotLibelle || 'N/A'}`, 50, currentY);
        currentY += 4;
        doc.line(currentG + 50, currentY, currentG + 50, currentY + 24); // Ligne verticale après la colonne "Code Barre"
        currentY += 0;

        // Ligne de séparation
        doc.line(10, currentY, 287, currentY);
        currentY += 6;

        // Bureau Destinataire
        doc.setFont("helvetica", "bold");
        doc.text('Bureau Destinataire: ', 10, currentY);
        doc.setFont("helvetica", "normal");
        doc.text(`${fermeture.structureDestinationLibelle || 'N/A'}`, 50, currentY);
        currentY += 6;

        // Date Expédition
        doc.setFont("helvetica", "bold");
        doc.text('Date Expédition: ', 10, currentY);
        doc.setFont("helvetica", "normal");
        doc.text(`${fermeture.date|| 'N/A'}`, 50, currentY);

        currentY += 6;
        doc.setFont("helvetica", "bold");
        doc.text('Nbre d\'objets : ', 10, currentY);
        doc.setFont("helvetica", "normal");
        doc.text(`${numberOfObjects}`, 40, currentY); // Affichage du nombre d'objets

        doc.setFont("helvetica", "bold");
        doc.text('Numero Dépeche: ', 190, currentY);
        doc.setFont("helvetica", "normal");
        doc.text(`${fermeture.numeroDepeche}`, 220, currentY); // Affichage du nombre d'objets

        currentY += 6;
        doc.line(10, currentY, 287, currentY);
        currentY += 6;

        // Largeur des colonnes
        const columnWidths = {
            number: 8, // N° réduit
            codeBarre: 30, // Code Barre réduit
            poids: 20, // Poids réduit
            destinataire: 40, // Destinataire réduit
            expediteur: 40, // Expéditeur réduit
            pays: 30, // Pays réduit
            taxe: 20, // Taxe réduite
            taxeDouane: 20, // Taxe Douane réduite
        };

        // Entêtes du tableau en gras
        doc.setFont("helvetica", "bold");
        let currentX = 10;
        doc.text('N°', currentX, currentY);
        currentX += columnWidths.number;
        doc.text('Code Barre', currentX, currentY);
        currentX += columnWidths.codeBarre;
        doc.text('Poids (g)', currentX, currentY);
        currentX += columnWidths.poids;
        doc.text('Destinataire', currentX, currentY);
        currentX += columnWidths.destinataire;
        doc.text('Expéditeur', currentX, currentY);
        currentX += columnWidths.expediteur;
        doc.text('Pays', currentX, currentY);
        currentX += columnWidths.pays;
        doc.text('Taxe', currentX, currentY);
        currentX += columnWidths.taxe;
        doc.text('Taxe Douane', currentX, currentY);
        currentY += 4;

        // Ligne de séparation
        doc.line(10, currentY, 287, currentY);
        currentY += 4;

        // Remplir les données du tableau
        doc.setFont("helvetica", "normal");
        courriers.forEach((colis, index) => {
            currentX = 10; // Réinitialiser la position X pour chaque ligne
            doc.text(`${index + 1}`, currentX, currentY); // N° (index de l'élément)
            currentX += columnWidths.number;
            doc.text(`${colis.codeBarre || 'N/A'}`, currentX, currentY); // Code Barre
            currentX += columnWidths.codeBarre;
            doc.text(`${colis.poids || 0}`, currentX, currentY); // Poids
            currentX += columnWidths.poids;

            // Destinataire (Nom et Prénom)
            const destinataireNomPrenom = `${colis.destinatairePrenom || 'N/A'} ${colis.destinataireNom || 'N/A'}`;
            doc.text(destinataireNomPrenom, currentX, currentY); // Destinataire
            currentX += columnWidths.destinataire;

            // Expéditeur (Nom et Prénom)
            const expediteurNomPrenom = `${colis.expediteurPrenom || 'N/A'} ${colis.expediteurNom || 'N/A'}`;
            doc.text(expediteurNomPrenom, currentX, currentY); // Expéditeur
            currentX += columnWidths.expediteur;

            doc.text(`${colis.paysOrigineLibelle || 'N/A'}`, currentX, currentY); // Pays
            currentX += columnWidths.pays;
            doc.text(`${colis.taxePresentation || 0}`, currentX, currentY); // Taxe
            currentX += columnWidths.taxe;
            doc.text(`${colis.taxeDouane || 0}`, currentX, currentY); // Taxe Douane
            currentY += 4;

            doc.line(10, currentY, 287, currentY); // Ligne de séparation
            currentY += 6;

            // Gérer le dépassement de page
            if (currentY > 190) {
                doc.addPage();
                currentY = 10;
            }
        });


        // Ajouter les lignes verticales
        const leftX = 10; // Position X de la ligne verticale gauche
        const rightX = 287; // Position X de la ligne verticale droite
        const startY = 39; // Position Y de départ pour la ligne verticale
        const endY = currentY + 6; // Position Y de fin (juste avant la dernière ligne)

        // Ligne verticale gauche
        doc.line(leftX, startY, leftX, endY);

        // Ligne verticale droite
        doc.line(rightX, startY, rightX, endY);

        // Totaux
        const totalPoids = courriers.reduce((sum, colis) => sum + (colis.poids || 0), 0);
        const totalTaxeDouane = courriers.reduce((sum, colis) => sum + (colis.taxeDouane || 0), 0);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.text(`Totaux :`, 10, currentY);
        doc.text(`Poids Total: ${totalPoids} g`, 40, currentY);
        doc.text(`Taxe Douane: ${totalTaxeDouane} FCFA`, 190, currentY);
        currentY += 6;
        doc.line(10, currentY, 287, currentY);
        currentY += 20;

        // Ajout des sections Bureau Expéditeur et Bureau Destinataire avec leurs Signatures
        doc.setFontSize(8); // Réduit la taille pour le bas du document
        doc.text('Bureau Expéditeur:', 10, currentY); // Bureau Expéditeur
        doc.text('Bureau Destinataire:', 200, currentY); // Bureau Destinataire (aligné à droite)
        currentY += 30;

        // Pied de page
        doc.setFontSize(8); // Taille de police pour le pied de page
        doc.text('Merci pour votre confiance !', 148.5, currentY, { align: 'center' });

        // Sauvegarder le PDF
        doc.save(`Feuille_De_Route_${courriers[0].id || 'N/A'}.pdf`);
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
