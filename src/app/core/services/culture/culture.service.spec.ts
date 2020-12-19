import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { CultureService } from './culture.service';

describe('CultureService', () => {
	let spectator: SpectatorService<CultureService>;
	const createService = createServiceFactory(CultureService);

	beforeEach(() => (spectator = createService()));

	it('should be created', () => {
		expect(spectator.service).toBeTruthy();
	});

	describe('getAvailableCultures', () => {
		it('should return an array of type Culture', () => {
			const cultures = spectator.service.getAvailableCultures();

			for (const culture of cultures) {
				expect('label' in culture).toBeTruthy();
				expect('language' in culture).toBeTruthy();
				expect('code' in culture).toBeTruthy();
			}
		});
	});

	describe('setCulture', () => {
		it('should set the received cultire as current one', () => {
			const culture = { label: 'English', language: 'en', code: 'en-GB' };

			spectator.service.setCulture(culture);
			const currentCulture = spectator.service.getCulture();

			expect(currentCulture).toEqual(culture);
		});
	});

	describe('getCulture', () => {
		it('should return an object of type Culture', () => {
			const culture = spectator.service.getCulture();

			expect('label' in culture).toBeTruthy();
			expect('language' in culture).toBeTruthy();
			expect('code' in culture).toBeTruthy();
		});
	});
});
