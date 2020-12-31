import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { LoaderInterceptor } from '@wa/app/interceptors/interceptors/loader/loader.interceptor';

describe('LoaderInterceptor', () => {
	let spectator: SpectatorService<LoaderInterceptor>;

	const createService = createServiceFactory(LoaderInterceptor);

	beforeEach(() => (spectator = createService()));

	it('should be created', async () => {
		await expect(spectator.service).toBeTruthy();
	});
});
