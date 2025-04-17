export const environment = {
    production: false,
    useKeycloak: true,
    api_compta: "https://digitalpostv2.sn.post:8091/comptabilite-service/api/",
    api_params: "https://digitalpostv2.sn.post:8091/api/",
    api_stock: "https://digitalpostv2.sn.post:8091/gestionstock-service/api/",
    api_host: "https://bedigital.sn.post:8090/courrier-service/api/",
   // api_host: "http://10.6.4.72:9090/courrier-service/api/",
    api_ecom: "https://bedigital.sn.post:8090/ecommerce-service/api/",
    locale_id: 'fr-FR',
    keycloak: {
        authority: 'https://auth.sn.post:8443/',
      //  authority: 'http://10.6.4.72:8080/',
        redirectUri: 'https://auth.sn.post:8443/courrier-front',
        postLogoutRedirectUri: 'https://auth.sn.post:8443/courrier-front/logout',
        realm: 'digital_post_dev',
        clientId: 'digital_front_prod',
    },
    idleConfig: { idle: 10, timeout: 60, ping: 10 }
};
