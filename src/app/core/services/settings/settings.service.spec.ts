import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { SettingsService } from './settings.service';

describe('SettingsService', () => {
	let spectator: SpectatorService<SettingsService>;

	const createService = createServiceFactory(SettingsService);

	beforeEach(() => (spectator = createService()));

	it('should be created', () => {
		expect(spectator.service).toBeDefined();
	});
});
