import { mock, MockProxy, mockReset } from 'jest-mock-extended';

import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { WeatherGroupResolver } from '@wa/app/core/resolvers/weather-group/weather-group.resolver';
import {
	getWeatherGroupResolverMocks, WeatherGroupResolverMocks
} from '@wa/app/core/resolvers/weather-group/weather-group.resolver.spec.mocks';
import { LocalStorageService, StorageKeys } from '@wa/app/core/services/local-storage/local-storage.service';
import { OpenWeatherService } from '@wa/app/core/services/open-weather/open-weather.service';

describe('GroupForecastResolver', () => {
	let spectator: SpectatorService<WeatherGroupResolver>;
	let localStorageServiceMock: MockProxy<LocalStorageService>;
	let openWeatherServiceMock: MockProxy<OpenWeatherService>;

	const createService = createServiceFactory(WeatherGroupResolver);

	let mocks: WeatherGroupResolverMocks;

	beforeEach(() => {
		localStorageServiceMock = mock<LocalStorageService>();
		openWeatherServiceMock = mock<OpenWeatherService>();

		spectator = createService({
			providers: [
				{ provide: LocalStorageService, useValue: localStorageServiceMock },
				{ provide: OpenWeatherService, useValue: openWeatherServiceMock },
			],
		});

		mocks = getWeatherGroupResolverMocks();
	});

	afterEach(() => {
		mockReset(localStorageServiceMock);
		mockReset(openWeatherServiceMock);
	});

	it('should be created', () => {
		expect(spectator.service).toBeDefined();
	});

	describe('resolve', () => {
		it('should call LocalStorageService.get with expected key', async () => {
			const { storedFavouriteCities, route } = mocks;

			localStorageServiceMock.get.calledWith(StorageKeys.favouriteCities).mockReturnValue(storedFavouriteCities);

			await spectator.service.resolve(route);

			expect(localStorageServiceMock.get).toHaveBeenCalledWith(StorageKeys.favouriteCities);
		});

		it('should call LocalStorageService.set with already stored favourite cities when are retreived', async () => {
			const { storedFavouriteCities, route } = mocks;

			localStorageServiceMock.get.calledWith(StorageKeys.favouriteCities).mockReturnValue(storedFavouriteCities);

			await spectator.service.resolve(route);

			expect(localStorageServiceMock.set).toHaveBeenCalledWith(StorageKeys.favouriteCities, storedFavouriteCities);
		});

		it('should call LocalStorageService.set with defaultCities when are favourite cities are not found', async () => {
			const { defaultCities, route } = mocks;
			route.data = { defaultCities };

			await spectator.service.resolve(route);

			expect(localStorageServiceMock.set).toHaveBeenCalledWith(StorageKeys.favouriteCities, JSON.stringify(defaultCities));
		});

		it('should call OpenWeatherService.getWeatherGroup with stored favourite cities when are retreived', async () => {
			const { storedFavouriteCities, route } = mocks;

			localStorageServiceMock.get.calledWith(StorageKeys.favouriteCities).mockReturnValue(storedFavouriteCities);

			await spectator.service.resolve(route);

			expect(openWeatherServiceMock.getWeatherGroup).toHaveBeenCalledWith({ group: JSON.parse(storedFavouriteCities) as number[] });
		});

		it('should call OpenWeatherService.getWeatherGroup with default cities when are retreived', async () => {
			const { defaultCities, route } = mocks;
			route.data = { defaultCities };

			await spectator.service.resolve(route);

			expect(openWeatherServiceMock.getWeatherGroup).toHaveBeenCalledWith({ group: defaultCities });
		});

		it('should not call OpenWeatherService.getWeatherGroup when calculated group is empty', async () => {
			const { route } = mocks;

			localStorageServiceMock.get.calledWith(StorageKeys.favouriteCities).mockReturnValue('[]');

			await spectator.service.resolve(route);

			expect(openWeatherServiceMock.getWeatherGroup).not.toHaveBeenCalled();
		});

		it('should not call OpenWeatherService.getWeatherGroup when calculated group is not defined', async () => {
			const { route } = mocks;
			route.data = { defaultCities: null };

			await spectator.service.resolve(route);

			expect(openWeatherServiceMock.getWeatherGroup).not.toHaveBeenCalled();
		});

		it('should return an empty array if favourite cities are not found', async () => {
			const { route } = mocks;
			route.data = { defaultCities: null };

			localStorageServiceMock.get.calledWith(StorageKeys.favouriteCities).mockReturnValue(null);

			const result = await spectator.service.resolve(route);

			expect(result).toBeEmpty();
		});
	});
});
