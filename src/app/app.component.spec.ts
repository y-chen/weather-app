import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
	let host: SpectatorHost<AppComponent>;

	const createHost = createHostFactory({ component: AppComponent });

	it('should create the app', () => {
		host = createHost('<app-root></app-root>');

		const element = host.queryHost('app-root');

		expect(element).toBeDefined();
	});

	it(`should have as title 'weather-app'`, () => {
		host = createHost('<app-root></app-root>');

		const title = host.component.title;

		expect(title).toEqual('weather-app');
	});

	it('should render title', () => {
		host = createHost('<app-root></app-root>');

		const span = host.query('.content span');

		expect(span.textContent).toContain('weather-app app is running!');
	});
});
