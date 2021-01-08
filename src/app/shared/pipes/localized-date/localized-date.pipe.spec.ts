import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mock';
import { LocalizedDatePipe } from '@wa/app/shared/pipes/localized-date/localized-date.pipe';

describe('LocalizedDatePipe', () => {
	let spectator: SpectatorService<LocalizedDatePipe>;

	const createService = createServiceFactory(LocalizedDatePipe);

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
