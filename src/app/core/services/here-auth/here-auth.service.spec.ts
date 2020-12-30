import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { HereMapsAuthService } from '@wa/app/core/services/here-auth/here-auth.service';

describe('HereMapsAuthService', () => {
	let spectator: SpectatorService<HereMapsAuthService>;
	const createService = createServiceFactory(HereMapsAuthService);

	beforeEach(() => (spectator = createService()));

	it('should be created', () => {
		expect(spectator.service).toBeTruthy();
	});
});
