import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { ServerErrorInterceptor } from '@wa/app/interceptors/interceptors/server-error/server-error.interceptor';

describe('ServerErrorInterceptor', () => {
	let spectator: SpectatorService<ServerErrorInterceptor>;

	const createService = createServiceFactory(ServerErrorInterceptor);

	beforeEach(() => (spectator = createService()));

	it('should be created', async () => {
		await expect(spectator.service).toBeTruthy();
	});
});
