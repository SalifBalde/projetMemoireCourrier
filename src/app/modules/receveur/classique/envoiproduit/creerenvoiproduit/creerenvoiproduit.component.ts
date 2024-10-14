import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../../../../proxy/client';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
    selector: 'app-creerenvoiproduit',
    templateUrl: './creerenvoiproduit.component.html',
})
export class CreerenvoiproduitComponent implements OnInit {
    nomExpediteur: string;
    prenomExpediteur: string;
    cniExpediteur: string;
    produits: any[] = [];
    filteredProduits: any[] = [];
    selectedProduitsAdvanced: any = null;
    bureaux: any[] = [];
    filteredBureaux: any[] = [];
    selectedBureauAdvanced: any = null;
    selectedQuantite: number = 0;
    detailsCommande: any[] = [];
    fraisSupp: number = 0;
    NomDestinataire: string;
    AdresseDestinataire: string;
    TelephoneDestinataire: string;
    PrenomDestinataire: string;
    EmailDestinataire: string;

    constructor(private router: Router, private clientService: ClientService) { }

    ngOnInit(): void {
        const navigation = this.router.getCurrentNavigation();
        if (navigation && navigation.extras.state) {
            console.log('State:', navigation.extras.state);
            const clientData = navigation.extras.state['clientData'];
            console.log('Client Data:', clientData);
            if (clientData) {
                if (clientData.nom && clientData.prenom && clientData.cni) {
                    this.nomExpediteur = clientData.nom;
                    this.prenomExpediteur = clientData.prenom;
                    this.cniExpediteur = clientData.cni;
                }
            }
        }
        this.clientService.getProduits().then(produits => {
            this.produits = produits;
        });
        this.clientService.getBureaux().then(bureaux => {
            this.bureaux = bureaux;
        });
    }

    ajouterProduitTest(): void {
        if (this.selectedProduitsAdvanced && this.selectedQuantite > 0 && this.selectedBureauAdvanced) {
            const produitSelectionne = this.selectedProduitsAdvanced;
            const bureauSelectionne = this.selectedBureauAdvanced.name;
            this.detailsCommande.push({
                produit: produitSelectionne.name,
                quantite: this.selectedQuantite,
                prix: produitSelectionne.prix,
                bureau: bureauSelectionne
            });
            this.resetSelection();
        }
    }

    resetSelection(): void {
        this.selectedProduitsAdvanced = null;
        this.selectedQuantite = 0;
        this.selectedBureauAdvanced = null;
    }

    getTotal(): number {
        return this.detailsCommande.reduce((total, detail) => total + (detail.quantite * detail.prix), 0);
    }

    getTotalAvecFrais(): number {
        return this.getTotal() + this.fraisSupp;
    }

    validateForm(): void {
        if (this.nomExpediteur && this.prenomExpediteur && this.cniExpediteur && this.detailsCommande.length > 0) {
            this.generatePDF();
        } else {
            alert('Veuillez remplir tous les champs obligatoires.');
        }
    }

    generatePDF(): void {
        const doc = new jsPDF();

        const logoGauche = new Image();
        logoGauche.src = 'assets/layout/images/laposte.jpeg';
        logoGauche.onload = () => {
            doc.addImage(logoGauche, 'JPEG', 14, 10, 25, 25);

            const logoDroite = new Image();
            logoDroite.src = 'assets/layout/images/logo.png';
            logoDroite.onload = () => {
                doc.addImage(logoDroite, 'PNG', 176, 10, 25, 25);

                generateContent(doc);
            };
        };

        const generateContent = (doc) => {
            doc.setFontSize(30);
            doc.setTextColor(0, 0, 139);
            doc.setFont("helvetica", "bold");
            doc.text('Facture', 65, 50);

            const alphanumericCode = generateRandomCode(6);
            doc.setFontSize(18);
            doc.setTextColor(0, 0, 0);
            doc.setFont("helvetica", "normal");
            doc.text(`#${alphanumericCode}`, 105, 50);

            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.setFont("helvetica", "normal");
            doc.text(`Nom expéditeur: ${this.nomExpediteur}`, 14, 65);
            doc.text(`Prénom expéditeur: ${this.prenomExpediteur}`, 14, 70);
            doc.text(`CNI expéditeur: ${this.cniExpediteur}`, 14, 75);

            let dateEnvoi = new Date();
            let formattedDateEnvoi = dateEnvoi.toISOString().split('T')[0];
            doc.text(`Date: ${formattedDateEnvoi}`, 196, 50, { align: "right" });
            doc.text('VAT Number: 00-123456', 196, 55, { align: "right" });

            doc.text(`Nom : ${this.NomDestinataire}`, 196, 70, { align: "right" });
            doc.text(`Prénom : ${this.PrenomDestinataire}`, 196, 75, { align: "right" });
            doc.text(`Adresse : ${this.AdresseDestinataire}`, 196, 80, { align: "right" });
            doc.text(`Téléphone : ${this.TelephoneDestinataire}`, 196, 85, { align: "right" });

            doc.setDrawColor(0, 0, 139);
            doc.setLineWidth(1);
            doc.line(14, 95, 196, 95);

            const tableColumn = ["ID", "PRODUIT", "PRIX", "QUANTITE", "BUREAU DESTINATION", "TOTAL"];
            const tableRows = [];

            this.detailsCommande.forEach((item, index) => {
                const itemData = [
                    index + 1,
                    item.produit,
                    `${item.prix} CFA`,
                    item.quantite,
                    item.bureau,
                    `${item.quantite * item.prix} CFA`
                ];
                tableRows.push(itemData);
            });

            const startY = 100;
            doc.autoTable({
                head: [tableColumn],
                body: tableRows,
                startY: startY,
                theme: 'striped',
                headStyles: { fillColor: [0, 0, 139] },
                styles: { fontSize: 12, halign: 'center' },
            });

            const finalY = doc.autoTable.previous.finalY + 10;

            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.text(`Sub Total: ${this.getTotal()} CFA`, 190, finalY, { align: "right" });
            doc.text(`Tax: 0.00%`, 190, finalY + 5, { align: "right" });

            const totalBoxWidth = 40;
            const totalBoxHeight = 10;
            const totalBoxX = 196 - totalBoxWidth;
            const totalBoxY = finalY + 10;

            doc.setDrawColor(0, 0, 190);
            doc.setFillColor(0, 0, 190);
            doc.rect(totalBoxX, totalBoxY, totalBoxWidth, totalBoxHeight, 'FD');

            doc.setFontSize(12);
            doc.setTextColor(255, 255, 255);
            doc.text(`Total: ${this.getTotalAvecFrais()} CFA`, totalBoxX + 2, totalBoxY + 7);

            doc.setDrawColor(0, 0, 139);
            doc.setLineWidth(1);
            doc.line(14, finalY + 25, 196, finalY + 25);

            doc.setFontSize(12);
            doc.setTextColor(0, 0, 139);
            doc.text('Informations de paiement :', 14, finalY);
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.text('Options de paiement : Guichet', 14, finalY + 5);
            doc.text('Paiement par : Wave', 14, finalY + 10);

            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            doc.setFont("helvetica", "normal");

            doc.setFont("helvetica", "bold");
            doc.text('Informations de l\'entreprise', 14, finalY + 30);

            doc.setFont("helvetica", "normal");
            doc.text('Groupe La Poste', 14, finalY + 35);

            doc.text('Adresse: Avenue Peytavin Dakar, Sénégal', 14, finalY + 40);

            doc.text('Tél: +221 33 839 34 34', 14, finalY + 45);

            doc.text('Email: serviceclient@laposte.sn', 14, finalY + 50);

            doc.setFont("helvetica", "italic");
            doc.setTextColor(0, 0, 139);
            doc.text('www.laposte.com', 14, finalY + 55);

            const fileName = `Facture_${this.nomExpediteur}_${this.prenomExpediteur}.pdf`;
            doc.save(fileName);

            this.showSuccessMessage();
        };

        const generateRandomCode = (length) => {
            let result = '';
            const characters = '0123456789';
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        };
    }

    showSuccessMessage(): void {
        alert('Commande validée avec succès!');
    }

    resetForm(): void {
        this.nomExpediteur = '';
        this.prenomExpediteur = '';
        this.cniExpediteur = '';
        this.selectedProduitsAdvanced = null;
        this.selectedQuantite = 0;
        this.detailsCommande = [];
        this.fraisSupp = 0;
        this.NomDestinataire = '';
        this.AdresseDestinataire = '';
        this.TelephoneDestinataire = '';
        this.PrenomDestinataire = '';
        this.EmailDestinataire = '';
        this.selectedBureauAdvanced = null;
    }

    filterProduits(event: any) {
        const query = event.query;
        this.filteredProduits = this.produits.filter(produit => produit.name.toLowerCase().includes(query.toLowerCase()));
    }

    filterBureau(event: any) {
        const query = event.query;
        this.filteredBureaux = this.bureaux.filter(bureau => bureau.name.toLowerCase().includes(query.toLowerCase()));
    }

    onProduitChange(event: any): void {
        this.checkAndAddProduct();
    }

    onQuantiteChange(event: any): void {
        this.checkAndAddProduct();
    }

    checkAndAddProduct(): void {
        if (this.selectedProduitsAdvanced && this.selectedQuantite > 0 && this.selectedBureauAdvanced) {
            this.ajouterProduitTest();
        }
    }

    incrementQuantity(index: number): void {
        if (index >= 0 && index < this.detailsCommande.length) {
            this.detailsCommande[index].quantite++;
        }
    }

    decrementQuantity(index: number): void {
        if (index >= 0 && index < this.detailsCommande.length) {
            this.detailsCommande[index].quantite--;
        }
    }
    
    showAllRows: boolean = false;

    toggleRows() {
        this.showAllRows = !this.showAllRows;
    }
}
