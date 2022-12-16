// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { initializeApp } from "firebase/app";

export const environment = {
  production: false,
    apiClimaKey: '4166c7586617a05dc6393d1fbb67a980',
    apiClimaUrl: 'https://api.openweathermap.org/data/2.5/',

  firebase:{
    apiKey: "AIzaSyCJcEeg8NnfUdYZwFtaBaS9NmUnxLtN2FM",
  authDomain: "tellevoapp-43f4b.firebaseapp.com",
  projectId: "tellevoapp-43f4b",
  storageBucket: "tellevoapp-43f4b.appspot.com",
  messagingSenderId: "277306839497",
  appId: "1:277306839497:web:ecb9718c7620d2be6ad818",
  measurementId: "G-HM1E5DQ6X2"
    
      
  }
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
