import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import { TimeZoneDBService } from '@wa/app/core/services/time-zone-db/time-zone-db.service';

describe('TimeZoneDBService', () => {
	let spectator: SpectatorService<TimeZoneDBService>;

	const createService = createServiceFactory({
		service: TimeZoneDBService,
		mocks: [CultureService],
	});

	beforeEach(() => (spectator = createService()));

	it('should be created', async () => {
		await expect(spectator.service).toBeTruthy();
	});
});
