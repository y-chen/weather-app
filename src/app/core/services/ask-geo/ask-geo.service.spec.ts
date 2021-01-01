import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { AskGeoService } from '@wa/app/core/services/ask-geo/ask-geo.service';

describe('AskGeoService', () => {
	let spectator: SpectatorService<AskGeoService>;

	const createService = createServiceFactory(AskGeoService);

	beforeEach(() => (spectator = createService()));

	it('should be created', async () => {
		await expect(spectator.service).toBeTruthy();
	});
});
