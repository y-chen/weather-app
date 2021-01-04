import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import {
	SettingsMenuComponent
} from '@wa/app/shared/components/settings-menu/settings-menu.component';

describe('SettingsMenuComponent', () => {
	let host: SpectatorHost<SettingsMenuComponent>;

	const createHost = createHostFactory({
		component: SettingsMenuComponent,
	});

	it('should create', () => {
		host = createHost('<wa-settings-menu"></wa-basic-weather>');

		const settingsMenu = host.queryHost('wa-settings-menu');

		expect(host).toExist();
		expect(settingsMenu).toExist();
	});
});
