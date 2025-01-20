import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "../../service/app.layout.service";
// import { AuthService } from 'src/app/proxy/auth/auth.service';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { SessionService } from 'src/app/proxy/auth/Session.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  fullname = "";
  structureLibelle = "";
  caisseLibelle: string;



  items: MenuItem[] = [];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(public layoutService: LayoutService, private readonly keycloak: KeycloakService, private router: Router, private sessionService: SessionService) { }
  public async ngOnInit() {
    const userRoles = this.keycloak.getUserRoles();

    // Define items based on roles
    this.items = [
        ...(userRoles.includes('ROLE_DCG') ? [{ label: 'DCG', icon: 'pi pi-unlock', command: () => { this.router.navigate(['/dcg']); } }] : []),
        ...(userRoles.includes('ROLE_DRP') ? [{ label: 'DRP', icon: 'pi pi-unlock', command: () => { this.router.navigate(['/drp']); } }] : []),
        ...(userRoles.includes('ROLE_RECEVEUR') ? [{ label: 'RECEVEUR', icon: 'pi pi-unlock', command: () => { this.router.navigate(['/receveur']); } }] : []),
        ...(userRoles.includes('ROLE_GUICHET') ? [{ label: 'GHICHET', icon: 'pi pi-unlock', command: () => { this.router.navigate(['/guichet']); } }] : []),
        ...(userRoles.includes('ROLE_ARRIERE') ? [{ label: 'ARRIERE', icon: 'pi pi-unlock', command: () => { this.router.navigate(['/arriere']); } }] : []),
        { separator: true },
        { label: 'Déconnexion', icon: 'pi pi-sign-out', command: () => { this.keycloak.logout(environment.keycloak.redirectUri);
            sessionStorage.clear();
         } }
    ];
        this.structureLibelle = this.sessionService.getAgentAttributes().structureLibelle;
        const caisseLibelle = this.sessionService.getAgentAttributes()?.caisseLibelle;
        const date = this.sessionService.getJournalAttributes()?.date || 'Date inconnue';
        const soldeOuverture = this.sessionService.getJournalAttributes()?.soldeOuverture || 0;

        if (caisseLibelle) {
            this.caisseLibelle = `${caisseLibelle}: ${date} - Num Veil: ${soldeOuverture} CFA`;
        }

    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      this.fullname = this.userProfile.firstName + " " + this.userProfile.lastName;
    }
  }


  public login() {
    this.keycloak.login();
  }

  public logout() {
    this.keycloak.logout();
  }
}
