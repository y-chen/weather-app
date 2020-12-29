import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { GeoService } from '@wa/app/core/services/geo/geo.service';

describe('GeoService', () => {
	let spectator: SpectatorService<GeoService>;
	const createService = createServiceFactory(GeoService);

	beforeEach(() => (spectator = createService()));

	it('should be created', () => {
		expect(spectator.service).toBeTruthy();
	});
});
