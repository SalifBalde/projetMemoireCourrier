export const environment = {
    production: true,
    api_host: "http://localhost:8084/api/",
    // api_host:"http://10.6.4.202:8089/courrier-service/api/",
    api_params: "http://10.6.4.202:8089/api/",
    api_compta: "https://digitalpostv2.sn.post:8091/comptabilite-service/api/",
    api_ecom: "https://bedigital.sn.post:8090/ecommerce-service/api/",


    // api_params: "http://localhost:8081/api/",
    // api_stock: "http://localhost:8085/api/",
    api_stock: "http://10.6.4.202:8089/gestionstock-service/api/",
    locale_id: 'fr-FR',
    keycloak: {
        //authority: 'http://localhost:8080',
        authority: 'https://auth.sn.post:8443',
          redirectUri: 'http://localhost:4200',
        //redirectUri: 'https://digitalpostv2.sn.post',
        postLogoutRedirectUri: 'http://localhost:4200/logout',
        realm: 'digital_post_dev',
        clientId: 'digital_front_dev',
    },
    idleConfig: { idle: 10, timeout: 60, ping: 10 },
};
