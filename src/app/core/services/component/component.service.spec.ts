import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mock';
import { ComponentService } from '@wa/app/core/services/component/component.service';

describe('ComponentService', () => {
	let spectator: SpectatorService<ComponentService>;

	const createService = createServiceFactory(ComponentService);

	const localizationBasePath = 'foo.bar';

	beforeEach(() => {
		const { configServiceProvider } = new MasterMock().mockConfig();

		spectator = createService({
			providers: [configServiceProvider],
		});

		spectator.service.init({ localizationBasePath });
	});

	it('should be defined', () => {
		expect(spectator.service).toBeDefined();
	});

	describe('getLocalizationPath', () => {
		it('should compose expected localization path ', () => {
			const end = 'foo';

			const localizationPath = spectator.service.getLocalizationPath(end);

			expect(localizationPath).toEqual(`${localizationBasePath}.${end}`);
		});
	});
});
