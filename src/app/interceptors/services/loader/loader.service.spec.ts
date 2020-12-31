import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
	let spectator: SpectatorService<LoaderService>;

	const createService = createServiceFactory(LoaderService);

	beforeEach(() => (spectator = createService()));

	it('should be created', async () => {
		await expect(spectator.service).toBeTruthy();
	});
});
