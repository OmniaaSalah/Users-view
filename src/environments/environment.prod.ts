import packageJson from '../../package.json';

export const environment = {
  appName: 'Daleel System',
  production: true,
  serverUrl: "https://daleel-api.azurewebsites.net/api",
  env: 'Development',
  version: packageJson.version,
  defaultLang: 'ar',
  logoutRedirectUrl: 'https://daleel-app.azurewebsites.net/auth/login'
};
