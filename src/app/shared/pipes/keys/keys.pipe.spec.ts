import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { KeysPipe } from '@wa/app/shared/pipes/keys/keys.pipe';

describe('KeysPipe', () => {
	let spectator: SpectatorService<KeysPipe>;

	const createService = createServiceFactory(KeysPipe);

	beforeEach(() => (spectator = createService()));

	it('should be created', async () => {
		await expect(spectator.service).toBeTruthy();
	});
});
