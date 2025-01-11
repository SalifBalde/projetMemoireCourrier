export const environment = {
  production: true,
  useKeycloak: true,
  api_compta: "https://digitalpostv2.sn.post:8091/comptabilite-service/api",
  api_params: "https://digitalpostv2.sn.post:8091/api/",
  api_stock: "https://digitalpostv2.sn.post:8091/gestionstock-service/api/",
  api_host: "https://bedigital.sn.post:8090/courrier-service/api/",
  locale_id: 'fr-FR',
  keycloak: {
      authority: 'https://auth.sn.post:8443/',
      redirectUri: 'https://digitalpostv2.sn.post',
      postLogoutRedirectUri: 'https://digitalpostv2.sn.post/logout',
      realm: 'digital_post_dev',
      clientId: 'digital_front_prod',
  },
  idleConfig: { idle: 10, timeout: 60, ping: 10 },
};
