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

		mockReset(localStorageServiceMock);

		spectator = createService({
			providers: [{ provide: LocalStorageService, useValue: localStorageServiceMock }],
		});
	});

	it('should be created', () => {
		expect(spectator.service).toBeDefined();
	});

	describe('getUnit', () => {
		it('should call LocalStorageService.get with expected key', () => {
			spectator.service.getUnit();

			expect(localStorageServiceMock.get).toHaveBeenCalledWith(StorageKeys.Units);
		});

		it('should return correct unit parsing LocalStorageService.get result', () => {
			const expectedUnit: Units = Units.Imperial;

			localStorageServiceMock.get.calledWith(StorageKeys.Units).mockReturnValue(expectedUnit);

			const unit: Units = spectator.service.getUnit();

			expect(unit).toEqual(expectedUnit);
		});

		it('should return default Metric unit when LocalStorageService.get returns an invalid result', () => {
			localStorageServiceMock.get.calledWith(StorageKeys.Units).mockReturnValue(null);

			const unit: Units = spectator.service.getUnit();

			expect(unit).toEqual(Units.Metric);
		});
	});
});
