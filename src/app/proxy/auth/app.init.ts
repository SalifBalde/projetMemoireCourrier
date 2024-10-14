import { KeycloakService } from "keycloak-angular"
import { environment } from "src/environments/environment"

export function initializeKeycloak(kcService : KeycloakService){
    return ()=>{
      kcService.init({
        config : {
          realm :environment.keycloak.realm,
          clientId : environment.keycloak.clientId,
          url : environment.keycloak.authority
        },
        initOptions: {
            onLoad: 'check-sso',
            //silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
            checkLoginIframe: false,
            redirectUri: environment.keycloak.redirectUri,
          },
          bearerExcludedUrls: ['/assets'],
        loadUserProfileAtStartUp: true
      })
    }
  }
