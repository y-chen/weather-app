import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import {
	OpenWeatherParserService
} from '@wa/app/core/services/open-weather-parser/open-weather-parser.service';

describe('OpenWeatherParserService', () => {
	let spectator: SpectatorService<OpenWeatherParserService>;

	const createService = createServiceFactory(OpenWeatherParserService);

	beforeEach(() => (spectator = createService()));

	it('should be created', () => {
		expect(spectator.service).toBeTruthy();
	});
});
