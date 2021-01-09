/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Environment } from '@wa/app/models/environment.model';

import { author, name, version } from '../../package.json';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: Environment = {
	production: false,
	name,
	version,
	author,
	firebase: {
		apiKey: 'AIzaSyDDx2nHBea8HgHXhloQvnYAeHvZyrnrC4g',
		authDomain: 'ng-weather-app-staging.firebaseapp.com',
		projectId: 'ng-weather-app-staging',
		storageBucket: 'ng-weather-app-staging.appspot.com',
		messagingSenderId: '255407891982',
		appId: '1:255407891982:web:bfeeb22db54eb9c3e77e5f',
		measurementId: 'G-MR3CW3H12G',
	},
	slack: {
		hookUrl: 'https://hooks.slack.com/services/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',
		channel: 'ng-weather-app-log-staging',
	},
	configId: '2Gj7vJyw4oSg4O5xbJ15',
	profileId: 'VEo3yNzpFO1zCxPXtM5d',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
