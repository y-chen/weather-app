import { MockProxy, mockReset } from 'jest-mock-extended';
import moment from 'moment';

import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { TranslateService } from '@ngx-translate/core';
import { MasterMock } from '@wa/app/common/master-mock';
import { getTestData, TestData } from '@wa/app/common/test-data';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import { SettingsService } from '@wa/app/core/services/settings/settings.service';

describe('CultureService', () => {
	let spectator: SpectatorService<CultureService>;

	let settingsMock: MockProxy<SettingsService>;
	let translateMock: MockProxy<TranslateService>;

	const createService = createServiceFactory(CultureService);

let testData: TestData;

	beforeEach(() => {
		const { settingsServiceMock, translateServiceMock, settingsServiceProvider, translateServiceProvider } = new MasterMock();

		settingsMock = settingsServiceMock;
		translateMock = translateServiceMock;

		spectator = createService({
			providers: [settingsServiceProvider, translateServiceProvider],
    });

    testData = getTestData();
	});

	afterEach(() => {
		mockReset(settingsMock);
		mockReset(translateMock);
	});

	it('should be defined', () => {
		expect(spectator.service).toBeDefined();
	});

	describe('init', () => {
		it('should call SettingsService.setCulture and TranslateService.setDefaultLang to init culture', () => {
			spectator.service.init();

			expect(translateMock.setDefaultLang).toHaveBeenCalled();
			expect(settingsMock.setCulture).toHaveBeenCalled();
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
			const storedCulture = testData.en
			const newCulture = testData.it

			settingsMock.getCulture.mockReturnValue(storedCulture);

			spectator.service.setCulture(newCulture);

			expect(settingsMock.setCulture).toHaveBeenCalledWith(newCulture);
		});

		it('should call TranslateService.use with expected language when stored culture is different from provided one', () => {
			const storedCulture = testData.en
			const newCulture = testData.it

			settingsMock.getCulture.mockReturnValue(storedCulture);

			spectator.service.setCulture(newCulture);

			expect(translateMock.use).toHaveBeenCalledWith(newCulture.language);
		});

		it('should not call SettingsService.setCulture or TranslateService.use when stored culture is same of provided one', () => {
			const storedCulture = testData.en

			settingsMock.getCulture.mockReturnValue(storedCulture);

			spectator.service.setCulture(storedCulture);

			expect(settingsMock.setCulture).not.toHaveBeenCalled();
			expect(translateMock.use).not.toHaveBeenCalled();
		});
	});

	describe('convertUnixTimeToLocaleDate', () => {
		it('should return expected date', () => {
			const unixTime = 1577836800;
			const offset = 3600;

			const date = spectator.service.convertUnixTimeToLocaleDate(unixTime, offset);

			expect(date).toEqual(moment((unixTime + offset) * 1000).toString());
		});
	});
});
