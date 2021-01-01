import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { DelayInterceptor } from '@wa/app/interceptors/interceptors/delay/delay.interceptor';

describe('DelayInterceptor', () => {
	let spectator: SpectatorService<DelayInterceptor>;

	const createService = createServiceFactory(DelayInterceptor);

	beforeEach(() => (spectator = createService()));

	it('should be created', async () => {
		await expect(spectator.service).toBeTruthy();
	});
});
