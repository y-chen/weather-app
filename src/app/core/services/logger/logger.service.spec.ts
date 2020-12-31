import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { LoggerService } from './logger.service';

describe('LoggerService', () => {
	let spectator: SpectatorService<LoggerService>;
	const createService = createServiceFactory(LoggerService);

	beforeEach(() => (spectator = createService()));

	it('should be created', async () => {
		await expect(spectator.service).toBeTruthy();
	});
});
