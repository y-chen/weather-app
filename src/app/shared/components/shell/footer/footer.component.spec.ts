import { Provider } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mock';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
	let host: SpectatorHost<FooterComponent>;

	let configProvider: Provider;

	const createHost = createHostFactory(FooterComponent);

	beforeEach(() => {
		const { configServiceProvider } = new MasterMock().mockConfig();

		configProvider = configServiceProvider;
	});

	it('should create', () => {
		host = createHost('<wa-footer></wa-footer>', {
			providers: [configProvider],
		});

		const footer = host.queryHost('wa-footer');

		expect(host).toExist();
		expect(footer).toExist();
	});
});
