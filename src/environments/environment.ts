// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import packageJson from '../../package.json';

export const environment = {
  appName: 'Daleel System',
  production: false,
  serverUrl: "https://daleel-qa-api.azurewebsites.net/api",
  // serverUrl: "http://10.35.236.31:8082/api" //Staging,
  env: 'Development',
  version: packageJson.version,
  defaultLang: 'ar',
  logoutRedirectUrl: 'http://localhost:4200/auth/login',
  clientUrl:"http://localhost:4200/",
  UAEPassLogout:"https://stg-id.uaepass.ae/idshub/logout"
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
