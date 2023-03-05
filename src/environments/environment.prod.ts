import packageJson from '../../package.json';

export const environment = {
   appName: 'Daleel System',
   production: true,
   serverUrl: "https://10.35.236.31:8081/api",
   env: 'Production',
   version: packageJson.version,
   defaultLang: 'ar',
   logoutRedirectUrl: 'https://10.35.236.31:80/auth/login'
  };


