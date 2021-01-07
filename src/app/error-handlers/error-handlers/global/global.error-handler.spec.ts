import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { GlobalErrorHandler } from '@wa/app/error-handlers/error-handlers/global/global.error-handler';

describe('GlobalErrorHandler', () => {
	let spectator: SpectatorService<GlobalErrorHandler>;

	const createService = createServiceFactory(GlobalErrorHandler);

	beforeEach(() => (spectator = createService()));

	it('should be created', () => {
		expect(spectator.service).toBeTruthy();
	});
});
