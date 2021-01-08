import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mock';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
	let spectator: SpectatorService<LoaderService>;

	const createService = createServiceFactory(LoaderService);

	beforeEach(() => {
		const { configServiceProvider } = new MasterMock().mockConfig();

		spectator = createService({
			providers: [configServiceProvider],
		});
	});

	it('should be created', () => {
		expect(spectator.service).toBeTruthy();
	});
});
