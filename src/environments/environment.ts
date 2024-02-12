// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  name: "WIH.HR",
  // apiUrl: 'http://localhost:8000/api',
  // productImagesUrl: 'http://localhost:8000/product_images',
  // assetImagesUrl: 'http://localhost:8000'
  // apiUrl: 'https://wih.hr/public/api',
  // productImagesUrl: 'https://wih.hr/public/product_images',
  
  // wih medicine
  // apiUrl: 'https://wih.hr/medicine/public/api',
  // productImagesUrl: 'https://wih.hr/medicine/public/product_images',
  // predavaciImagesUrl: 'https://wih.hr/beauty/public/predavaci_images',
  // assetImagesUrl: 'https://wih.hr/medicine/public'
  
  // wih beauty
  apiUrl: 'https://wih.hr/beauty/public/api',
  productImagesUrl: 'https://wih.hr/beauty/public/product_images',
  predavaciImagesUrl: 'https://wih.hr/beauty/public/predavaci_images',
  assetImagesUrl: 'https://wih.hr/beauty/public'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
