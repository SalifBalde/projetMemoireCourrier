import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { PrimeNGConfig } from 'primeng/api';
import {UserDto,UserService } from './proxy/users';
import { catchError, firstValueFrom, of } from 'rxjs';
import { KeycloakProfile } from 'keycloak-js';
import { TokenService } from './proxy/auth/token.service';
import { SessionService } from './proxy/auth/Session.service';
import { JournalResultDto, JournalService } from './proxy/journal';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

   user :UserDto;
    public userProfile: KeycloakProfile | null = null;
    journal: JournalResultDto ={};


    constructor(private primengConfig: PrimeNGConfig,
         private keycloakService: KeycloakService,
         private journalService: JournalService,
         private sessionService: SessionService,
         private tokenService : TokenService,
         private userService:UserService,
         private router: Router) { }

    async ngOnInit(): Promise<void> {
        this.userProfile = await this.keycloakService.loadUserProfile();
        const token = await this.keycloakService.getToken();
        sessionStorage.setItem('authToken', token);
//const token = sessionStorage.getItem('authToken');


        this.sessionService.setUserAttributes(this.userProfile);
        this.user = await firstValueFrom(
            this.userService.findByEmail(this.userProfile.email).pipe(
                catchError((error) => {
                    console.error('Error fetchinguser:', error);
                    return of(null);
                })
            )
        );
        this.loadJournal(this.user.caisseId,this.user.id);
        this.sessionService.setAgentAttributes(this.user);
        await this.redirectBasedOnRole();
        this.primengConfig.ripple = true;
      }

      async  loadJournal(id:string, userid:string): Promise<void> {
        this.journalService
              .getJournalToday(id, userid)
              .subscribe({
                  next: (data: JournalResultDto) => {
                      this.journal = data;
                      this.sessionService.setJournalAttributes(this.journal);
                  },
                  error: (err) => {
                  },
              });
     }

async redirectBasedOnRole(): Promise<void> {
    const isLoggedIn = await this.keycloakService.isLoggedIn();

    this.user = await firstValueFrom(
        this.userService.findByEmail(this.userProfile.email).pipe(
            catchError((error) => {
                console.error('Error fetchinguser:', error);
                return of(null);
            })
        )
    );


    // if (isLoggedIn) {
    //     const userRoles = this.keycloakService.getUserRoles();
    //     if (userRoles.includes('ROLE_GUICHET')) {
    //         this.router.navigate(['/guichet']);
    //     } else if (userRoles.includes('ROLE_ARRIERE')) {
    //         this.router.navigate(['/arriere']);
    //     }
    //     else if (userRoles.includes('ROLE_DRP')) {
    //         this.router.navigate(['/drp']);
    //     }
    //     else if (userRoles.includes('ROLE_DCL')) {
    //         this.router.navigate(['/dcl']);
    //     }
    //      else if (userRoles.includes('ROLE_RECEVEUR')) {
    //         this.router.navigate(['/receveur']);
    //     } else {
    //         this.router.navigate(['/']);
    //     }
    // } else {
    //     await this.keycloakService.login();
    // }
}
}


