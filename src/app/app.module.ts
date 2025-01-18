import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CurrencyPipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';

import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { ReceveurLayoutModule } from './layout/receveur-layout/receveur.layout.module';
import { BackofficeLayoutModule } from './layout/backoffice-layout/backoffice.layout.module';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
// import { initializeKeycloak } from './proxy/auth/app.init';
import { environment } from 'src/environments/environment';
import { GuichetLayoutModule } from './layout/guichet-layout/guichet.layout.module';
import { CustomCurrencyPipe } from './pipes/custom-currency.pipe';
import { ArriereLayoutModule } from './layout/arriere-layout/arriere.layout.module';
import { DrpLayoutComponent } from './layout/drp-layout/drp.layout.component';
import { CtLayoutComponent } from './layout/ct-layout/ct.layout.component';
import { CtLayoutModule } from './layout/ct-layout/ct.layout.module';
import { DroLayoutModule } from './layout/dro-layout/dro.layout.module';
import { DrpLayoutModule } from './layout/drp-layout/drp.layout.module';
import {RapportModule} from "./modules/drp/rapport/rapport.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";

function initializeKeycloak(keycloak: KeycloakService) {
    return () =>
      keycloak.init({
        config: {
            realm :environment.keycloak.realm,
            clientId : environment.keycloak.clientId,
            url : environment.keycloak.authority
        },
        initOptions: {
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
        }
      });
  }

@NgModule({
    declarations: [
        AppComponent,

    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        KeycloakAngularModule,
        GuichetLayoutModule,
        BackofficeLayoutModule,
        ReceveurLayoutModule,
        ArriereLayoutModule,
        CtLayoutModule,
        DrpLayoutModule,
        DroLayoutModule,
        RapportModule,
        BrowserAnimationsModule,
        MatButtonModule,
        BrowserAnimationsModule,
    ],
    providers: [
        {provide: APP_INITIALIZER, useFactory:initializeKeycloak,multi :true, deps:[KeycloakService]},
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, CurrencyPipe, //authInterceptorProviders

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
