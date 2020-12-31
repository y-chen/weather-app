import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { ForecastResolver } from './forecast.resolver';

describe('ForecastResolver', () => {
	let spectator: SpectatorService<ForecastResolver>;

	const createService = createServiceFactory(ForecastResolver);

	beforeEach(() => (spectator = createService()));

	it('should be created', async () => {
		await expect(spectator.service).toBeTruthy();
	});
});
