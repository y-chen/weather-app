import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mock';
import { LocationService } from '@wa/app/core/services/location/location.service';

describe('LocationService', () => {
	let spectator: SpectatorService<LocationService>;

	const createService = createServiceFactory(LocationService);

	beforeEach(() => {
		const { configServiceProvider } = new MasterMock().mockConfig();

		spectator = createService({
			providers: [configServiceProvider],
		});
	});

	it('should be defined', () => {
		expect(spectator.service).toBeDefined();
	});
});
