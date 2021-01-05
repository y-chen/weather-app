import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { CasePipe } from '@wa/app/shared/pipes/case/case.pipe';

describe('CasePipe', () => {
	let spectator: SpectatorService<CasePipe>;

	const createService = createServiceFactory(CasePipe);

	beforeEach(() => (spectator = createService()));

	it('should be created', () => {
		expect(spectator.service).toBeTruthy();
	});
});
