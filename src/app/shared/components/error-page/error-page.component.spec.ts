import { mock, MockProxy, mockReset } from 'jest-mock-extended';

import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { availableCultures, CultureService } from '@wa/app/core/services/culture/culture.service';
import { SettingsService } from '@wa/app/core/services/settings/settings.service';
import { ErrorPageComponent } from '@wa/app/shared/components/error-page/error-page.component';

describe('ErrorPageComponent', () => {
	let host: SpectatorHost<ErrorPageComponent>;
	let cultureServiceMock: MockProxy<CultureService>;
	let settingsServiceMock: MockProxy<SettingsService>;

	const createHost = createHostFactory(ErrorPageComponent);

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
		host = createHost('<wa-error-page></wa-error-page>', {
			providers: [
				{ provide: CultureService, useValue: cultureServiceMock },
				{ provide: SettingsService, useValue: settingsServiceMock },
			],
		});

		const errorPage = host.queryHost('wa-error-page');

		expect(host).toExist();
		expect(errorPage).toExist();
	});
});
