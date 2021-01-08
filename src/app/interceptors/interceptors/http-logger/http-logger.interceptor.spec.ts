import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mock';
import { HttpLoggerInterceptor } from '@wa/app/interceptors/interceptors/http-logger/http-logger.interceptor';

describe('RequestsInterceptor', () => {
	let spectator: SpectatorService<HttpLoggerInterceptor>;

	const createService = createServiceFactory(HttpLoggerInterceptor);

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
