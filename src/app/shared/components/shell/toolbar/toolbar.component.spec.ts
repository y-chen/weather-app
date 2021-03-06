import { Provider } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockMaster } from '@wa/app/common/mock-master';

import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
	let host: SpectatorHost<ToolbarComponent>;

	let componentProvider: Provider;
	let configProvider: Provider;
	let settingsProvider: Provider;

	const createHost = createHostFactory(ToolbarComponent);

	beforeEach(() => {
		const {
			componentServiceProvider,
			configServiceProvider,
			settingsServiceProvider,
		} = new MockMaster().mockConfig().mockCultureWithEnglish();

		componentProvider = componentServiceProvider;
		configProvider = configServiceProvider;
		settingsProvider = settingsServiceProvider;
	});

	it('should create', () => {
		host = createHost('<wa-toolbar></wa-toolbar>', {
			providers: [componentProvider, configProvider, settingsProvider],
		});

		const toolbar = host.queryHost('wa-toolbar');

		expect(host).toExist();
		expect(toolbar).toExist();
	});
});
