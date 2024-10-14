import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../../../../proxy/client';


@Component({
    selector: 'app-creerenvoie',
    templateUrl: './creerenvoipoids.component.html',
})
export class CreerenvoiPoidsComponent implements OnInit {
    nomExpediteur: string;
    prenomExpediteur: string;
    cniExpediteur: string;
    bureaux: any[] = [];
    selectedMulti: any[] = [];
    filteredBureaux: any[] = [];
    selectedBureauAdvanced: any[] = [];
    selectedPoids: any = null;
    dropdownItems = [
        { name: '0-2kg', code: 'Option 1' },
        { name: '2-10kg', code: 'Option 2' },
        { name: '10-20kg', code: 'Option 3' },
        { name: '20-30kg', code: 'Option 3' },
        { name: '30-50kg', code: 'Option 3' },
        { name: '50-75kg', code: 'Option 3' },
        { name: '75-100kg', code: 'Option 3' }
    ];

    constructor(private router: Router, private clientService: ClientService) { }

    ngOnInit(): void {
        const navigation = this.router.getCurrentNavigation();
        if (navigation && navigation.extras.state) {
            console.log('State:', navigation.extras.state);
            const clientData = navigation.extras.state['clientData'];
            console.log('Client Data:', clientData);
            if (clientData) {
                console.log('Nom:', clientData.nom);
                console.log('Prenom:', clientData.prenom);
                console.log('CNI:', clientData.cni);

                if (clientData.nom && clientData.prenom && clientData.cni) {
                    this.nomExpediteur = clientData.nom;
                    this.prenomExpediteur = clientData.prenom;
                    this.cniExpediteur = clientData.cni;
                }
            }
        }
        this.clientService.getBureaux().then(bureaux => {
            this.bureaux = bureaux;
        });
    }

    naviguerVersCreerEnvoie(clientData: any): void {
        this.router.navigate(['/Creerenvoie'], {
            state: { clientData: clientData },
        });
    }

    filterBureau(event: any) {
        const query = event.query;
        const filtered = this.bureaux.filter(bureau => bureau.name.toLowerCase().includes(query.toLowerCase()));
        this.filteredBureaux = filtered;
    }

}
