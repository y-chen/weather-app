import { mock, MockProxy, mockReset } from 'jest-mock-extended';

import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { TranslateService } from '@ngx-translate/core';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import { SettingsService } from '@wa/app/core/services/settings/settings.service';

describe('CultureService', () => {
	let spectator: SpectatorService<CultureService>;
	let settingsServiceMock: MockProxy<SettingsService>;
	let translateMock: MockProxy<TranslateService>;

	const createService = createServiceFactory(CultureService);

	beforeEach(() => {
		settingsServiceMock = mock<SettingsService>();
		translateMock = mock<TranslateService>();

		spectator = createService({
			providers: [
				{ provide: SettingsService, useValue: settingsServiceMock },
				{ provide: TranslateService, useValue: translateMock },
			],
		});
	});

	afterEach(() => {
		mockReset(settingsServiceMock);
		mockReset(translateMock);
	});

	it('should be defined', () => {
		expect(spectator.service).toBeDefined();
	});

	describe('init', () => {
		it('should call SettingsService.setCulture and TranslateService.setDefaultLang to init culture', () => {
			spectator.service.init();

			expect(translateMock.setDefaultLang).toHaveBeenCalled();
			expect(settingsServiceMock.setCulture).toHaveBeenCalled();
		});
	});

	describe('getAvailableCultures', () => {
		it('should return an array of type Culture', () => {
			const cultures = spectator.service.getAvailableCultures();

			for (const culture of cultures) {
				expect('label' in culture).toBeTrue();
				expect('language' in culture).toBeTrue();
				expect('code' in culture).toBeTrue();
			}
		});
	});

	describe('setCulture', () => {
		it('should call SettingsService.setCulture with expected culture when stored culture is different from provided one', () => {
			const storedCulture = { label: 'English', language: 'en', code: 'en-GB' };
			const newCulture = { label: 'Italiano', language: 'it', code: 'it-IT' };

			settingsServiceMock.getCulture.mockReturnValue(storedCulture);

			spectator.service.setCulture(newCulture);

			expect(settingsServiceMock.setCulture).toHaveBeenCalledWith(newCulture);
		});

		it('should call TranslateService.use with expected language when stored culture is different from provided one', () => {
			const storedCulture = { label: 'English', language: 'en', code: 'en-GB' };
			const newCulture = { label: 'Italiano', language: 'it', code: 'it-IT' };

			settingsServiceMock.getCulture.mockReturnValue(storedCulture);

			spectator.service.setCulture(newCulture);

			expect(translateMock.use).toHaveBeenCalledWith(newCulture.language);
		});

		it('should not call SettingsService.setCulture or TranslateService.use when stored culture is same of provided one', () => {
			const storedCulture = { label: 'English', language: 'en', code: 'en-GB' };

			settingsServiceMock.getCulture.mockReturnValue(storedCulture);

			spectator.service.setCulture(storedCulture);

			expect(settingsServiceMock.setCulture).not.toHaveBeenCalled();
			expect(translateMock.use).not.toHaveBeenCalled();
		});
	});

	describe('convertUnixTimeToLocaleDate', () => {
		it('should return expected date', () => {
			const unixTime = 1577836800;
			const offset = 3600;

			const date = spectator.service.convertUnixTimeToLocaleDate(unixTime, offset);

			expect(date).toEqual('01/01/2020 - 2:00 GMT+1');
		});
	});
});
