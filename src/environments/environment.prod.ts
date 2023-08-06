import packageJson from '../../package.json';

export const environment = {
   appName: 'Daleel System',
   production: true,
   serverUrl:"https://daleel-api.azurewebsites.net/api",
   //  serverUrl: "http://10.25.236.38:8082/api", //production
   // serverUrl: "http://10.35.236.31:8082/api", //Staging
   // serverUrl: "http://10.25.237.33:8082/api",
      // serverUrl: "http://10.25.237.35:8085/api",



   env: 'Production',
   version: packageJson.version,
   defaultLang: 'ar',
   logoutRedirectUrl:"https://daleel-app.azurewebsites.net/auth/login",
   //  logoutRedirectUrl: 'http://10.25.236.38:80/auth/login', //production
   //   logoutRedirectUrl: 'http://10.35.236.31:80/auth/login', //Staging
   // logoutRedirectUrl: 'http://10.25.237.31:80/auth/login',
   // logoutRedirectUrl: 'http://10.25.237.35:80/auth/login',
    // logoutRedirectUrl: 'http://10.25.237.33:8082/auth/login',
  //  clientUrl:"https://daleel-app.azurewebsites.net"
  };


