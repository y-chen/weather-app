import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MockMaster } from '@wa/app/common/mock-master';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
	let spectator: SpectatorService<NotificationService>;

	const createService = createServiceFactory(NotificationService);

	beforeEach(() => {
		const { configServiceProvider } = new MockMaster().mockConfig();

		spectator = createService({
			providers: [configServiceProvider],
		});
	});

	it('should be created', () => {
		expect(spectator.service).toBeTruthy();
	});
});
