import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { CasePipe } from '@wa/app/shared/pipes/case/case.pipe';

describe('CasePipe', () => {
	let spectator: SpectatorService<CasePipe>;

	const createService = createServiceFactory(CasePipe);

	beforeEach(() => (spectator = createService()));

	it('should be created', async () => {
		await expect(spectator.service).toBeTruthy();
	});
});
