import packageJson from '../../package.json';

export const environment = {
   appName: 'Daleel System',
   production: true,
   serverUrl: "http://localhost:8081/api",
   env: 'Production',
   version: packageJson.version,
   defaultLang: 'ar',
   logoutRedirectUrl: 'http://localhost:8082/auth/login'
};


