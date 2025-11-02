/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { MockProxy, mockReset } from 'jest-mock-extended';

import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MockMaster } from '@wa/app/common/mock-master';
import { getTestData, TestData } from '@wa/app/common/test-data';

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
                it('should call ApiService.get with expected arguments for each location', async () => {
                        const { openWeatherSearchParams, oneCallResponse, weather } = testData;

                        apiMock.get.mockResolvedValue(oneCallResponse);
                        openWeatherParserMock.parseCurrentWeatherFromOneCall.mockResolvedValue(weather);

                        const result = await spectator.service.getWeatherGroup(openWeatherSearchParams);

                        expect(apiMock.get).toHaveBeenCalledTimes(openWeatherSearchParams.group.length);
                        expect(apiMock.get).toHaveBeenCalledWith(expect.toEndWith('onecall'), {
                                params: expect.arrayContaining([
                                        { key: 'lat', value: expect.any(Number) },
                                        { key: 'lon', value: expect.any(Number) },
                                        { key: 'exclude', value: 'minutely,hourly,daily,alerts' },
                                ]),
                        });
                        expect(openWeatherParserMock.parseCurrentWeatherFromOneCall).toHaveBeenCalledTimes(
                                openWeatherSearchParams.group.length,
                        );
                        expect(openWeatherParserMock.parseCurrentWeatherFromOneCall).toHaveBeenCalledWith(oneCallResponse, {
                                iconSize: openWeatherSearchParams.iconSize,
                                locationKey: openWeatherSearchParams.group[0],
                        });
                        expect(result).toEqual([weather, weather]);
                });
        });

        describe('getForecastById', () => {
                it('should delegate to getForecastByCoord with parsed coordinates', async () => {
                        const { openWeatherSearchParams, forecast } = testData;
                        const coord = openWeatherSearchParams.coord;
                        const spy = jest
                                .spyOn(spectator.service, 'getForecastByCoord')
                                .mockResolvedValue(forecast);

                        await spectator.service.getForecastById(openWeatherSearchParams);

                        expect(spy).toHaveBeenCalledWith({ ...openWeatherSearchParams, coord });
                });
        });

        describe('getForecastByCoord', () => {
                it('should call ApiService.get with expected arguments', async () => {
                        const { openWeatherSearchParams, oneCallResponse } = testData;

                        apiMock.get.mockResolvedValue(oneCallResponse);
                        openWeatherParserMock.parseOneCallForecast.mockResolvedValue(testData.forecast);

                        await spectator.service.getForecastByCoord(openWeatherSearchParams);

                        expect(apiMock.get).toHaveBeenCalledWith(expect.toEndWith('onecall'), {
                                params: expect.arrayContaining([
                                        { key: 'lat', value: openWeatherSearchParams.coord.lat },
                                        { key: 'lon', value: openWeatherSearchParams.coord.lon },
                                        { key: 'exclude', value: 'minutely,daily,alerts' },
                                ]),
                        });
                });

                it('should call OpenWeatherParserService.parseOneCallForecast with expected arguments', async () => {
                        const { openWeatherSearchParams, oneCallResponse } = testData;

                        apiMock.get.mockResolvedValue(oneCallResponse);
                        openWeatherParserMock.parseOneCallForecast.mockResolvedValue(testData.forecast);

                        await spectator.service.getForecastByCoord(openWeatherSearchParams);

                        expect(openWeatherParserMock.parseOneCallForecast).toHaveBeenCalledWith(
                                oneCallResponse,
                                openWeatherSearchParams.iconSize,
                        );
                });
        });

        describe('normalizeLocationKeys', () => {
                it('should convert legacy city identifiers to coordinate keys', () => {
                        const normalized = spectator.service.normalizeLocationKeys([2643743]);

                        expect(normalized).toEqual(['51.5074,-0.1278']);
                });
        });
});
