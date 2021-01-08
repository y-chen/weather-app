import { Provider } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mock';

import { OverlaySpinnerComponent } from './overlay-spinner.component';

describe('OverlaySpinnerComponent', () => {
	let host: SpectatorHost<OverlaySpinnerComponent>;

	let configProvider: Provider;

	const createHost = createHostFactory(OverlaySpinnerComponent);

	beforeEach(() => {
		const { configServiceProvider } = new MasterMock().mockConfig();

		configProvider = configServiceProvider;
	});

	it('should create', () => {
		host = createHost('<cvm-overlay-spinner></cvm-overlay-spinner>', {
			providers: [configProvider],
		});

		const overlay = host.queryHost('cvm-overlay-spinner');

		expect(host).toExist();
		expect(overlay).toExist();
	});
});
