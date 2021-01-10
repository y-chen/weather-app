import { Provider } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockMaster } from '@wa/app/common/mock-master';

import { AboutMeComponent } from './about-me.component';

describe('AboutMeComponent', () => {
	let host: SpectatorHost<AboutMeComponent>;

	let configProvider: Provider;

	const createHost = createHostFactory(AboutMeComponent);

	beforeEach(() => {
		const { configServiceProvider } = new MockMaster().mockConfig();

		configProvider = configServiceProvider;
	});

	it('should create', () => {
		host = createHost('<wa-about-me></wa-about-me>', {
			providers: [configProvider],
		});

		const me = host.queryHost('wa-about-me');

		expect(host).toExist();
		expect(me).toExist();
	});
});
