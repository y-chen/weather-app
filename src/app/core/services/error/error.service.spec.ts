import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { ErrorService } from '@wa/app/core/services/error/error.service';

describe('ErrorService', () => {
	let spectator: SpectatorService<ErrorService>;

	const createService = createServiceFactory(ErrorService);

	beforeEach(() => (spectator = createService()));

	it('should be created', () => {
		expect(spectator.service).toBeTruthy();
	});
});
