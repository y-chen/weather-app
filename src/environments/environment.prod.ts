/* eslint-disable max-len */
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
	slack: {
		hookUrlEncrypted:
			'U2FsdGVkX19Rp+qtB4nEnxVhfEmpgzfVXR/uSAl8S8OQP7TljBVCUNq2WBRxb41AswPTjxKue+b5r7fM72J6BVQKDu1cMLF2qtsbWzlCCXLhztlnz30+r5V3Ur2kumuM7a9QAYXfgpk++R7tvD4tjA==',
		channel: 'ng-weather-app-log-prod',
	},
	configId: 'UDIkbegpZbMusG3m7TyO',
	profileId: 'ngSD10zzleo08NcUJzcy',
	key: 'hcVf4ewTeW@5Qf&x',
};
