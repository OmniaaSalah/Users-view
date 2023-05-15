import packageJson from '../../package.json';

export const environment = {
   appName: 'Daleel System',
   production: true,
  //  serverUrl:"https://daleel-api.azurewebsites.net/api",
   serverUrl: "http://10.25.236.38:8081/api",
   env: 'Production',
   version: packageJson.version,
   defaultLang: 'ar',
  //  logoutRedirectUrl:"https://daleel-app.azurewebsites.net/auth/login",
   logoutRedirectUrl: 'http://10.25.236.38:80/auth/login',
   clientUrl:"https://daleel-app.azurewebsites.net"
  };


