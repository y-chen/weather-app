import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MockMaster } from '@wa/app/common/mock-master';

import { LocalStorageService } from './local-storage.service';
import { mockLocalStorage } from './local-storage.service.spec.mocks';

describe('LocalStorageService', () => {
	let spectator: SpectatorService<LocalStorageService>;

	const createService = createServiceFactory(LocalStorageService);

	const { getItemMock, setItemMock, removeItemMock } = mockLocalStorage();
	const key = 'Key';
	const value = 'Value';

	beforeEach(() => {
		const { configServiceProvider } = new MockMaster().mockConfig();

		spectator = createService({
			providers: [configServiceProvider],
		});
	});

	it('should be defined', () => {
		expect(spectator.service).toBeDefined();
	});

	describe('get', () => {
		it('should call localStorage.getItem with expected arguments', () => {
			spectator.service.get(key);

			expect(getItemMock).toHaveBeenCalledWith(key);
		});
	});

	describe('set', () => {
		it('should call localStorage.setItem with expected arguments', () => {
			spectator.service.set(key, value);

			expect(setItemMock).toHaveBeenCalledWith(key, value);
		});
	});

	describe('remove', () => {
		it('should call localStorage.removeItem with expected arguments', () => {
			spectator.service.remove(key);

			expect(removeItemMock).toHaveBeenCalledWith(key);
		});
	});
});
