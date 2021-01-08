import { MockProxy, mockReset } from 'jest-mock-extended';

import { Provider } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mock';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import { SettingsService } from '@wa/app/core/services/settings/settings.service';

import { LanguageSelectorComponent } from './language-selector.component';

describe('LanguageSelectorComponent', () => {
	let host: SpectatorHost<LanguageSelectorComponent>;

	let cultureMock: MockProxy<CultureService>;
	let settingsMock: MockProxy<SettingsService>;

	let configProvider: Provider;
	let cultureProvider: Provider;
	let settingsProvider: Provider;

	const createHost = createHostFactory(LanguageSelectorComponent);

	beforeEach(() => {
		const {
			cultureServiceMock,
			settingsServiceMock,

			configServiceProvider,
			cultureServiceProvider,
			settingsServiceProvider,
		} = new MasterMock().mockConfig().mockCultures().mockCultureWithEnglish();

		cultureMock = cultureServiceMock;
		settingsMock = settingsServiceMock;

		configProvider = configServiceProvider;
		cultureProvider = cultureServiceProvider;
		settingsProvider = settingsServiceProvider;
	});

	afterEach(() => {
		mockReset(cultureMock);
		mockReset(settingsMock);
	});

	it('should create', () => {
		const storedCulture = { label: 'English', language: 'en', code: 'en-GB' };

		settingsMock.getCulture.mockReturnValue(storedCulture);

		host = createHost('<wa-language-selector></wa-language-selector>', {
			providers: [configProvider, cultureProvider, settingsProvider],
		});

		const languageSelector = host.queryHost('wa-language-selector');

		expect(host).toExist();
		expect(languageSelector).toExist();
	});
});
