import { Provider } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mock';

import { AboutMeComponent } from './about-me.component';

describe('AboutMeComponent', () => {
	let host: SpectatorHost<AboutMeComponent>;

	let configProvider: Provider;

	const createHost = createHostFactory(AboutMeComponent);

	beforeEach(() => {
		const { configServiceProvider } = new MasterMock().mockConfig();

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
