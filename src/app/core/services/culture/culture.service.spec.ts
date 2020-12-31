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

		spectator = createService();
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

	describe('setCulture', () => {
		it('should set the received cultire as current one', async () => {
			const culture = {
				label: 'English',
				language: 'en',
				code: 'en-GB',
				timeZone: 'Europe/London',
				timeZoneCode: 'GMT',
			};

			spectator.service.setCulture(culture);
			const currentCulture = spectator.service.getCulture();

			await expect(currentCulture).toEqual(culture);
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
});
