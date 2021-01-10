import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MockMaster } from '@wa/app/common/mock-master';

import { LocationService } from './location.service';

describe('LocationService', () => {
	let spectator: SpectatorService<LocationService>;

	const createService = createServiceFactory(LocationService);

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
