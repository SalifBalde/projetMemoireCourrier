import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { CourrierDto } from '../courrier';

@Injectable({
    providedIn: 'root',
})
export class Cn23Service {



    async createPDF(data: any): Promise<void> {
        const doc = new jsPDF({ format: 'A4', orientation: 'landscape' });

        this.addHeader(doc, data);
        this.addRecipientInfo(doc, data);
        this.addSenderInfo(doc, data);
        this.addDetails(doc, data);
        this.addFooter(doc, data);
        this.drawLines(doc, data);

        const fileName = "Facture_CN23.pdf";
        doc.save(fileName);
    }

    private addHeader(doc: jsPDF, data: CourrierDto) {
        const pageHeight = doc.internal.pageSize.height;
        const pageWidth = doc.internal.pageSize.width;

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.text('De', pageWidth / 50, 25, { align: 'right' });
        doc.text('BULLETIN EXPEDITION', pageWidth / 2, 14, { align: 'left' });
        doc.text(' CP71', pageHeight / 1, 14, { align: 'center' });
        doc.text('(ancien CP2)', pageWidth / 2, 35, { align: 'left' });
        doc.text(' ', pageWidth / 2, 40, { align: 'left' });
        doc.text('Valeur déclarée', pageWidth / 2, 50, { align: 'left' });
        doc.text(`${data.valeurDeclare}`, pageHeight / 1, 50, { align: 'center' });
        doc.text('(Apposer les étiquettes officielles le cas échéant)', pageWidth / 2.3, 75, { align: 'left' });
        doc.text(`Poids:                 ${data.poids}              g`, pageWidth / 2.3, 90, { align: 'left' });
        doc.text(`Taxe de port:     ${data.taxeDouane}`, pageWidth / 2.3, 95, { align: 'left' });
        doc.text(`Taxe VD:            ${data.taxePresentation}`, pageWidth / 2.3, 100, { align: 'left' });
        doc.text(`Net A payer:      ${data.montant}`, pageWidth / 2.3, 105, { align: 'left' });
    }

    private addRecipientInfo(doc: jsPDF, data: CourrierDto) {
        const pageWidth = doc.internal.pageSize.width;

        doc.text('Reçu de dépot dun colis postal', pageWidth / 1.01, 18, { align: 'right' });
        doc.text(`${data.typeCourrierLibelle}`, pageWidth / 1.03, 7, { align: 'right' });
        doc.text('Numéro  ', pageWidth / 1.01, 3, { align: 'right' });
        doc.text("     Partie à remplir par l'expediteur", pageWidth / 1.01, 30, { align: 'right' });
        doc.text('DESTINATAIRE', pageWidth / 1.05, 40, { align: 'right' });
        doc.text(`Prenom: ${data.destinatairePrenom}`, pageWidth / 1.09, 50, { align: 'right' });
        doc.text(`Nom: ${data.destinataireNom}`, pageWidth / 1.11, 60, { align: 'right' });
        doc.text('Adresse:', pageWidth / 1.17, 66, { align: 'right' });
        // doc.text('123 GREY ST EAST MELBOURNE', pageWidth / 1.12, 69, { align: 'right' });
        // doc.text('VICTORIA 3002 AUSTRALIA', pageWidth / 1.12, 73, { align: 'right' });
        doc.text(`Poids: ${data.poids} g`, pageWidth / 1.15, 85, { align: 'right' });
        doc.text(`Taxe de port: ${data.taxeDouane}`, pageWidth / 1.11, 89, { align: 'right' });
        doc.text(`Taxe VD:${data.taxePresentation}`, pageWidth / 1.14, 94, { align: 'right' });
        doc.text(`Net A payer: ${data.montant}`, pageWidth / 1.10, 99, { align: 'right' });
    }

    private addSenderInfo(doc: jsPDF, data: CourrierDto) {
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;

        doc.text('01  ', pageWidth / 2, 120, { align: 'center' });
        doc.text('Bureau ', pageHeight / 1, 120, { align: 'left' });
        doc.text(`${data.structureDepotLibelle}`, pageHeight / 1, 135, { align: 'center' });
        doc.text('Valeur déclarée en  ', pageWidth / 2, 130, { align: 'center' });
        doc.text('Poids brute ', pageWidth / 2, 145, { align: 'center' });
        doc.text(`Taxe ${data.taxeDouane}`, pageWidth / 1.8, 145, { align: 'left' });
        doc.text("J'ai perçu le colis sur ce ", pageHeight / 1, 160, { align: 'center' });
        doc.text(' CFA', pageWidth / 2, 149, { align: 'center' });
        doc.text('Déclaration ', pageWidth / 2.040, 158, { align: 'center' });
        doc.text('Date et signature ', pageWidth / 2.05, 163, { align: 'center' });
        doc.text('Je certifie que cette envoie ne contient   ', pageWidth / 2, 180, { align: 'left' });
        doc.text('aucun objet dangereux interdit par la   ', pageWidth / 2, 189, { align: 'left' });
    }

    private addDetails(doc: jsPDF, data: CourrierDto) {
        const pageWidth = doc.internal.pageSize.width;

        doc.text('A remplir par le bureau de  ', pageWidth / 1.05, 110, { align: 'right' });
        doc.text('Numéro colis: ', pageWidth / 1.11, 120, { align: 'right' });
        doc.text(`${data.codeBarre}`, pageWidth / 1.10, 130, { align: 'right' });
        doc.text('NOTA -Aucune réclamation ne peut   ', pageWidth / 1, 170, { align: 'right' });
        doc.text('etre examinée sans la production du', pageWidth / 1.0085, 178, { align: 'right' });
        doc.text(`Taxe reçue :${data.taxePresentation}`, pageWidth / 1.09, 195, { align: 'right' });
    }

    private async addFooter(doc: jsPDF, data: CourrierDto) {
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;

        const imagePath = 'assets/layout/images/poste-removebg-preview.png';
        doc.addImage(imagePath, 'PNG', pageWidth / 15, -1, 12, 7);

        doc.text("Nom et Adresse, Colis Postal et Téléphone de l'expediteur", pageWidth / 3, 15, { align: 'right' });
        doc.setFontSize(9);
        doc.text(`${data.expediteurNom}`, pageWidth / 8, 30, { align: 'right' });
        doc.text(`${data.expediteurPrenom}`, pageWidth / 3, 30, { align: 'center' });
        doc.text(`${data.expediteurAdresse}`, pageWidth / 6, 35, { align: 'right' });
        doc.text(`${data.expediteurTelephone}`, pageWidth / 7, 40, { align: 'right' });
        doc.text('13000', pageWidth / 11, 45, { align: 'right' });
        doc.text('A', pageWidth / 50, 59, { align: 'right', });

        doc.text('Nom et Adresse,Colis Postal et le Téléphone du destinataire y compis', pageHeight / 13, 50, { align: 'left', });
        doc.text(`${data.destinataireNom}`, pageHeight / 13, 60, { align: 'left', });
        doc.text(`${data.destinatairePrenom}`, pageHeight / 3, 60, { align: 'left', });
        doc.text(`${data.destinataireAdresse}`, pageHeight / 13, 68, { align: 'left', });
        doc.text(`${data.paysDestinationLibelle}`, pageHeight / 13, 75, { align: 'left', });
        doc.text(`${data.destinataireTelephone}`, pageHeight / 13, 80, { align: 'left', });
        doc.text('3002', pageHeight / 13, 89, { align: 'left', });
        doc.text('Timbre de la ', pageHeight / 13, 95, { align: 'left', });
        doc.text('Bureau ', pageHeight / 3, 95, { align: 'left', });
        doc.text(`${data.structureDestinationLibelle}`, pageWidth / 4, 99, { align: 'left', });
        doc.text('Droit de douane ', pageHeight / 13, 105, { align: 'left', });
        doc.text('Catégorie de colis ', pageHeight / 13, 115, { align: 'left', });
        doc.text('aerien ', pageHeight / 10, 150, { align: 'left', });
        doc.text('surface ', pageWidth / 4, 150, { align: 'left', });
        doc.text('A', pageWidth / 50, 59, { align: 'right' });
        doc.text(`Bureau: ${data.structureDepotLibelle}`, pageHeight / 10, 8, { align: 'left' });
        doc.text('LA POSTEE SENEGAL', pageHeight / 2, 3, { align: 'right' });
        doc.text(`Agent: Aliou Balde`, pageWidth / 2, 8, { align: 'center' });
        doc.text("Instruction de l'expéditeur en cas de non-livraison ", pageHeight / 13, 160, { align: 'left' });
        doc.text("Renvoyer à l'expéditeur ", pageHeight / 13, 170, { align: 'left' });
        doc.text('Remarque:Pour tenir compte des besoins de leur service, les Administrations ont la latitude d utiliser cette formule unique,soit comme partie de la formule-Liasse CP72 ', pageHeight / 29, 209, { align: 'left', });
        doc.setLineWidth(0.5);
    }

    private drawLines(doc: jsPDF, data: CourrierDto) {
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        doc.setLineWidth(0.7);
        doc.line(0, 10, 0, 206);
        doc.line(10, 0, 10, 0);
        doc.line(10, 17, 10, 203);
        doc.line(pageWidth - 0, -105, pageWidth - 0, 206);
        doc.line(pageWidth - 57, 10, pageWidth - 57, 206);
        doc.line(0, 10, pageWidth - 0, 10);
        doc.circle(270, 155, 10);
        doc.rect(65, 146, 8, 4);
        doc.rect(11, 146, 8, 4);
        doc.line(300, 20, pageWidth - 57, 20);
        doc.line(300, 80, pageWidth - 57, 80);
        doc.line(300, 100, pageWidth - 57, 100);
        doc.line(300, 140, pageWidth - 57, 140);
        doc.line(300, 190, pageWidth - 57, 190);
        doc.line(300, 206, pageWidth - 57, 206);
        doc.setLineHeightFactor(0.5);
        doc.line(0, 17, pageHeight - 83, 17);
        doc.line(127, 125, pageWidth - 102, 125);
        doc.line(127, 140, pageWidth - 102, 140);
        doc.line(195, 110, 195, 153);
        doc.line(0, 46, pageWidth - 60, 46);
        doc.line(pageWidth - 60, 46, pageWidth - 60, 202);
        doc.line(10, 90, pageWidth - 170, 90);
        doc.line(127, 175, pageWidth - 60, 175);
        doc.line(160, 140, 160, 175);
        doc.line(10, 110, pageWidth - 60, 110);
        doc.line(10, 153, pageWidth - 60, 153);
        doc.line(0, 206, pageWidth - 10, 206);
        doc.line(10, 203, pageWidth - 60, 202);
        doc.line(10, 100, 65, 100);
        doc.line(10, 110, 65, 110);
        doc.line(10, 60, 10, 193);
        doc.line(127, 70, pageWidth - 60, 70);
        doc.line(pageWidth - 170, 17, pageWidth - 170, 202);
        doc.line(65, 90, 65, 110);
    }
}
