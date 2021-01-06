// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	cultures: [
		{
			label: 'English',
			language: 'en',
			code: 'en-GB',
		},
		{
			label: 'Italiano',
			language: 'it',
			code: 'it-IT',
		},
	],
	firebase: {
		apiKey: 'AIzaSyDDx2nHBea8HgHXhloQvnYAeHvZyrnrC4g',
		authDomain: 'ng-weather-app-staging.firebaseapp.com',
		projectId: 'ng-weather-app-staging',
		storageBucket: 'ng-weather-app-staging.appspot.com',
		messagingSenderId: '255407891982',
		appId: '1:255407891982:web:bfeeb22db54eb9c3e77e5f',
		measurementId: 'G-MR3CW3H12G',
	},
	hereAPI: {
		apiKey: '1vFZKYF-Lkd-1Cgxe1OtCRnTyCHrqLlG68zrzRNyeiM',
		auth: {
			userId: 'HERE-cc58963f-3bcc-46bd-a806-9a43a4497a23',
			clientId: 'Fy2P8YQXnkWuw0R4Z93R',
			accessKeyId: 'r97ANmQItB8vvPcWz9b3hg',
			accessKeySecret: 'PD6VVvoi-A1rpfcMESJ0i4qkgD4zZLf4JIRblHh0sxuZaIfF9IE75nVO1AKQkclfMcRFOuYtlCk5klQmVMZ6-Q',
			tokenEndpointUrl: 'https://account.api.here.com/oauth2/token',
		},
		urls: {
			geocode: 'https://geocode.search.hereapi.com/v1',
			revGeocode: 'https://revgeocode.search.hereapi.com/v1',
		},
	},
	openWeatherMapAPI: {
		apiKey: '1163bbcaa4b45487719cbc8319620fa5',
		url: 'https://api.openweathermap.org/data/2.5',
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
