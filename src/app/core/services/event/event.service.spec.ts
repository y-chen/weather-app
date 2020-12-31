import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { EventService } from '@wa/app/core/services/event/event.service';

describe('EventService', () => {
	let spectator: SpectatorService<EventService>;

	const createService = createServiceFactory(EventService);

	beforeEach(() => (spectator = createService()));

	it('should be defined', async () => {
		await expect(spectator.service).toBeDefined();
	});
});
