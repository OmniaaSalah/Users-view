import packageJson from '../../package.json';

export const environment = {
  appName: 'Daleel System',
  production: true,
  serverUrl: "https://daleel-qa-api.azurewebsites.net/api",
  env: 'QA',
  version: packageJson.version,
  defaultLang: 'ar',
  logoutRedirectUrl: 'https://daleel-qa-app.azurewebsites.net/auth/login'
};
