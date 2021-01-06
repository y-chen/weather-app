import { mock, MockProxy, mockReset } from 'jest-mock-extended';

import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import { SettingsService } from '@wa/app/core/services/settings/settings.service';
import { LanguageSelectorComponent } from '@wa/app/shared/components/language-selector/language-selector.component';

describe('LanguageSelectorComponent', () => {
	let host: SpectatorHost<LanguageSelectorComponent>;
	let cultureServiceMock: MockProxy<CultureService>;
	let settingsServiceMock: MockProxy<SettingsService>;

	const createHost = createHostFactory(LanguageSelectorComponent);

	beforeEach(() => {
		cultureServiceMock = mock<CultureService>();
		settingsServiceMock = mock<SettingsService>();
	});

	afterEach(() => {
		mockReset(cultureServiceMock);
		mockReset(settingsServiceMock);
	});

	it('should create', () => {
		const storedCulture = { label: 'English', language: 'en', code: 'en-GB' };

		settingsServiceMock.getCulture.mockReturnValue(storedCulture);

		host = createHost('<wa-language-selector></wa-language-selector>', {
			providers: [
				{ provide: CultureService, useValue: cultureServiceMock },
				{ provide: SettingsService, useValue: settingsServiceMock },
			],
		});

		const languageSelector = host.queryHost('wa-language-selector');

		expect(host).toExist();
		expect(languageSelector).toExist();
	});
});
