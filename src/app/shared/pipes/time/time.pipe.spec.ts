import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { TimePipe } from '@wa/app/shared/pipes/time/time.pipe';

describe('TimePipe', () => {
	let spectator: SpectatorService<TimePipe>;

	const createService = createServiceFactory(TimePipe);

	beforeEach(() => (spectator = createService()));

	it('should be created', () => {
		expect(spectator.service).toBeTruthy();
	});
});
