import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { ComponentService } from './component.service';

describe('ComponentService', () => {
	let spectator: SpectatorService<ComponentService>;
	const createService = createServiceFactory(ComponentService);

	beforeEach(() => (spectator = createService()));

	it('should be defined', () => {
		expect(spectator.service).toBeDefined();
	});
});
