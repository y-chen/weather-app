/* eslint-disable @typescript-eslint/naming-convention */

import { ViewParserOptions } from '@wa/app/models/open-weather-parser.model';
import { Weather } from '@wa/app/models/open-weather.model';

export interface OpenWeatherParserServiceMocks {
	options: ViewParserOptions;
	weather: Weather;
}

export const getMocksData = () => {
	const options: ViewParserOptions = {
		iconSize: 2,
		timezone: 7200,
		titleOverride: 'Title Override',
	};

	const weather: Weather = {
		clouds: {
			all: 100,
		},
		coord: {
			lat: 51.51,
			lon: -0.13,
		},
		dt: 1609805375,
		id: 2643743,
		main: {
			feels_like: -1.49,
			humidity: 82,
			pressure: 1020,
			temp: 2.68,
			temp_max: 3,
			temp_min: 2.22,
		},
		name: 'London',
		sys: {
			country: 'GB',
			sunrise: 1609833914,
			sunset: 1609862779,
			timezone: 0,
		},
		visibility: 10000,
		weather: [
			{
				description: 'overcast clouds',
				icon: '04n',
				id: 804,
				main: 'Clouds',
			},
		],
		wind: {
			deg: 0,
			speed: 3.1,
		},
	};

	return { options, weather };
};
