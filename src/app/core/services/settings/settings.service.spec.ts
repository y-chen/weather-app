import { mock, MockProxy, mockReset } from 'jest-mock-extended';

import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { LocalStorageService, StorageKeys } from '@wa/app/core/services/local-storage/local-storage.service';
import { SettingsService } from '@wa/app/core/services/settings/settings.service';
import { Units } from '@wa/app/models/open-weather.model';

describe('SettingsService', () => {
	let spectator: SpectatorService<SettingsService>;
	let localStorageServiceMock: MockProxy<LocalStorageService>;

	const createService = createServiceFactory({
		service: SettingsService,
		mocks: [LocalStorageService],
	});

	beforeEach(() => {
		localStorageServiceMock = mock<LocalStorageService>();

		spectator = createService({
			providers: [{ provide: LocalStorageService, useValue: localStorageServiceMock }],
		});
	});

	afterEach(() => {
		mockReset(localStorageServiceMock);
	});

	it('should be created', () => {
		expect(spectator.service).toBeDefined();
	});

	describe('getCulture', () => {
		it('should call LocalStorageService.get with expected key', () => {
			spectator.service.getCulture();

			expect(localStorageServiceMock.get).toHaveBeenCalledWith(StorageKeys.Culture);
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

			expect(localStorageServiceMock.set).toBeCalledWith(StorageKeys.Culture, JSON.stringify(culture));
		});
	});

	describe('getUnit', () => {
		it('should call LocalStorageService.get with expected key', () => {
			spectator.service.getUnit();

			expect(localStorageServiceMock.get).toHaveBeenCalledWith(StorageKeys.Units);
		});

		it('should return a defined Units even when LocalStorageService.get returns null', () => {
			localStorageServiceMock.get.mockReturnValue(null);

			const unit = spectator.service.getUnit();

			expect(unit).toBeDefined();
			expect(Object.values(Units).includes(unit)).toBeTrue();
		});
	});

	describe('setUnit', () => {
		it('should call LocalStorageService.set with expected arguments', () => {
			const unit = Units.Imperial;

			spectator.service.setUnit(unit);

			expect(localStorageServiceMock.set).toBeCalledWith(StorageKeys.Units, JSON.stringify(unit));
		});
	});
});
