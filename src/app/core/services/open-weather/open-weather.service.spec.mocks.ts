/* eslint-disable @typescript-eslint/naming-convention */

import { Config } from '@wa/app/models/config.model';
import { OpenWeatherSearchParams, RawForecast, WeatherGroup } from '@wa/app/models/open-weather.model';

export interface OpenWeatherMocks {
	config: Config;
	searchParams: OpenWeatherSearchParams;
	group: WeatherGroup;
	forecast: RawForecast;
}

export const getOpenWeatherMocks = (): OpenWeatherMocks => {
	const config: Config = {
		here: {
			apiKey: 'HERE-API-KEY',
			urls: {
				geocode: 'GEOCODE-URL',
				revGeocode: 'REV-GEOCODE-URL',
			},
		},
		openWeatherMap: {
			apiKey: 'OPEN-WEATHER-MAP-API-KEY',
			url: 'OPEN-WEATHER-MAP-URL',
		},
	};

	const searchParams: OpenWeatherSearchParams = {
		q: 'Query',
		group: [1, 1],
		id: 0,
		coord: { lat: 0, lon: 0 },
		iconSize: 2,
	};

	const group: WeatherGroup = {
		cnt: 0,
		list: [],
	};

	const forecast: RawForecast = {
		cod: '200',
		message: 0,
		cnt: 40,
		list: [],
		city: {
			id: 2775259,
			name: 'Inner city',
			coord: {
				lat: 48.2077,
				lon: 16.3705,
			},
			country: 'AT',
			population: 0,
			timezone: 3600,
			sunrise: 1609829080,
			sunset: 1609859690,
		},
	};

	return { config, searchParams, group, forecast };
};
