/* eslint-disable @typescript-eslint/naming-convention */

import { Forecast, OpenWeatherSearchParams, WeatherGroup } from '@wa/app/models/open-weather.model';

export interface OpenWeatherMocks {
	searchParams: OpenWeatherSearchParams;
	group: WeatherGroup;
	forecast: Forecast;
}

export const getOpenWeatherMocks = (): OpenWeatherMocks => {
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

	const forecast: Forecast = {
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

	return { searchParams, group, forecast };
};
