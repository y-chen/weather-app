import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { ProfileResolver } from './profile.resolver';

describe('ProfileResolver', () => {
	let spectator: SpectatorService<ProfileResolver>;

	const createService = createServiceFactory(ProfileResolver);

	beforeEach(() => {
		spectator = createService();
	});

	it('should be created', () => {
		expect(spectator.service).toBeDefined();
	});
});
