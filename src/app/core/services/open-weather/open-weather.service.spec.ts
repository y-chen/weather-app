/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { MockProxy, mockReset } from 'jest-mock-extended';

import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mocks';
import { ApiService } from '@wa/app/core/services/api/api.service';
import { OpenWeatherParserService } from '@wa/app/core/services/open-weather-parser/open-weather-parser.service';
import { OpenWeatherService } from '@wa/app/core/services/open-weather/open-weather.service';
import { getOpenWeatherMocks, OpenWeatherMocks } from '@wa/app/core/services/open-weather/open-weather.service.spec.mocks';
import { RawWeather } from '@wa/app/models/open-weather.model';

describe('OpenWeatherService', () => {
	let spectator: SpectatorService<OpenWeatherService>;

	let apiMock: MockProxy<ApiService>;
	let openWeatherParserMock: MockProxy<OpenWeatherParserService>;

	const createService = createServiceFactory(OpenWeatherService);

	let mocks: OpenWeatherMocks;

	beforeEach(() => {
		const {
			apiServiceMock,
			openWeatherParserServiceMock,

			apiServiceProvider,
			configServiceProvider,
			openWeatherParserServiceProvider,
			settingsServiceProvider,
		} = new MasterMock().mockHttpClient().mockSettings().mockConfig();

		apiMock = apiServiceMock;
		openWeatherParserMock = openWeatherParserServiceMock;

		spectator = createService({
			providers: [apiServiceProvider, configServiceProvider, openWeatherParserServiceProvider, settingsServiceProvider],
		});

		mocks = getOpenWeatherMocks();
	});

	afterEach(() => {
		mockReset(apiMock);
		mockReset(openWeatherParserMock);
	});

	it('should be created', () => {
		expect(spectator.service).toBeDefined();
	});

	describe('getWeatherGroup', () => {
		it('should call ApiService.get with expected arguments', async () => {
			const searchParams = mocks.searchParams;
			const partialParams = [{ key: 'id', value: searchParams.group.join(',') }];

			apiMock.get.mockResolvedValue(mocks.group);

			await spectator.service.getWeatherGroup(searchParams);

			expect(apiMock.get).toHaveBeenCalledWith(expect.toEndWith('group'), {
				params: expect.arrayContaining(partialParams),
			});
		});

		it('should call OpenWeatherParserService.translateLocationNames with retreived group', async () => {
			const { group, searchParams } = mocks;

			apiMock.get.mockResolvedValue(group);

			await spectator.service.getWeatherGroup(searchParams);

			expect(openWeatherParserMock.translateLocationNames).toHaveBeenCalledWith(group);
		});

		it('should call OpenWeatherParserService.parseWeatherData for each element of the group', async () => {
			const { group, searchParams } = mocks;

			apiMock.get.mockResolvedValue(group);

			await spectator.service.getWeatherGroup(searchParams);

			group.list.forEach((weather: RawWeather, index: number) =>
				expect(openWeatherParserMock.parseWeatherData).toHaveBeenNthCalledWith(index + 1, weather),
			);
		});
	});

	describe('getForecastById', () => {
		it('should call ApiService.get with expected arguments', async () => {
			const { forecast, searchParams } = mocks;
			const partialParams = [{ key: 'id', value: searchParams.id }];

			apiMock.get.mockResolvedValue(forecast);

			await spectator.service.getForecastById(searchParams);

			expect(apiMock.get).toHaveBeenCalledWith(expect.toEndWith('forecast'), {
				params: expect.arrayContaining(partialParams),
			});
		});

		it('should call OpenWeatherParserService.parseWeatherData for each element of the forecast list', async () => {
			const { forecast, searchParams } = mocks;

			apiMock.get.mockResolvedValue(forecast);

			await spectator.service.getForecastById(searchParams);

			forecast.list.forEach((weather: RawWeather, index: number) =>
				expect(openWeatherParserMock.parseWeatherData).toHaveBeenNthCalledWith(index + 1, weather),
			);
		});
	});

	describe('getForecastByCoord', () => {
		it('should call ApiService.get with expected arguments', async () => {
			const { forecast, searchParams } = mocks;
			const partialParams = [
				{ key: 'lat', value: searchParams.coord.lat },
				{ key: 'lon', value: searchParams.coord.lon },
			];

			apiMock.get.mockResolvedValue(forecast);

			await spectator.service.getForecastByCoord(searchParams);

			expect(apiMock.get).toHaveBeenCalledWith(expect.toEndWith('forecast'), {
				params: expect.arrayContaining(partialParams),
			});
		});

		it('should call OpenWeatherParserService.parseWeatherData for each element of the forecast list', async () => {
			const { forecast, searchParams } = mocks;

			apiMock.get.mockResolvedValue(forecast);

			await spectator.service.getForecastByCoord(searchParams);

			forecast.list.forEach((weather: RawWeather, index: number) =>
				expect(openWeatherParserMock.parseWeatherData).toHaveBeenNthCalledWith(index + 1, weather),
			);
		});
	});
});
