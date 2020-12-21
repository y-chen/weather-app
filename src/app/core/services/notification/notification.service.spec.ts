import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
	let spectator: SpectatorService<NotificationService>;
	const createService = createServiceFactory(NotificationService);

	beforeEach(() => (spectator = createService()));

	it('should be defined', () => {
		expect(spectator.service).toBeDefined();
	});
});
