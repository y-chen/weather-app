import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MockMaster } from '@wa/app/common/mock-master';

import { HttpLoggerInterceptor } from './http-logger.interceptor';

describe('RequestsInterceptor', () => {
	let spectator: SpectatorService<HttpLoggerInterceptor>;

	const createService = createServiceFactory(HttpLoggerInterceptor);

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
