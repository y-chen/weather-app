import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mock';
import { LoaderInterceptor } from '@wa/app/interceptors/interceptors/loader/loader.interceptor';

describe('LoaderInterceptor', () => {
	let spectator: SpectatorService<LoaderInterceptor>;

	const createService = createServiceFactory(LoaderInterceptor);

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
