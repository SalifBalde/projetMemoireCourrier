"use strict";
exports.__esModule = true;
exports.environment = void 0;
exports.environment = {
    production: false,
    api_host: "http://localhost:8084/api/",
    // api_host: "https://bedigital.sn.post:8090/courrier-service/api/",
    // api_host:"http://10.6.4.202:8089/courrier-service/api/",
    api_params: "https://digitalpostv2.sn.post:8091/api/",
    // api_params: "http://localhost:8081/api/",
    api_stock: "http://localhost:8085/api",
    api_compta: "http://localhost:8082/api/",
    api_ecom: "http://localhost:8087/api/",
    // api_stock: "http://10.6.4.202:8089/gestionstock-service/api/",
    locale_id: 'fr-FR',
    keycloak: {
        authority: 'https://auth.sn.post:8443/',
        // authority: 'https://localhost:9090/',
        //authority: 'http://10.6.4.202',
        redirectUri: 'http://localhost:4200',
        postLogoutRedirectUri: 'http://localhost:4200/logout',
        realm: 'digital_post_dev',
        clientId: 'digital_front_dev'
    },
    idleConfig: { idle: 10, timeout: 60, ping: 10 }
};
