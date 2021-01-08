import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mock';
import { NotificationService } from '@wa/app/core/services/notification/notification.service';

describe('NotificationService', () => {
	let spectator: SpectatorService<NotificationService>;

	const createService = createServiceFactory(NotificationService);

	beforeEach(() => {
		const { configServiceProvider } = new MasterMock().mockConfig();

		spectator = createService({
			providers: [configServiceProvider],
		});
	});

	it('should be created', () => {
		expect(spectator.service).toBeTruthy();
	});
});
