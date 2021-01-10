import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MockMaster } from '@wa/app/common/mock-master';

import { LoaderInterceptor } from './loader.interceptor';

describe('LoaderInterceptor', () => {
	let spectator: SpectatorService<LoaderInterceptor>;

	const createService = createServiceFactory(LoaderInterceptor);

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
