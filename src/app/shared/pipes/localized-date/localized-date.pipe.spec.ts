import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MockMaster } from '@wa/app/common/mock-master';

import { LocalizedDatePipe } from './localized-date.pipe';

describe('LocalizedDatePipe', () => {
	let spectator: SpectatorService<LocalizedDatePipe>;

	const createService = createServiceFactory(LocalizedDatePipe);

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
