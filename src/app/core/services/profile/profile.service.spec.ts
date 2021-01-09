import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { ProfileService } from './profile.service';

describe('ProfileService', () => {
	let spectator: SpectatorService<ProfileService>;

	const createService = createServiceFactory(ProfileService);

	beforeEach(() => {
		spectator = createService();
	});

	it('should be created', () => {
		expect(spectator.service).toBeDefined();
	});
});
