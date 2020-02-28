// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: `http://49.12.14.220:3000/`,
  github:[{name:`ethereum/remix-workshops`,branch:`master`},{name:`bunsenstraat/remix-workshops`,branch:`master`}],
  help: 'https://github.com/bunsenstraat/remix-workshop-plugin/blob/master/README.md'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
