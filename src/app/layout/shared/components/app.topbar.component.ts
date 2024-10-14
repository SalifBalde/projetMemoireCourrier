
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "../../service/app.layout.service";
import { AuthService } from 'src/app/proxy/auth/auth.service';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { SessionService } from 'src/app/proxy/auth/Session.service';
import { UserDto } from 'src/app/proxy/users';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit{
    public isLoggedIn = false;
    public userProfile: KeycloakProfile | null = null;
    fullname = "";
    user: UserDto;
    items: MenuItem[] = [];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService,private readonly keycloak: KeycloakService,private sessionService: SessionService, private router:Router) { }
    public async ngOnInit() {
        this.items = [
            { label: 'Profil', icon: 'pi pi-refresh' },
            { label: 'Angular.io', icon: 'pi pi-info', url: '' },
            { separator: true },
            { label: 'Logout', icon: 'pi pi-sign-out', command:()=>{
                this.keycloak.logout()
            }
        }
        ];
        this.isLoggedIn = await this.keycloak.isLoggedIn();

      
        if (this.isLoggedIn) {
          this.userProfile = await this.keycloak.loadUserProfile();
          this.fullname = this.userProfile.firstName + " " + this.userProfile.lastName;
          this.user=this.sessionService.getAgentAttributes();
        }
      }

      public login() {
        this.keycloak.login();
      }

      public logout() {
        this.keycloak.logout();
      }
    }
