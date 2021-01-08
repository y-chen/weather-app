import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mock';
import { CasePipe } from '@wa/app/shared/pipes/case/case.pipe';

describe('CasePipe', () => {
	let spectator: SpectatorService<CasePipe>;

	const createService = createServiceFactory(CasePipe);

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
