// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	weatherAPI: {
		appKey: '33028dc9bamshc7a6a58130988b9p1e08c0jsnf8cb9fa80510',
		url: 'https://community-open-weather-map.p.rapidapi.com/weather',
	},
	mapAPI: {
		appKey: 'AIzaSyC0UfnIPXjVVKf8PizdS0VRJL0hsu4JL_A',
		geocodeUrl: 'https://maps.googleapis.com/maps/api/geocode/json',
	},
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
