import { Provider } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockMaster } from '@wa/app/common/mock-master';

import { OverlaySpinnerComponent } from './overlay-spinner.component';

describe('OverlaySpinnerComponent', () => {
	let host: SpectatorHost<OverlaySpinnerComponent>;

	let configProvider: Provider;

	const createHost = createHostFactory(OverlaySpinnerComponent);

	beforeEach(() => {
		const { configServiceProvider } = new MockMaster().mockConfig();

		configProvider = configServiceProvider;
	});

	it('should create', () => {
		host = createHost('<wa-overlay-spinner></wa-overlay-spinner>', {
			providers: [configProvider],
		});

		const overlay = host.queryHost('wa-overlay-spinner');

		expect(host).toExist();
		expect(overlay).toExist();
	});
});
