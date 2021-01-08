import { Provider } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mocks';
import { ToolbarComponent } from '@wa/app/shared/components/shell/toolbar/toolbar.component';

describe('ToolbarComponent', () => {
	let host: SpectatorHost<ToolbarComponent>;

	let componentProvider: Provider;
	let configProvider: Provider;
	let settingsProvider: Provider;

	const createHost = createHostFactory(ToolbarComponent);

	beforeEach(() => {
		const { componentServiceProvider, configServiceProvider, settingsServiceProvider } = new MasterMock().mockConfig().mockCulture();

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
