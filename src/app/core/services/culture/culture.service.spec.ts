import { mock, MockProxy, mockReset } from 'jest-mock-extended';

import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { TranslateService } from '@ngx-translate/core';
import { CultureService } from '@wa/app/core/services/culture/culture.service';

describe('CultureService', () => {
	let spectator: SpectatorService<CultureService>;
	let translateMock: MockProxy<TranslateService>;

	const createService = createServiceFactory({
		service: CultureService,
		mocks: [TranslateService],
	});

	beforeEach(() => {
		translateMock = mock<TranslateService>();

		mockReset(translateMock);

		spectator = createService({
			providers: [{ provide: TranslateService, useValue: translateMock }],
		});
	});

	it('should be defined', async () => {
		await expect(spectator.service).toBeDefined();
	});

	describe('getAvailableCultures', () => {
		it('should return an array of type Culture', async () => {
			const cultures = spectator.service.getAvailableCultures();

			for (const culture of cultures) {
				await expect('label' in culture).toBeTruthy();
				await expect('language' in culture).toBeTruthy();
				await expect('code' in culture).toBeTruthy();
			}
		});
	});

	describe('getCulture', () => {
		it('should return an object of type Culture', async () => {
			const culture = spectator.service.getCulture();

			await expect('label' in culture).toBeTruthy();
			await expect('language' in culture).toBeTruthy();
			await expect('code' in culture).toBeTruthy();
		});
	});

	describe('setCulture', () => {
		it('should set the received culture as current one', async () => {
			const en = { label: 'English', language: 'en', code: 'en-GB' };

			spectator.service.setCulture(en);
			const currentCulture = spectator.service.getCulture();

			await expect(currentCulture).toEqual(en);
		});

		it('should call TranslateService.use with expected language when called with different culture from current one', () => {
			const en = { label: 'English', language: 'en', code: 'en-GB' };
			const it = { label: 'Italiano', language: 'it', code: 'it-IT' };

			spectator.service.setCulture(en);
			spectator.service.setCulture(it);

			expect(translateMock.use).toHaveBeenCalledWith(it.language);
		});

		it('should not call TranslateService.use when called with same culture of the current one', async () => {
			const it = { label: 'Italiano', language: 'it', code: 'it-IT' };

			spectator.service.setCulture(it);
			spectator.service.setCulture(it);

			expect(translateMock.use).toHaveBeenCalledWith(it.language);
			await expect(translateMock.use).toHaveBeenCalledTimes(1);
		});
	});

	describe('convertUnixTimeToLocaleDate', () => {
		it('should return expected date', () => {
			const unixTime = 1577836800;
			const offset = 3600;

			const date = spectator.service.convertUnixTimeToLocaleDate(unixTime, offset);

			void expect(date).toEqual('01/01/2020 - 2:00 GMT+1');
		});
	});
});
