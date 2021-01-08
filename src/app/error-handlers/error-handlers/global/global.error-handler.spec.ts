import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mock';
import { GlobalErrorHandler } from '@wa/app/error-handlers/error-handlers/global/global.error-handler';

describe('GlobalErrorHandler', () => {
	let spectator: SpectatorService<GlobalErrorHandler>;

	const createService = createServiceFactory(GlobalErrorHandler);

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
