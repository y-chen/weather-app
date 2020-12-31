import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { GeoService } from '@wa/app/core/services/geo/geo.service';

describe('GeoService', () => {
	let spectator: SpectatorService<GeoService>;

	const createService = createServiceFactory(GeoService);

	beforeEach(() => (spectator = createService()));

	it('should be defined', async () => {
		await expect(spectator.service).toBeDefined();
	});
});
