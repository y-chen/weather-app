import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { HereMapsAuthService } from '@wa/app/core/services/here-maps-auth/here-maps-auth.service';

describe('HereMapsAuthService', () => {
	let spectator: SpectatorService<HereMapsAuthService>;
	const createService = createServiceFactory(HereMapsAuthService);

	beforeEach(() => (spectator = createService()));

	it('should be created', () => {
		expect(spectator.service).toBeTruthy();
	});
});
