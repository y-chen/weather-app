import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mock';

import { ElasticEmailService } from './elastic-email.service';

describe('ElasticEmailService', () => {
	let spectator: SpectatorService<ElasticEmailService>;

	const createService = createServiceFactory(ElasticEmailService);

	beforeEach(() => {
		const { configServiceProvider } = new MasterMock().mockConfig();

		spectator = createService({
			providers: [configServiceProvider],
		});
	});

	it('should be created', () => {
		expect(spectator.service).toBeDefined();
	});
});
