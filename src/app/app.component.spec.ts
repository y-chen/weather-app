import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
	let host: SpectatorHost<AppComponent>;

	const createHost = createHostFactory({ component: AppComponent });

	it('should create the app', () => {
		host = createHost('<wa-root></wa-root>');

		const element = host.queryHost('wa-root');

		expect(element).toBeDefined();
	});

	it(`should have as title 'weather-app'`, () => {
		host = createHost('<wa-root></wa-root>');

		const title = host.component.title;

		expect(title).toEqual('weather-app');
	});
});
