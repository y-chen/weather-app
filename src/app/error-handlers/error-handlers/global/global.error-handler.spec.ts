import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MockMaster } from '@wa/app/common/mock-master';

import { GlobalErrorHandler } from './global.error-handler';

describe('GlobalErrorHandler', () => {
	let spectator: SpectatorService<GlobalErrorHandler>;

	const createService = createServiceFactory(GlobalErrorHandler);

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
