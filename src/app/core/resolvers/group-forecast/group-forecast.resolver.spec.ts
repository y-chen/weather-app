import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import {
	GroupForecastResolver
} from '@wa/app/core/resolvers/group-forecast/group-forecast.resolver';

describe('GroupForecastResolver', () => {
	let spectator: SpectatorService<GroupForecastResolver>;

	const createService = createServiceFactory(GroupForecastResolver);

	beforeEach(() => (spectator = createService()));

	it('should be created', async () => {
		await expect(spectator.service).toBeTruthy();
	});
});
