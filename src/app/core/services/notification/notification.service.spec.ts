import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { NotificationService } from '@wa/app/core/services/notification/notification.service';

describe('NotificationService', () => {
	let spectator: SpectatorService<NotificationService>;

	const createService = createServiceFactory(NotificationService);

	beforeEach(() => {
		spectator = createService();
	});

	it('should be created', () => {
		expect(spectator.service).toBeTruthy();
	});
});
