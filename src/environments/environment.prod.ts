/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Environment } from '@wa/app/models/environment.model';

import { author, name, version } from '../../package.json';

export const environment: Environment = {
	production: true,
	name,
	version,
	author,
	firebase: {
		apiKey: 'AIzaSyAHMR9xp8zexa3xCOX8tH0lqP3ravvypkc',
		authDomain: 'ng-weather-app-prod.firebaseapp.com',
		projectId: 'ng-weather-app-prod',
		storageBucket: 'ng-weather-app-prod.appspot.com',
		messagingSenderId: '492495005556',
		appId: '1:492495005556:web:195f345bb6d7c96309ee21',
		measurementId: 'G-E1YBDPZ9ZV',
	},
	configId: 'UDIkbegpZbMusG3m7TyO',
	slack: {
		hookUrl: 'https://hooks.slack.com/services/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',
		channel: 'ng-weather-app-log-prod',
	},
};
