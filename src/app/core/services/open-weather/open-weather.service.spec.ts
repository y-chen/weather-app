import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { OpenWeatherService } from './open-weather.service';

describe('OpenWeatherService', () => {
	let spectator: SpectatorService<OpenWeatherService>;

	const createService = createServiceFactory(OpenWeatherService);

	beforeEach(() => (spectator = createService()));

	it('should be created', () => {
		expect(spectator.service).toBeTruthy();
	});
});
