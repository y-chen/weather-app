import { MockProxy, mockReset } from 'jest-mock-extended';

import { Provider } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockMaster } from '@wa/app/common/mock-master';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import { SettingsService } from '@wa/app/core/services/settings/settings.service';

import { ErrorPageComponent } from './error-page.component';

describe('ErrorPageComponent', () => {
	let host: SpectatorHost<ErrorPageComponent>;

	let cultureMock: MockProxy<CultureService>;
	let settingsMock: MockProxy<SettingsService>;

	let configProvider: Provider;
	let cultureProvider: Provider;
	let settingsProvider: Provider;

	const createHost = createHostFactory(ErrorPageComponent);

	beforeEach(() => {
		const {
			cultureServiceMock,
			settingsServiceMock,

			configServiceProvider,
			cultureServiceProvider,
			settingsServiceProvider,
		} = new MockMaster().mockConfig().mockCultures().mockSettings();

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
		host = createHost('<wa-error-page></wa-error-page>', {
			providers: [configProvider, cultureProvider, settingsProvider],
		});

		const errorPage = host.queryHost('wa-error-page');

		expect(host).toExist();
		expect(errorPage).toExist();
	});
});
