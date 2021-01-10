import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MockMaster } from '@wa/app/common/mock-master';

import { KeysPipe } from './keys.pipe';

describe('KeysPipe', () => {
	let spectator: SpectatorService<KeysPipe>;

	const createService = createServiceFactory(KeysPipe);

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
