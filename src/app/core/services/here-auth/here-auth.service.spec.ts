import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { HereAuthService } from '@wa/app/core/services/here-auth/here-auth.service';

describe('HereAuthService', () => {
	let spectator: SpectatorService<HereAuthService>;

	const createService = createServiceFactory(HereAuthService);

	beforeEach(() => (spectator = createService()));

	it('should be created', () => {
		expect(spectator.service).toBeTruthy();
	});
});
