import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { TimeZoneService } from '@wa/app/core/services/time-zone/time-zone.service';

describe('TimeZoneService', () => {
	let spectator: SpectatorService<TimeZoneService>;

	const createService = createServiceFactory(TimeZoneService);

	beforeEach(() => (spectator = createService()));

	it('should be created', async () => {
		await expect(spectator.service).toBeTruthy();
	});
});
