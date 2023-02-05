import packageJson from '../../package.json';

export const environment = {
   appName: 'Daleel System',
   production: true,
   serverUrl: "http://10.32.27.131:8081/api",
   env: 'Production',
   version: packageJson.version,
   defaultLang: 'ar',
   logoutRedirectUrl: 'http://10.32.27.131:8082/auth/login'
  };


