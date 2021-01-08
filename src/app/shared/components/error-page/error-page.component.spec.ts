import { MockProxy, mockReset } from 'jest-mock-extended';

import { Provider } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mocks';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import { SettingsService } from '@wa/app/core/services/settings/settings.service';
import { ErrorPageComponent } from '@wa/app/shared/components/error-page/error-page.component';

describe('ErrorPageComponent', () => {
	let host: SpectatorHost<ErrorPageComponent>;

	let cultureMock: MockProxy<CultureService>;
	let settingsMock: MockProxy<SettingsService>;

	let cultureProvider: Provider;
	let settingsProvider: Provider;

	const createHost = createHostFactory(ErrorPageComponent);

	beforeEach(() => {
		const {
			cultureServiceMock,
			settingsServiceMock,

			cultureServiceProvider,
			settingsServiceProvider,
		} = new MasterMock().mockSettings().mockCultures();

		cultureMock = cultureServiceMock;
		settingsMock = settingsServiceMock;

		cultureProvider = cultureServiceProvider;
		settingsProvider = settingsServiceProvider;
	});

	afterEach(() => {
		mockReset(cultureMock);
		mockReset(settingsMock);
	});

	it('should create', () => {
		host = createHost('<wa-error-page></wa-error-page>', {
			providers: [cultureProvider, settingsProvider],
		});

		const errorPage = host.queryHost('wa-error-page');

		expect(host).toExist();
		expect(errorPage).toExist();
	});
});
