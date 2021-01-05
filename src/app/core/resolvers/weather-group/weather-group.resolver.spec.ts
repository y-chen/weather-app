import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { WeatherGroupResolver } from '@wa/app/core/resolvers/weather-group/weather-group.resolver';

describe('GroupForecastResolver', () => {
	let spectator: SpectatorService<WeatherGroupResolver>;

	const createService = createServiceFactory(WeatherGroupResolver);

	beforeEach(() => (spectator = createService()));

	it('should be created', () => {
		expect(spectator.service).toBeTruthy();
	});
});
