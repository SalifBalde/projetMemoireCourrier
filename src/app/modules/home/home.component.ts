import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{
    constructor(public layoutService: LayoutService, public router: Router, private keycloak : KeycloakService) { }

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

      public isDrp(): boolean {
        const userRoles = this.keycloak.getUserRoles();
        return userRoles.includes('ROLE_DRP');
      }
}
