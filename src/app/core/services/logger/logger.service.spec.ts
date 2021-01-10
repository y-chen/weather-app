import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MockMaster } from '@wa/app/common/mock-master';

import { LoggerService } from './logger.service';

describe('LoggerService', () => {
	let spectator: SpectatorService<LoggerService>;

	const createService = createServiceFactory(LoggerService);

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
