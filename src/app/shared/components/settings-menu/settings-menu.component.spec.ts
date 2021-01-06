import { mock, MockProxy, mockReset } from 'jest-mock-extended';

import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { availableCultures, CultureService } from '@wa/app/core/services/culture/culture.service';
import { SettingsService } from '@wa/app/core/services/settings/settings.service';
import { SettingsMenuComponent } from '@wa/app/shared/components/settings-menu/settings-menu.component';

describe('SettingsMenuComponent', () => {
	let host: SpectatorHost<SettingsMenuComponent>;
	let cultureServiceMock: MockProxy<CultureService>;
	let settingsServiceMock: MockProxy<SettingsService>;

	const createHost = createHostFactory(SettingsMenuComponent);

	beforeEach(() => {
		cultureServiceMock = mock<CultureService>();
		settingsServiceMock = mock<SettingsService>();

		cultureServiceMock.getAvailableCultures.mockReturnValue(availableCultures);
		settingsServiceMock.getCulture.mockReturnValue(availableCultures[0]);
	});

	afterEach(() => {
		mockReset(cultureServiceMock);
		mockReset(settingsServiceMock);
	});

	it('should create', () => {
		host = createHost('<wa-settings-menu></wa-settings-menu>', {
			providers: [
				{ provide: CultureService, useValue: cultureServiceMock },
				{ provide: SettingsService, useValue: settingsServiceMock },
			],
		});

		const settingsMenu = host.queryHost('wa-settings-menu');

		expect(host).toExist();
		expect(settingsMenu).toExist();
	});
});
