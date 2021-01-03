import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { LocalizedDatePipe } from '@wa/app/shared/pipes/localized-date/localized-date.pipe';

describe('LocalizedDatePipe', () => {
	let spectator: SpectatorService<LocalizedDatePipe>;

	const createService = createServiceFactory(LocalizedDatePipe);

	beforeEach(() => (spectator = createService()));

	it('should be created', async () => {
		await expect(spectator.service).toBeTruthy();
	});
});
