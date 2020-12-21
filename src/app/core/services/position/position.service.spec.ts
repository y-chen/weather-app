import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { PositionService } from './position.service';

describe('NotificationService', () => {
	let spectator: SpectatorService<PositionService>;
	const createService = createServiceFactory(PositionService);

	beforeEach(() => (spectator = createService()));

	it('should be defined', () => {
		expect(spectator.service).toBeDefined();
	});
});
