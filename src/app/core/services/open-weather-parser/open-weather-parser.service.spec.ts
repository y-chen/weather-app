import { anyNumber, MockProxy, mockReset } from 'jest-mock-extended';

import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MasterMock } from '@wa/app/common/master-mock';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import { HereService } from '@wa/app/core/services/here/here.service';
import { OpenWeatherParserService } from '@wa/app/core/services/open-weather-parser/open-weather-parser.service';
import {
	getOpenWeatherParserMocks, OpenWeatherParserMocks
} from '@wa/app/core/services/open-weather-parser/open-weather-parser.service.spec.mocks';
import { RawWeather } from '@wa/app/models/open-weather.model';

describe('OpenWeatherParserService', () => {
	let spectator: SpectatorService<OpenWeatherParserService>;

	let cultureMock: MockProxy<CultureService>;
	let hereMock: MockProxy<HereService>;

	const createService = createServiceFactory(OpenWeatherParserService);

	let mocks: OpenWeatherParserMocks;

	beforeEach(() => {
		const { cultureServiceMock, hereServiceMock, cultureServiceProvider, hereServiceProvider } = new MasterMock();

		cultureMock = cultureServiceMock;
		hereMock = hereServiceMock;

		spectator = createService({
			providers: [cultureServiceProvider, hereServiceProvider],
		});

		mocks = getOpenWeatherParserMocks();
	});

	afterEach(() => {
		mockReset(cultureMock);
		mockReset(hereMock);
	});

	it('should be created', () => {
		expect(spectator.service).toBeTruthy();
	});

	describe('parseWeatherData', () => {
		it('should use RawWeather data instead of ParserOptions when options are not available', () => {
			const { weather } = mocks;

			const parsed = spectator.service.parseWeatherData(weather);

			expect(parsed.title).toEqual(weather.name);
			expect(parsed.icon.endsWith(`${4}x.png`)).toBeTrue();
			expect(cultureMock.convertUnixTimeToLocaleDate).toHaveBeenCalledWith(anyNumber(), weather.sys.timezone);
		});

		it('should use ParserOptions data instead of RawWeather data when options are available', () => {
			const { options, weather } = mocks;
			const { iconSize, titleOverride, timezone } = options;

			const parsed = spectator.service.parseWeatherData(weather, options);

			expect(parsed.title).toEqual(titleOverride);
			expect(parsed.icon.endsWith(`${iconSize}x.png`)).toBeTrue();
			expect(cultureMock.convertUnixTimeToLocaleDate).toHaveBeenCalledWith(anyNumber(), timezone);
		});
	});

	describe('parseForecastData', () => {
		it('should call HereService.locationLookup with expected arguments', async () => {
			const { coord, name } = mocks.forecast.city;

			hereMock.locationLookup.mockResolvedValue(mocks.location);

			await spectator.service.parseForecastData(mocks.forecast);

			expect(hereMock.locationLookup).toHaveBeenCalledWith({ coord, query: name });
		});

		it('should group days and day times as expected', async () => {
			hereMock.locationLookup.mockResolvedValue(mocks.location);

			const forecast = await spectator.service.parseForecastData(mocks.forecast);

			expect(forecast.days).toHaveLength(3);

			expect(forecast.days[0].night).not.toBeDefined();
			expect(forecast.days[0].morning).not.toBeDefined();
			expect(forecast.days[0].afternoon).toBeDefined();
			expect(forecast.days[0].evening).toBeDefined();

			expect(forecast.days[1].night).toBeDefined();
			expect(forecast.days[1].morning).toBeDefined();
			expect(forecast.days[1].afternoon).toBeDefined();
			expect(forecast.days[1].evening).toBeDefined();

			expect(forecast.days[2].night).toBeDefined();
			expect(forecast.days[2].morning).toBeDefined();
			expect(forecast.days[2].afternoon).not.toBeDefined();
			expect(forecast.days[2].evening).not.toBeDefined();
		});

		it('should call CultureService.convertUnixTimeToLocaleDate twice for each RawWeather with correct timezone', async () => {
			hereMock.locationLookup.mockResolvedValue(mocks.location);

			await spectator.service.parseForecastData(mocks.forecast);

			let counter = 0;
			mocks.forecast.list.forEach((weather: RawWeather, index: number) => {
				expect(cultureMock.convertUnixTimeToLocaleDate).toHaveBeenNthCalledWith(
					index + counter + 1,
					weather.dt,
					mocks.forecast.city.timezone,
				);

				expect(cultureMock.convertUnixTimeToLocaleDate).toHaveBeenNthCalledWith(
					index + counter + 2,
					weather.dt,
					mocks.forecast.city.timezone,
				);

				counter++;
			});
		});
	});

	describe('translateLocationNames', () => {
		it('should call HereService.findLocationByCoords for each element of the WeatherGroup', async () => {
			hereMock.findLocationByCoords.mockResolvedValue(mocks.location);

			await spectator.service.translateLocationNames(mocks.group);

			mocks.group.list.forEach((weather: RawWeather, index: number) =>
				expect(hereMock.findLocationByCoords).toHaveBeenNthCalledWith(index + 1, weather.coord),
			);
		});
	});
});
