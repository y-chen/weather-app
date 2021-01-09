import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { EmailComposerService } from './email-composer.service';

describe('EmailComposerService', () => {
	let spectator: SpectatorService<EmailComposerService>;

	const createService = createServiceFactory(EmailComposerService);

	beforeEach(() => {
		spectator = createService();
	});

	it('should be created', () => {
		expect(spectator.service).toBeDefined();
	});
});
