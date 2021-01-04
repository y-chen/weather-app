import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { LocalStorageService } from '@wa/app/core/services/local-storage/local-storage.service';
import { mockLocalStorage } from '@wa/app/core/services/local-storage/local-storage.spec.mocks';

describe('LocalStorageService', () => {
	let spectator: SpectatorService<LocalStorageService>;
	const { getItemMock, setItemMock, removeItemMock } = mockLocalStorage();

	const createService = createServiceFactory(LocalStorageService);

	const key = 'Key';
	const value = 'Value';

	beforeEach(() => (spectator = createService()));

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
