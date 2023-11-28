import packageJson from '../../package.json';

export const environment = {
  appName: 'Daleel System',
  production: true,
  serverUrl: "https://api-daleel.spea.shj.ae/api",
  env: 'Production',
  version: packageJson.version,
  defaultLang: 'ar',
  logoutRedirectUrl: "https://daleel.spea.shj.ae/auth/login",
  clientUrl:"https://daleel.spea.shj.ae/",
  UAEPassLogout:"https://id.uaepass.ae/idshub/logout/"

};
