import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MockMaster } from '@wa/app/common/mock-master';

import { ElasticEmailService } from './elastic-email.service';

describe('ElasticEmailService', () => {
	let spectator: SpectatorService<ElasticEmailService>;

	const createService = createServiceFactory(ElasticEmailService);

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
