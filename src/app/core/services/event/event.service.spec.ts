import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MockMaster } from '@wa/app/common/mock-master';

import { EventService } from './event.service';

describe('EventService', () => {
	let spectator: SpectatorService<EventService>;

	const createService = createServiceFactory(EventService);

	beforeEach(() => {
		const { configServiceProvider } = new MockMaster().mockConfig();

		spectator = createService({
			providers: [configServiceProvider],
		});
	});

	it('should be defined', () => {
		expect(spectator.service).toBeDefined();
	});
});
