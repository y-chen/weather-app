import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
	let spectator: SpectatorService<LocalStorageService>;
	const createService = createServiceFactory(LocalStorageService);

	beforeEach(() => (spectator = createService()));

	it('should be created', () => {
		expect(spectator.service).toBeTruthy();
	});
});
