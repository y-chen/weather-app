import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { ComponentService } from '@wa/app/core/services/component/component.service';

describe('ComponentService', () => {
	let spectator: SpectatorService<ComponentService>;

	const createService = createServiceFactory(ComponentService);

	const localizationBasePath = 'foo.bar';

	beforeEach(() => {
		spectator = createService();

		spectator.service.init({ localizationBasePath });
	});

	it('should be defined', async () => {
		await expect(spectator.service).toBeDefined();
	});

	describe('getLocalizationPath', () => {
		it('should compose expected localization path ', async () => {
			const end = 'foo';

			const localizationPath = spectator.service.getLocalizationPath(end);

			await expect(localizationPath).toEqual(`${localizationBasePath}.${end}`);
		});
	});
});
