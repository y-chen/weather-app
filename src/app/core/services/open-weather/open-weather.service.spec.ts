/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { mock, MockProxy, mockReset } from 'jest-mock-extended';

import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { ApiService } from '@wa/app/core/services/api/api.service';
import { OpenWeatherParserService } from '@wa/app/core/services/open-weather-parser/open-weather-parser.service';
import { OpenWeatherService } from '@wa/app/core/services/open-weather/open-weather.service';
import { getOpenWeatherMocks, OpenWeatherMocks } from '@wa/app/core/services/open-weather/open-weather.service.spec.mocks';
import { Weather } from '@wa/app/models/open-weather.model';

describe('OpenWeatherService', () => {
	let spectator: SpectatorService<OpenWeatherService>;
	let apiServiceMock: MockProxy<ApiService>;
	let openWeatherParserServiceMock: MockProxy<OpenWeatherParserService>;

	const createService = createServiceFactory({
		service: OpenWeatherService,
		mocks: [ApiService, OpenWeatherParserService],
	});

	let mocks: OpenWeatherMocks;

	beforeEach(() => {
		apiServiceMock = mock<ApiService>();
		openWeatherParserServiceMock = mock<OpenWeatherParserService>();

		spectator = createService({
			providers: [
				{ provide: ApiService, useValue: apiServiceMock },
				{ provide: OpenWeatherParserService, useValue: openWeatherParserServiceMock },
			],
		});

		mocks = getOpenWeatherMocks();
	});

	afterEach(() => {
		mockReset(apiServiceMock);
		mockReset(openWeatherParserServiceMock);
	});

	it('should be created', () => {
		expect(spectator.service).toBeTruthy();
	});

	describe('getWeatherGroup', () => {
		it('should call ApiService.get with expected arguments', async () => {
			const searchParams = mocks.searchParams;
			const partialParams = [{ key: 'id', value: searchParams.group.join(',') }];

			apiServiceMock.get.mockResolvedValue(mocks.group);

			await spectator.service.getWeatherGroup(searchParams);

			expect(apiServiceMock.get).toHaveBeenCalledWith(expect.stringContaining('group'), {
				params: expect.arrayContaining(partialParams),
			});
		});

		it('should call OpenWeatherParserService.translateLocationNames with retreived group', async () => {
			const { group, searchParams } = mocks;

			apiServiceMock.get.mockResolvedValue(group);

			await spectator.service.getWeatherGroup(searchParams);

			expect(openWeatherParserServiceMock.translateLocationNames).toHaveBeenCalledWith(group);
		});

		it('should call OpenWeatherParserService.parseWeatherData for each element of the group', async () => {
			const { group, searchParams } = mocks;

			apiServiceMock.get.mockResolvedValue(group);

			await spectator.service.getWeatherGroup(searchParams);

			group.list.forEach((weather: Weather, index: number) =>
				expect(openWeatherParserServiceMock.parseWeatherData).toHaveBeenNthCalledWith(index + 1, weather),
			);
		});
	});

	describe('getForecastById', () => {
		it('should call ApiService.get with expected arguments', async () => {
			const { forecast, searchParams } = mocks;
			const partialParams = [{ key: 'id', value: searchParams.id }];

			apiServiceMock.get.mockResolvedValue(forecast);

			await spectator.service.getForecastById(searchParams);

			expect(apiServiceMock.get).toHaveBeenCalledWith(expect.stringContaining('forecast'), {
				params: expect.arrayContaining(partialParams),
			});
		});

		it('should call OpenWeatherParserService.parseWeatherData for each element of the forecast list', async () => {
			const { forecast, searchParams } = mocks;

			apiServiceMock.get.mockResolvedValue(forecast);

			await spectator.service.getForecastById(searchParams);

			forecast.list.forEach((weather: Weather, index: number) =>
				expect(openWeatherParserServiceMock.parseWeatherData).toHaveBeenNthCalledWith(index + 1, weather),
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

			apiServiceMock.get.mockResolvedValue(forecast);

			await spectator.service.getForecastByCoord(searchParams);

			expect(apiServiceMock.get).toHaveBeenCalledWith(expect.stringContaining('forecast'), {
				params: expect.arrayContaining(partialParams),
			});
		});

		it('should call OpenWeatherParserService.parseWeatherData for each element of the forecast list', async () => {
			const { forecast, searchParams } = mocks;

			apiServiceMock.get.mockResolvedValue(forecast);

			await spectator.service.getForecastByCoord(searchParams);

			forecast.list.forEach((weather: Weather, index: number) =>
				expect(openWeatherParserServiceMock.parseWeatherData).toHaveBeenNthCalledWith(index + 1, weather),
			);
		});
	});
});
