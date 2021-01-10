import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MockMaster } from '@wa/app/common/mock-master';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
	let spectator: SpectatorService<LoaderService>;

	const createService = createServiceFactory(LoaderService);

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
