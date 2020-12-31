import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { OpenWeatherMapService } from './open-weather-map.service';

describe('OpenWeatherMapService', () => {
	let spectator: SpectatorService<OpenWeatherMapService>;

	const createService = createServiceFactory(OpenWeatherMapService);

	beforeEach(() => (spectator = createService()));

	it('should be created', async () => {
		await expect(spectator.service).toBeTruthy();
	});
});
