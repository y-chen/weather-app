/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { MockProxy, mockReset } from 'jest-mock-extended';

import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MockMaster } from '@wa/app/common/mock-master';
import { getTestData, TestData } from '@wa/app/common/test-data';
import { RawWeather } from '@wa/app/models/open-weather.model';

import { ApiService } from '../api/api.service';
import { OpenWeatherParserService } from '../open-weather-parser/open-weather-parser.service';
import { OpenWeatherService } from './open-weather.service';

describe('OpenWeatherService', () => {
	let spectator: SpectatorService<OpenWeatherService>;

	let apiMock: MockProxy<ApiService>;
	let openWeatherParserMock: MockProxy<OpenWeatherParserService>;

	const createService = createServiceFactory(OpenWeatherService);

	let testData: TestData;

	beforeEach(() => {
		const {
			apiServiceMock,
			openWeatherParserServiceMock,

			apiServiceProvider,
			configServiceProvider,
			openWeatherParserServiceProvider,
			settingsServiceProvider,
		} = new MockMaster().mockHttpClient().mockSettings().mockConfig();

		apiMock = apiServiceMock;
		openWeatherParserMock = openWeatherParserServiceMock;

		spectator = createService({
			providers: [apiServiceProvider, configServiceProvider, openWeatherParserServiceProvider, settingsServiceProvider],
		});

		testData = getTestData();
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
			const searchParams = testData.openWeatherSearchParams;
			const partialParams = [{ key: 'id', value: searchParams.group.join(',') }];

			apiMock.get.mockResolvedValue(testData.group);

			await spectator.service.getWeatherGroup(searchParams);

			expect(apiMock.get).toHaveBeenCalledWith(expect.toEndWith('group'), {
				params: expect.arrayContaining(partialParams),
			});
		});

		it('should call OpenWeatherParserService.translateLocationNames with retreived group', async () => {
			const { group, openWeatherSearchParams } = testData;

			apiMock.get.mockResolvedValue(group);

			await spectator.service.getWeatherGroup(openWeatherSearchParams);

			expect(openWeatherParserMock.translateLocationNames).toHaveBeenCalledWith(group);
		});

		it('should call OpenWeatherParserService.parseWeatherData for each element of the group', async () => {
			const { group, openWeatherSearchParams } = testData;

			apiMock.get.mockResolvedValue(group);

			await spectator.service.getWeatherGroup(openWeatherSearchParams);

			group.list.forEach((weather: RawWeather, index: number) =>
				expect(openWeatherParserMock.parseWeatherData).toHaveBeenNthCalledWith(index + 1, weather),
			);
		});
	});

	describe('getForecastById', () => {
		it('should call ApiService.get with expected arguments', async () => {
			const { rawForecast, openWeatherSearchParams } = testData;
			const partialParams = [{ key: 'id', value: openWeatherSearchParams.id }];

			apiMock.get.mockResolvedValue(rawForecast);

			await spectator.service.getForecastById(openWeatherSearchParams);

			expect(apiMock.get).toHaveBeenCalledWith(expect.toEndWith('forecast'), {
				params: expect.arrayContaining(partialParams),
			});
		});

		it('should call OpenWeatherParserService.parseForecastData with expected arguments', async () => {
			const { rawForecast, openWeatherSearchParams } = testData;

			apiMock.get.mockResolvedValue(rawForecast);

			await spectator.service.getForecastById(openWeatherSearchParams);

			expect(openWeatherParserMock.parseForecastData).toHaveBeenCalledWith(rawForecast, openWeatherSearchParams.iconSize);
		});
	});

	describe('getForecastByCoord', () => {
		it('should call ApiService.get with expected arguments', async () => {
			const { rawForecast, openWeatherSearchParams } = testData;
			const partialParams = [
				{ key: 'lat', value: openWeatherSearchParams.coord.lat },
				{ key: 'lon', value: openWeatherSearchParams.coord.lon },
			];

			apiMock.get.mockResolvedValue(rawForecast);

			await spectator.service.getForecastByCoord(openWeatherSearchParams);

			expect(apiMock.get).toHaveBeenCalledWith(expect.toEndWith('forecast'), {
				params: expect.arrayContaining(partialParams),
			});
		});

		it('should call OpenWeatherParserService.parseForecastData with expected arguments', async () => {
			const { rawForecast, openWeatherSearchParams } = testData;

			apiMock.get.mockResolvedValue(rawForecast);

			await spectator.service.getForecastByCoord(openWeatherSearchParams);

			expect(openWeatherParserMock.parseForecastData).toHaveBeenCalledWith(rawForecast, openWeatherSearchParams.iconSize);
		});
	});
});
