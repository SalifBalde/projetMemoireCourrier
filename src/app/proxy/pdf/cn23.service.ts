import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { CourrierDto } from '../courrier';
import { SessionService } from '../auth/Session.service';
import { firstValueFrom } from 'rxjs';
import { ClientDto, ClientService } from '../client';

@Injectable({
    providedIn: 'root',
})
export class Cn23Service {

    constructor(
        private sessionService: SessionService,
        private clientService: ClientService
      ) {}


    async createPDF(data: CourrierDto, fullname: string): Promise<void> {
        const doc = new jsPDF({ format: 'A4', orientation: 'landscape' });
        const keyword = data.destinataireTelephone;

        if (keyword) {
          try {
            const client: ClientDto = await firstValueFrom(this.clientService.searchClient(keyword));
            if (client?.adresse) {
              data.destinataireAdresse = client.adresse;
              data.destinataireNom = data.destinataireNom || client.nom;
              data.destinatairePrenom = data.destinatairePrenom || client.prenom;
            }
          } catch (error) {
            console.error('Erreur lors de la récupération du client :', error);
          }
        }

        this.addHeader(doc, data);
        this.addRecipientInfo(doc, data);
        this.addSenderInfo(doc, data);
        this.addDetails(doc, data);
        this.addFooter(doc, data, fullname);
        this.drawLines(doc, data);

        const fileName = 'CP71.pdf';
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
        doc.text(`${data.codeBarre}`, pageWidth / 2, 26, { align: 'left' });
        doc.text(' ', pageWidth / 2, 40, { align: 'left' });
        doc.text('Valeur déclarée', pageWidth / 2, 55, { align: 'left' });
        doc.text(`${data.valeurDeclare ?? ''}`, pageHeight / 1, 55, { align: 'center' });
        doc.text('(Apposer les étiquettes officielles le cas échéant)', pageWidth / 2.3, 75, { align: 'left' });
        const valeurDeclaree = data.valeurDeclare ?? 0;
        let taxeVD = 0;

        if (valeurDeclaree === 0) {
            taxeVD = 0;
        } else if (valeurDeclaree <= 10000) {
            taxeVD = 1500;
        } else {
            taxeVD = Math.ceil(valeurDeclaree / 10000) * 250;
        }

        const montantTotal = data.montant ?? 0;
        const taxePort = montantTotal - taxeVD;


        // Affichage
        doc.text(`Poids:                 ${data.poids ?? '0'}              g`, pageWidth / 2.3, 90, { align: 'left' });
        doc.text(`Taxe de port:     ${taxePort ?? '0'} CFA`, pageWidth / 2.3, 95, { align: 'left' });
        doc.text(`Taxe VD:            ${taxeVD ?? '0'} CFA`, pageWidth / 2.3, 100, { align: 'left' });
        doc.text(`Net à payer:      ${montantTotal ?? '0'} CFA`, pageWidth / 2.3, 105, { align: 'left' });
    }


    private addRecipientInfo(doc: jsPDF, data: CourrierDto) {
        const pageWidth = doc.internal.pageSize.width;
        const marginRight = pageWidth / 1.14;
        const lineHeight = 6;
        doc.text('Reçu de dépot d\'un colis postal', pageWidth / 1.01, 18, { align: 'right' });
        doc.text(`${data.typeCourrierLibelle ?? ''}`, pageWidth / 1.03, 7, { align: 'right' });
        doc.text('Numéro  ', pageWidth / 1.01, 3, { align: 'right' });
        doc.text("     Partie à remplir par l'expediteur", pageWidth / 1.01, 30, { align: 'right' });
        doc.text('DESTINATAIRE', pageWidth / 1.05, 40, { align: 'right' });

        const labelX = 241;
        const valueX = 264;


        doc.text(`Prénom :`, labelX, 47);
        doc.text(`${data.destinatairePrenom ?? ''}`, valueX, 47, { align: 'right' });

        doc.text(`Nom :`, labelX, 55);
        doc.text(`${data.destinataireNom ?? ''}`, valueX, 55, { align: 'right' });

        const adresse = data.destinataireAdresse ?? '';
        const splitByChars = (text, maxLength) => {
            const result = [];
            for (let i = 0; i < text.length; i += maxLength) {
                result.push(text.slice(i, i + maxLength));
            }
            return result;
        };

        function splitTextByWordsSmart(text: string, maxChars: number): string[] {
            const words = text.split(' ');
            const lines: string[] = [];
            let currentLine = '';

            for (const word of words) {
                const testLine = currentLine ? currentLine + ' ' + word : word;

                if (testLine.length <= maxChars || word.match(/^\d+[ᵉer]{1,2}$/)) {
                    currentLine = testLine;
                } else {
                    lines.push(currentLine.trim());
                    currentLine = word;
                }
            }
            if (currentLine) {
                lines.push(currentLine.trim());
            }
            return lines;
        }

        const adresseTexte = `Adresse : ${data.destinataireAdresse || ''}`;

        const adresseLines = splitTextByWordsSmart(adresseTexte, 35);
        const adresseX = labelX;
        let adresseY = 62;

        adresseLines.forEach(line => {
            doc.text(line, adresseX, adresseY);
            adresseY += 4;
        });
        const valeurDeclaree = data.valeurDeclare ?? 0;
        let taxeVD = 0;

        if (valeurDeclaree === 0) {
            taxeVD = 0;
        } else if (valeurDeclaree <= 10000) {
            taxeVD = 1500;
        } else {
            taxeVD = Math.ceil(valeurDeclaree / 10000) * 250;
        }


       const montantTotal = data.montant ?? 0;
       const taxePort = montantTotal - taxeVD;

       doc.text(`Poids :`, labelX, 85);
       doc.text(`${data.poids ?? '0'} g`, valueX, 85);

       doc.text(`Taxe de port :`, labelX, 89);
       doc.text(`${taxePort} CFA`, valueX, 89);

       doc.text(`Taxe VD :`, labelX, 94);
       doc.text(`${taxeVD} CFA`, valueX, 94);

       doc.text(`Net à payer :`, labelX, 99);
       doc.text(`${montantTotal} CFA`, valueX, 99);
    }


    private addSenderInfo(doc: jsPDF, data: CourrierDto) {
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;

        doc.text('01  ', pageWidth / 2, 120, { align: 'center' });
        doc.text('Bureau ', pageHeight / 1, 120, { align: 'left' });
        doc.text(`${data.structureDepotLibelle ?? ''}`, pageHeight / 1, 135, { align: 'center' });
        doc.text('Valeur déclarée en CFA ', pageWidth / 2, 130, { align: 'center' });
        doc.text(`${data.valeurDeclare}`, pageWidth / 2, 136, { align: 'center' });

        doc.text('Poids brute ', pageWidth / 2, 145, { align: 'center' });
        doc.text(`${data.poids ?? ''} g`, pageWidth / 2, 149, { align: 'center' });
        doc.text(`Taxes`, pageWidth / 1.8, 145, { align: 'left' });
        doc.text(`${data.montant ?? ''} CFA`, pageWidth / 1.8, 149, { align: 'left' });
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
        doc.text(`Taxe reçue : `, pageWidth / 1.1, 195, { align: 'right' });
        doc.text(`${data.montant ?? '0'} CFA`, pageWidth / 1.1, 195, { align: 'left' });
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
        doc.text(`${data.expediteurNom ?? ''}`, valueX, 22);

        doc.text(`Prénom :`, labelX, 27);
        doc.text(`${data.expediteurPrenom ?? ''}`, valueX, 27);

        doc.text(`Adresse :`, labelX, 32);
        doc.text(`${data.expediteurAdresse ?? ''}`, valueX, 32);

        doc.text(`Pays d'origine :`, labelX, 37);
        doc.text(`${data.paysOrigineLibelle ?? ''}`, valueX, 37);

        doc.text(`Téléphone :`, labelX, 42);
        doc.text(`${data.expediteurTelephone ?? ''}`, valueX, 42);

        doc.text(`Code postal :`, labelX, 47);
        doc.text(`${data.expediteurCodePostal ?? ''}`, valueX, 47);


        doc.text('A', pageWidth / 50, 59, { align: 'right' });


        const labeX = 20;
        const valuX = 49;

        // Nom
        doc.text(`Nom : `, labeX, 59, { align: 'left' });
        doc.text(`${data.destinataireNom ?? ''}`, valuX, 59, { align: 'left' });

        // Prenom
        doc.text(`Prenom : `, labeX, 64, { align: 'left' });
        doc.text(`${data.destinatairePrenom ?? ''}`, valuX, 64, { align: 'left' });

        let yPosition = 37;
        doc.text(`Adresse : `, labeX, 69, { align: 'left' });
        const destinataireAdresse = `${data.destinataireAdresse ?? ''}`;
        yPosition = 69;
        this.addTextInLines(doc, destinataireAdresse, valuX, yPosition, 9);

        doc.text(`Pays de destination : `, labeX, 74, { align: 'left' });
        doc.text(`     ${data.paysDestinationLibelle ?? ''}`, valuX, 74, { align: 'left' });

        doc.text(`Téléphone : `, labeX, 79, { align: 'left' });
        doc.text(`${data.destinataireTelephone ?? ''}`, valuX, 79, { align: 'left' });

        doc.text(`Code Postal :`, labeX, 84, { align: 'left' });
        doc.text(`${data.destinataireCodePostal ?? ''}`, valuX, 84, { align: 'left' });


        doc.text('Timbre de la ', pageHeight / 13, 95, { align: 'left' });
        doc.text('Bureau ', pageHeight / 3, 95, { align: 'left' });
        doc.text(`${'DAKAR MESSAGERIE'}`, pageWidth / 4, 104, { align: 'left' });
        doc.text('Droit de douane ', pageHeight / 13, 105, { align: 'left' });
        doc.text('Catégorie de colis ', pageHeight / 13, 115, { align: 'left' });
        doc.text('aerien ', pageHeight / 10, 150, { align: 'left' });
        doc.text('surface ', pageWidth / 4, 150, { align: 'left' });
        doc.text('A', pageWidth / 50, 59, { align: 'right' });
        doc.text(`Bureau: ${data.structureDepotLibelle ?? ''}`, pageHeight / 10, 8, { align: 'left' });
        doc.text('LA POSTE SENEGAL', pageHeight / 2, 3, { align: 'right' });
        doc.text(`Agent: ${fullname}`, pageWidth / 2, 8, { align: 'center' });
        const date: Date = new Date();
        doc.text(`Date d'opération: ${date.toLocaleString() }`, pageWidth / 1.4, 8, { align: 'center' });

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
