import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
    constructor(public layoutService: LayoutService,
         public router: Router, private keycloak : KeycloakService)
          { }
    ngOnInit(): void {
        this.redirectBasedOnRole();
    }

    public isAdmin(): boolean {
        const userRoles = this.keycloak.getUserRoles();
        return userRoles.includes('ROLE_ADMIN');
      }

      public isGuichet(): boolean {
        const userRoles = this.keycloak.getUserRoles();
        return userRoles.includes('ROLE_GUICHET');
      }

      public isReceveur(): boolean {
        const userRoles = this.keycloak.getUserRoles();
        return userRoles.includes('ROLE_RECEVEUR');
      }
      public isArriere(): boolean {
        const userRoles = this.keycloak.getUserRoles();
        return userRoles.includes('ROLE_ARRIERE');
      }

      public isCt(): boolean {
        const userRoles = this.keycloak.getUserRoles();
        return userRoles.includes('ROLE_CT');
      }
    public ismessagerie(): boolean {
        const userRoles = this.keycloak.getUserRoles();
        return userRoles.includes('ROLE_MESSAGERIE');
    }
 public ismessageriePacket(): boolean {
        const userRoles = this.keycloak.getUserRoles();
        return userRoles.includes('ROLE_MESSPAQUET');
    }

      public isDrp(): boolean {
        const userRoles = this.keycloak.getUserRoles();
        return userRoles.includes('ROLE_DRP');
      }


      public isResponsableAnnexe(): boolean {
          const userRoles = this.keycloak.getUserRoles();
          return userRoles.includes('ROLE_RESPONSABLE_ANNEXE');
      }
      async redirectBasedOnRole(): Promise<void>{
        const userRoles = this.keycloak.getUserRoles();

        const isAdmin = userRoles.includes('ROLE_ADMIN');
        const isReceveur = userRoles.includes('ROLE_RECEVEUR');
        const isGuichet = userRoles.includes('ROLE_GUICHET');
        const isGrandCaisse = userRoles.includes('ROLE_GRANDE_CAISSE');
        const isDrp = userRoles.includes('ROLE_DRP');
        const isCt= userRoles.includes('ROLE_CT');
        const isMessagerie= userRoles.includes('ROLE_MESSAGERIE');
        const ismessageriePacket= userRoles.includes('ROLE_MESSPAQUET');

        if (isAdmin) {
            this.router.navigate(['/backoffice']);
        } else if (isDrp) {
            this.router.navigate(['/drp']);
        }else if (isCt) {
            this.router.navigate(['/ct']);
        }
        else if (isReceveur) {
            this.router.navigate(['/receveur']);
        } else if (isGuichet) {
            this.router.navigate(['/guichet']);
        }
        else if (ismessageriePacket) {
            this.router.navigate(['/messageriePacket']);
        }
        else if (isMessagerie) {
            this.router.navigate(['/messagerie']);
        }
        else if (isGrandCaisse) {
            this.router.navigate(['/grande_caisse']);
        }
        else {
            this.router.navigate(['/']);
        }
    }
      public isDro(): boolean {
        const userRoles = this.keycloak.getUserRoles();
        return userRoles.includes('ROLE_DRO');

      }
}
