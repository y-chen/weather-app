import { mock, MockProxy, mockReset } from 'jest-mock-extended';

import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import { SettingsService } from '@wa/app/core/services/settings/settings.service';
import { cultures } from '@wa/app/models/culture.model';
import { ErrorPageComponent } from '@wa/app/shared/components/error-page/error-page.component';

describe('ErrorPageComponent', () => {
	let host: SpectatorHost<ErrorPageComponent>;
	let cultureServiceMock: MockProxy<CultureService>;
	let settingsServiceMock: MockProxy<SettingsService>;

	const createHost = createHostFactory(ErrorPageComponent);

	beforeEach(() => {
		cultureServiceMock = mock<CultureService>();
		settingsServiceMock = mock<SettingsService>();

		cultureServiceMock.getAvailableCultures.mockReturnValue(cultures);
		settingsServiceMock.getCulture.mockReturnValue(cultures[0]);
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
