import { MockProxy, mockReset } from 'jest-mock-extended';

import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mock';
import { Units } from '@wa/app/models/open-weather.model';

import { LocalStorageService, StorageKeys } from '../local-storage/local-storage.service';
import { SettingsService } from './settings.service';

describe('SettingsService', () => {
	let spectator: SpectatorService<SettingsService>;

	let localStorageMock: MockProxy<LocalStorageService>;

	const createService = createServiceFactory(SettingsService);

	beforeEach(() => {
		const { localStorageServiceMock, configServiceProvider, localStorageServiceProvider } = new MasterMock().mockConfig();

		localStorageMock = localStorageServiceMock;

		spectator = createService({
			providers: [configServiceProvider, localStorageServiceProvider],
		});
	});

	afterEach(() => {
		mockReset(localStorageMock);
	});

	it('should be created', () => {
		expect(spectator.service).toBeDefined();
	});

	describe('getCulture', () => {
		it('should call LocalStorageService.get with expected key', () => {
			spectator.service.getCulture();

			expect(localStorageMock.get).toHaveBeenCalledWith(StorageKeys.Culture);
		});

		it('should return a defined Culture even when LocalStorageService.get returns null', () => {
			const culture = spectator.service.getCulture();

			expect(culture).toBeDefined();
			expect('label' in culture).toBeTrue();
			expect('language' in culture).toBeTrue();
			expect('code' in culture).toBeTrue();
		});
	});

	describe('setCulture', () => {
		it('should call LocalStorageService.set with expected arguments', () => {
			const culture = { label: 'English', language: 'en', code: 'en-GB' };

			spectator.service.setCulture(culture);

			expect(localStorageMock.set).toBeCalledWith(StorageKeys.Culture, JSON.stringify(culture));
		});
	});

	describe('getUnit', () => {
		it('should call LocalStorageService.get with expected key', () => {
			spectator.service.getUnit();

			expect(localStorageMock.get).toHaveBeenCalledWith(StorageKeys.Units);
		});

		it('should return a defined Units even when LocalStorageService.get returns null', () => {
			localStorageMock.get.mockReturnValue(null);

			const unit = spectator.service.getUnit();

			expect(unit).toBeDefined();
			expect(Object.values(Units).includes(unit)).toBeTrue();
		});
	});

	describe('setUnit', () => {
		it('should call LocalStorageService.set with expected arguments', () => {
			const unit = Units.Imperial;

			spectator.service.setUnit(unit);

			expect(localStorageMock.set).toBeCalledWith(StorageKeys.Units, unit);
		});
	});
});
