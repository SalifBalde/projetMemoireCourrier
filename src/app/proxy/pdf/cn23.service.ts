import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { CourrierDto } from '../courrier';

@Injectable({
    providedIn: 'root',
})
export class Cn23Service {



    async createPDF(data: any, fullname: string): Promise<void> {
        const doc = new jsPDF({ format: 'A4', orientation: 'landscape' });

        this.addHeader(doc, data);
        this.addRecipientInfo(doc, data);
        this.addSenderInfo(doc, data);
        this.addDetails(doc, data);
        this.addFooter(doc, data, fullname);
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
        doc.text('(ancien CP2)', pageWidth / 1.5, 28, { align: 'left' });
        doc.text(`${data.codeBarre }`, pageWidth / 2, 26, { align: 'left' });
        doc.text(' ', pageWidth / 2, 40, { align: 'left' });
        doc.text('Valeur déclarée', pageWidth / 2, 55, { align: 'left' });
        doc.text(`${data.valeurDeclare ?? 'Nan'}`, pageHeight / 1, 55, { align: 'center' });
        doc.text('(Apposer les étiquettes officielles le cas échéant)', pageWidth / 2.3, 75, { align: 'left' });
        doc.text(`Poids:                 ${data.poids ?? 'Nan'}              g`, pageWidth / 2.3, 90, { align: 'left' });
        doc.text(`Taxe de port:     ${data.taxeDouane ?? 'Nan'}`, pageWidth / 2.3, 95, { align: 'left' });
        doc.text(`Taxe VD:            ${data.taxePresentation ?? 'Nan'}`, pageWidth / 2.3, 100, { align: 'left' });
        doc.text(`Net A payer:      ${data.montant ?? 'Nan'}`, pageWidth / 2.3, 105, { align: 'left' });
    }


    private addRecipientInfo(doc: jsPDF, data: CourrierDto) {
        const pageWidth = doc.internal.pageSize.width;
        const marginRight = pageWidth / 1.14;
        const lineHeight = 6;
        doc.text('Reçu de dépot d\'un colis postal', pageWidth / 1.01, 18, { align: 'right' });
        doc.text(`${data.typeCourrierLibelle ?? 'Nan'}`, pageWidth / 1.03, 7, { align: 'right' });
        doc.text('Numéro  ', pageWidth / 1.01, 3, { align: 'right' });
        doc.text("     Partie à remplir par l'expediteur", pageWidth / 1.01, 30, { align: 'right' });
        doc.text('DESTINATAIRE', pageWidth / 1.05, 40, { align: 'right' });

        const labelX = 241;
        const valueX = 264;


        doc.text(`Prénom :`, labelX, 47);
        doc.text(`${data.destinatairePrenom ?? 'Nan'}`, valueX, 47, { align: 'right' });

        doc.text(`Nom :`, labelX, 55);
        doc.text(`${data.destinataireNom ?? 'Nan'}`, valueX, 55, { align: 'right' });

        const adresse = data.destinataireAdresse ?? 'Nan';
        const splitByChars = (text, maxLength) => {
            const result = [];
            for (let i = 0; i < text.length; i += maxLength) {
                result.push(text.slice(i, i + maxLength));
            }
            return result;
        };

        const adresseLines = splitByChars(`Adresse : ${adresse}`, 27);
        const adresseX = labelX;
        let adresseY = 62;

        adresseLines.forEach(line => {
            doc.text(line, adresseX, adresseY);
            adresseY += 4;
        });

        doc.text(`Poids :`, labelX, 85);
        doc.text(`${data.poids ?? 'Nan'} g`, valueX, 85);

        doc.text(`Taxe de port :`, labelX, 89);
        doc.text(`${data.taxeDouane ?? 'Nan'}`, valueX, 89);

        doc.text(`Taxe VD :`, labelX, 94);
        doc.text(`${data.taxePresentation ?? 'Nan'}`, valueX, 94);

        doc.text(`Net à payer :`, labelX, 99);
        doc.text(`${data.montant ?? 'Nan' }`, valueX, 99);
    }


    private addSenderInfo(doc: jsPDF, data: CourrierDto) {
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;

        doc.text('01  ', pageWidth / 2, 120, { align: 'center' });
        doc.text('Bureau ', pageHeight / 1, 120, { align: 'left' });
        doc.text(`${data.structureDepotLibelle ?? 'Nan'}`, pageHeight / 1, 135, { align: 'center' });
        doc.text('Valeur déclarée en  ', pageWidth / 2, 130, { align: 'center' });
        doc.text('Poids brute ', pageWidth / 2, 145, { align: 'center' });
        doc.text(`${data.poids ?? 'Nan'} g`, pageWidth / 2, 149, { align: 'center' });
        doc.text(`Taxe`, pageWidth / 1.8, 145, { align: 'left' });
        doc.text(`${data.taxeDouane ?? 'Nan'}`, pageWidth / 1.8, 149, { align: 'left' });
        doc.text("J'ai perçu le colis sur ce ", pageHeight / 1, 160, { align: 'center' });
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
        doc.text(`Taxe reçue : ${data.montant}`, pageWidth / 1.09, 195, { align: 'right' });
    }

    private async addFooter(doc: jsPDF, data: CourrierDto, fullname: string) {
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;

        const imagePath = 'assets/layout/images/poste-removebg-preview.png';
        doc.addImage(imagePath, 'PNG', pageWidth / 15, -1, 12, 7);

        doc.setFontSize(9);
        const labelX = 20;
        const valueX = 44;

        doc.text(`Nom :`, labelX, 22);
        doc.text(`${data.expediteurNom ?? 'Nan'}`, valueX, 22);

        doc.text(`Prénom :`, labelX, 27);
        doc.text(`${data.expediteurPrenom ?? 'Nan'}`, valueX, 27);

        doc.text(`Adresse :`, labelX, 32);
        doc.text(`${data.expediteurAdresse ?? 'Nan'}`, valueX, 32);

        doc.text(`Pays d'origine :`, labelX, 37);
        doc.text(`${data.paysOrigineLibelle ?? 'Nan'}`, valueX, 37);

        doc.text(`Téléphone :`, labelX, 42);
        doc.text(`${data.expediteurTelephone ?? 'Nan'}`, valueX, 42);

        doc.text(`Code postal :`, labelX, 47);
        doc.text(`${data.expediteurCodePostal ?? 'Nan'}`, valueX, 47);


        doc.text('A', pageWidth / 50, 59, { align: 'right' });


        const labeX = 20;
        const valuX = 49;

        // Nom
        doc.text(`Nom : `, labeX, 59, { align: 'left' });
        doc.text(`${data.destinataireNom ?? 'Nan' }`, valuX, 59, { align: 'left' });

        // Prenom
        doc.text(`Prenom : `, labeX, 64, { align: 'left' });
        doc.text(`${data.destinatairePrenom ?? 'Nan'}`, valuX, 64, { align: 'left' });

        let yPosition = 37;
        doc.text(`Adresse : `, labeX, 69, { align: 'left' });
        const destinataireAdresse = `${data.destinataireAdresse ?? 'Nan'}`;
        yPosition = 69;
        this.addTextInLines(doc, destinataireAdresse, valuX, yPosition, 9);

        doc.text(`Pays de destination : `, labeX, 74, { align: 'left' });
        doc.text(`     ${data.paysDestinationLibelle ?? 'Nan'}`, valuX, 74, { align: 'left' });

        doc.text(`Téléphone : `, labeX, 79, { align: 'left' });
        doc.text(`${data.destinataireTelephone ?? 'Nan'}`, valuX, 79, { align: 'left' });

        doc.text(`Code Postal :`, labeX, 84, { align: 'left' });
        doc.text(`${data.destinataireCodePostal ?? 'Nan'}`, valuX, 84, { align: 'left' });


        doc.text('Timbre de la ', pageHeight / 13, 95, { align: 'left' });
        doc.text('Bureau ', pageHeight / 3, 95, { align: 'left' });
        doc.text(`${data.structureDestinationLibelle ?? 'Nan'}`, pageWidth / 4, 99, { align: 'left' });
        doc.text('Droit de douane ', pageHeight / 13, 105, { align: 'left' });
        doc.text('Catégorie de colis ', pageHeight / 13, 115, { align: 'left' });
        doc.text('aerien ', pageHeight / 10, 150, { align: 'left' });
        doc.text('surface ', pageWidth / 4, 150, { align: 'left' });
        doc.text('A', pageWidth / 50, 59, { align: 'right' });
        doc.text(`Bureau: ${data.structureDepotLibelle ?? 'Nan'}`, pageHeight / 10, 8, { align: 'left' });
        doc.text('LA POSTE SENEGAL', pageHeight / 2, 3, { align: 'right' });
        doc.text(`Agent: ${fullname}`, pageWidth / 2, 8, { align: 'center' });
        doc.text("Instruction de l'expéditeur en cas de non-livraison ", pageHeight / 13, 160, { align: 'left' });
        doc.text("Renvoyer à l'expéditeur ", pageHeight / 13, 170, { align: 'left' });
        doc.text('Remarque: Pour tenir compte des besoins de leur service, les Administrations ont l\'habitude d\'utiliser cette formule unique , soit comme partie de la formule-Liasse CP72 ', pageHeight / 29, 209, { align: 'left' });
        doc.setLineWidth(0.5);
    }

    private addTextInLines(doc: jsPDF, text: string, x: number, y: number, wordsPerLine: number) {
        const words = text.split(' ');
        let line = '';
        let yPosition = y;

        for (let i = 0; i < words.length; i++) {
            line += words[i] + ' ';
            if ((i + 1) % wordsPerLine === 0) {
                doc.text(line.trim(), x, yPosition, { align: 'left' });
                yPosition += 3;
                line = '';
            }
        }
        if (line.trim().length > 0) {
            doc.text(line.trim(), x, yPosition, { align: 'left' });
        }
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
        doc.line(0, 50, pageWidth - 60, 50);
        doc.line(pageWidth - 60, 50, pageWidth - 60, 202);
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
