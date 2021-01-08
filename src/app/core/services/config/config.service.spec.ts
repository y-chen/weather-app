import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mocks';
import { ConfigService } from '@wa/app/core/services/config/config.service';

describe('ConfigService', () => {
	let spectator: SpectatorService<ConfigService>;

	const createService = createServiceFactory(ConfigService);

	beforeEach(() => {
		const { angularFirestoreProvider } = new MasterMock();

		spectator = createService({
			providers: [angularFirestoreProvider],
		});
	});

	it('should be created', () => {
		expect(spectator.service).toBeDefined();
	});
});
