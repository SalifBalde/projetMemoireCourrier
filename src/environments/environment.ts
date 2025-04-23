export const environment = {
    production: false,
    api_host: "http://localhost:8082/api/",
    //api_host: "http://10.6.4.72:9090/courrier-service/api/",
    api_compta: "https://digitalpostv2.sn.post:8091/comptabilite-service/api/",
  //  api_params: "https://digitalpostv2.sn.post:8091/api/",
    api_params: "http://10.6.4.72:9090/parametre-service-test/api/",
    api_stock: "https://digitalpostv2.sn.post:8091/gestionstock-service/api/",
    api_ecom: "https://bedigital.sn.post:8090/ecommerce-service/api/",

    locale_id: 'fr-FR',
    keycloak: {
       // authority: 'http://localhost:8080',
       // authority: 'https://auth.sn.post:8443',
        authority: 'http://10.6.4.72:8080',
        redirectUri: 'http://localhost:4200',
        postLogoutRedirectUri: 'http://localhost:4200/logout',
        realm: 'digital_post_dev',
        clientId: 'digital_front_dev',
    },
    idleConfig: { idle: 10, timeout: 60, ping: 10 },
};
