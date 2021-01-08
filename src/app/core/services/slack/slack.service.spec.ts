import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { SlackService } from './slack.service';

describe('SlackService', () => {
	let spectator: SpectatorService<SlackService>;

	const createService = createServiceFactory(SlackService);

	beforeEach(() => {
		spectator = createService();
	});

	it('should be created', () => {
		expect(spectator.service).toBeDefined();
	});
});
