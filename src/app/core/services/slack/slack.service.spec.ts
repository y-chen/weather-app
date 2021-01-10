import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MockMaster } from '@wa/app/common/mock-master';

import { SlackService } from './slack.service';

describe('SlackService', () => {
	let spectator: SpectatorService<SlackService>;

	const createService = createServiceFactory(SlackService);

	beforeEach(() => {
		const { configServiceProvider } = new MockMaster().mockConfig();

		spectator = createService({
			providers: [configServiceProvider],
		});
	});

	it('should be created', () => {
		expect(spectator.service).toBeDefined();
	});
});
