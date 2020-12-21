import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
	let host: SpectatorHost<SettingsComponent>;

	const createHost = createHostFactory({
		component: SettingsComponent,
	});

	it('should create', () => {
		host = createHost('<wa-settings></wa-settings>', {});

		const settings = host.queryHost('wa-settings');

		expect(host).toExist();
		expect(settings).toExist();
	});
});
