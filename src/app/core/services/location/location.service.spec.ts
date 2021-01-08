import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { LocationService } from '@wa/app/core/services/location/location.service';

describe('LocationService', () => {
	let spectator: SpectatorService<LocationService>;

	const createService = createServiceFactory(LocationService);

	beforeEach(() => {
		spectator = createService();
	});

	it('should be defined', () => {
		expect(spectator.service).toBeDefined();
	});
});
