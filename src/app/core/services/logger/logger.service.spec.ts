import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mock';

import { LoggerService } from './logger.service';

describe('LoggerService', () => {
	let spectator: SpectatorService<LoggerService>;

	const createService = createServiceFactory(LoggerService);

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
