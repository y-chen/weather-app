import { MockProxy, mockReset } from 'jest-mock-extended';

import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mock';
import { getTestData, TestData } from '@wa/app/common/test-data';

import { LocalStorageService, StorageKeys } from '../../services/local-storage/local-storage.service';
import { OpenWeatherService } from '../../services/open-weather/open-weather.service';
import { WeatherGroupResolver } from './weather-group.resolver';

describe('GroupForecastResolver', () => {
	let spectator: SpectatorService<WeatherGroupResolver>;

	let localStorageMock: MockProxy<LocalStorageService>;
	let openWeatherMock: MockProxy<OpenWeatherService>;

	const createService = createServiceFactory(WeatherGroupResolver);

	let testData: TestData;

	beforeEach(() => {
		const {
			localStorageServiceMock,
			openWeatherServiceMock,

			configServiceProvider,
			localStorageServiceProvider,
			openWeatherServiceProvider,
		} = new MasterMock().mockConfig();

		localStorageMock = localStorageServiceMock;
		openWeatherMock = openWeatherServiceMock;

		spectator = createService({
			providers: [configServiceProvider, localStorageServiceProvider, openWeatherServiceProvider],
		});

		testData = getTestData();
	});

	afterEach(() => {
		mockReset(localStorageMock);
		mockReset(openWeatherMock);
	});

	it('should be created', () => {
		expect(spectator.service).toBeDefined();
	});

	describe('resolve', () => {
		it('should call LocalStorageService.get with expected key', async () => {
			const { storedFavouriteCities, route } = testData;

			localStorageMock.get.calledWith(StorageKeys.FavouriteCities).mockReturnValue(storedFavouriteCities);

			await spectator.service.resolve(route);

			expect(localStorageMock.get).toHaveBeenCalledWith(StorageKeys.FavouriteCities);
		});

		it('should call LocalStorageService.set with already stored favourite cities when are retreived', async () => {
			const { storedFavouriteCities, route } = testData;

			localStorageMock.get.calledWith(StorageKeys.FavouriteCities).mockReturnValue(storedFavouriteCities);

			await spectator.service.resolve(route);

			expect(localStorageMock.set).toHaveBeenCalledWith(StorageKeys.FavouriteCities, storedFavouriteCities);
		});

		it('should call LocalStorageService.set with defaultCities when are favourite cities are not found', async () => {
			const { defaultCities, route } = testData;
			route.data = { defaultCities };

			await spectator.service.resolve(route);

			expect(localStorageMock.set).toHaveBeenCalledWith(StorageKeys.FavouriteCities, JSON.stringify(defaultCities));
		});

		it('should call OpenWeatherService.getWeatherGroup with stored favourite cities when are retreived', async () => {
			const { storedFavouriteCities, route } = testData;

			localStorageMock.get.calledWith(StorageKeys.FavouriteCities).mockReturnValue(storedFavouriteCities);

			await spectator.service.resolve(route);

			expect(openWeatherMock.getWeatherGroup).toHaveBeenCalledWith({ group: JSON.parse(storedFavouriteCities) as number[] });
		});

		it('should call OpenWeatherService.getWeatherGroup with default cities when are retreived', async () => {
			const { defaultCities, route } = testData;
			route.data = { defaultCities };

			await spectator.service.resolve(route);

			expect(openWeatherMock.getWeatherGroup).toHaveBeenCalledWith({ group: defaultCities });
		});

		it('should not call OpenWeatherService.getWeatherGroup when calculated group is empty', async () => {
			localStorageMock.get.calledWith(StorageKeys.FavouriteCities).mockReturnValue('[]');

			await spectator.service.resolve(testData.route);

			expect(openWeatherMock.getWeatherGroup).not.toHaveBeenCalled();
		});

		it('should not call OpenWeatherService.getWeatherGroup when calculated group is not defined', async () => {
			const { route } = testData;
			route.data = { defaultCities: null };

			await spectator.service.resolve(route);

			expect(openWeatherMock.getWeatherGroup).not.toHaveBeenCalled();
		});

		it('should return an empty array if favourite cities are not found', async () => {
			const { route } = testData;
			route.data = { defaultCities: null };

			localStorageMock.get.calledWith(StorageKeys.FavouriteCities).mockReturnValue(null);

			const result = await spectator.service.resolve(route);

			expect(result).toBeEmpty();
		});
	});
});
