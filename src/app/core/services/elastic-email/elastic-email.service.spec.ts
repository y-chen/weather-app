import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { ElasticEmailService } from './elastic-email.service';

describe('ElasticEmailService', () => {
	let spectator: SpectatorService<ElasticEmailService>;

	const createService = createServiceFactory(ElasticEmailService);

	beforeEach(() => {
		spectator = createService();
	});

	it('should be created', () => {
		expect(spectator.service).toBeDefined();
	});
});
