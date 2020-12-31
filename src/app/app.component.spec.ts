import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { AppComponent } from '@wa/app/app.component';

describe('AppComponent', () => {
	let host: SpectatorHost<AppComponent>;

	const createHost = createHostFactory({ component: AppComponent });

	it('should create the app', async () => {
		host = createHost('<wa-root></wa-root>');

		const element = host.queryHost('wa-root');

		await expect(element).toBeDefined();
	});

	it('should have as title weather-app', async () => {
		host = createHost('<wa-root></wa-root>');

		const title = host.component.title;

		await expect(title).toEqual('weather-app');
	});
});
