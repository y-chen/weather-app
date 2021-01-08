import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mock';

import { KeysPipe } from './keys.pipe';

describe('KeysPipe', () => {
	let spectator: SpectatorService<KeysPipe>;

	const createService = createServiceFactory(KeysPipe);

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
