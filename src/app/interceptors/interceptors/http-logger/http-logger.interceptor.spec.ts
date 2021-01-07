import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { HttpLoggerInterceptor } from '@wa/app/interceptors/interceptors/http-logger/http-logger.interceptor';

describe('RequestsInterceptor', () => {
	let spectator: SpectatorService<HttpLoggerInterceptor>;

	const createService = createServiceFactory(HttpLoggerInterceptor);

	beforeEach(() => (spectator = createService()));

	it('should be created', () => {
		expect(spectator.service).toBeDefined();
	});
});
