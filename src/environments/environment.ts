export const environment = {
  production: false,
  api_host: "http://localhost:8084/api/",
  // api_host:"http://10.6.4.202:8089/courrier-service/api/",
  api_params: "http://10.6.4.202:8089/api/",
  // api_params: "http://localhost:8081/api/",
  // api_stock: "http://localhost:8085/api/",
  api_stock: "http://10.6.4.202:8089/gestionstock-service/api/",
  locale_id: 'fr-FR',
  keycloak: {
    authority: 'http://localhost:9090',
    // authority: 'http://10.6.4.202',
    redirectUri: 'http://localhost:4200',
    postLogoutRedirectUri: 'http://localhost:4200/logout',
    realm: 'digital_post_dev',
    clientId: 'digital_front_dev',
  },
  idleConfig: { idle: 10, timeout: 60, ping: 10 },
};
