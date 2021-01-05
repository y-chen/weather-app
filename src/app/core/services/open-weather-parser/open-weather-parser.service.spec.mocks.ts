/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/naming-convention */

import { SearchResult } from '@wa/app/models/here-api.model';
import { ViewParserOptions } from '@wa/app/models/open-weather-parser.model';
import { Forecast, Weather, WeatherGroup } from '@wa/app/models/open-weather.model';

export interface OpenWeatherParserMocks {
	options: ViewParserOptions;
	weather: Weather;
	forecast: Forecast;
	location: SearchResult;
	group: WeatherGroup;
}

export const getOpenWeatherParserMocks = (): OpenWeatherParserMocks => {
	const options: ViewParserOptions = {
		iconSize: 2,
		timezone: 7200,
		titleOverride: 'Title Override',
	};

	const weather: Weather = {
		coord: {
			lon: 16.37,
			lat: 48.21,
		},
		sys: {
			country: 'AT',
			timezone: 3600,
			sunrise: 1609829081,
			sunset: 1609859689,
		},
		weather: [
			{
				id: 803,
				main: 'Clouds',
				description: 'broken clouds',
				icon: '04d',
			},
		],
		main: {
			temp: 4.12,
			feels_like: 0.63,
			temp_min: 3.33,
			temp_max: 5,
			pressure: 1010,
			humidity: 86,
		},
		visibility: 9000,
		wind: {
			speed: 2.6,
			deg: 340,
		},
		clouds: {
			all: 75,
		},
		dt: 1609844944,
		id: 2775259,
		name: 'Inner city',
	};

	const group: WeatherGroup = {
		cnt: 6,
		list: [
			{
				coord: {
					lon: -0.13,
					lat: 51.51,
				},
				sys: {
					country: 'GB',
					timezone: 0,
					sunrise: 1609833914,
					sunset: 1609862779,
				},
				weather: [
					{
						id: 802,
						main: 'Clouds',
						description: 'scattered clouds',
						icon: '03d',
					},
				],
				main: {
					temp: 3.78,
					feels_like: -0.63,
					temp_min: 3.33,
					temp_max: 4.44,
					pressure: 1020,
					humidity: 80,
				},
				visibility: 10000,
				wind: {
					speed: 3.6,
					deg: 0,
				},
				clouds: {
					all: 40,
				},
				dt: 1609848573,
				id: 2643743,
				name: 'London',
			},
			{
				coord: {
					lon: 13.41,
					lat: 52.52,
				},
				sys: {
					country: 'DE',
					timezone: 3600,
					sunrise: 1609830965,
					sunset: 1609859226,
				},
				weather: [
					{
						id: 803,
						main: 'Clouds',
						description: 'broken clouds',
						icon: '04d',
					},
				],
				main: {
					temp: 1.9,
					feels_like: -3.36,
					temp_min: 1,
					temp_max: 2.78,
					pressure: 1016,
					humidity: 100,
				},
				visibility: 6000,
				wind: {
					speed: 5.1,
					deg: 30,
				},
				clouds: {
					all: 75,
				},
				dt: 1609848561,
				id: 2950159,
				name: 'Berlin',
			},
			{
				coord: {
					lon: 12.48,
					lat: 41.89,
				},
				sys: {
					country: 'IT',
					timezone: 3600,
					sunrise: 1609828667,
					sunset: 1609861971,
				},
				weather: [
					{
						id: 804,
						main: 'Clouds',
						description: 'overcast clouds',
						icon: '04d',
					},
				],
				main: {
					temp: 9.26,
					feels_like: 7.79,
					temp_min: 8,
					temp_max: 10,
					pressure: 1008,
					humidity: 93,
				},
				visibility: 8000,
				wind: {
					speed: 1.5,
					deg: 0,
				},
				clouds: {
					all: 90,
				},
				dt: 1609848579,
				id: 3169070,
				name: 'Rome',
			},
			{
				coord: {
					lon: 16.37,
					lat: 48.21,
				},
				sys: {
					country: 'AT',
					timezone: 3600,
					sunrise: 1609829081,
					sunset: 1609859689,
				},
				weather: [
					{
						id: 803,
						main: 'Clouds',
						description: 'broken clouds',
						icon: '04d',
					},
				],
				main: {
					temp: 4.18,
					feels_like: 0.35,
					temp_min: 3.89,
					temp_max: 5,
					pressure: 1010,
					humidity: 86,
				},
				visibility: 9000,
				wind: {
					speed: 3.1,
					deg: 340,
				},
				clouds: {
					all: 75,
				},
				dt: 1609848545,
				id: 2761369,
				name: 'Vienna',
			},
			{
				coord: {
					lon: 2.35,
					lat: 48.85,
				},
				sys: {
					country: 'FR',
					timezone: 3600,
					sunrise: 1609832603,
					sunset: 1609862898,
				},
				weather: [
					{
						id: 804,
						main: 'Clouds',
						description: 'overcast clouds',
						icon: '04d',
					},
				],
				main: {
					temp: 2.73,
					feels_like: -2.15,
					temp_min: 2,
					temp_max: 3.33,
					pressure: 1014,
					humidity: 81,
				},
				visibility: 7000,
				wind: {
					speed: 4.1,
					deg: 40,
				},
				clouds: {
					all: 90,
				},
				dt: 1609848570,
				id: 2988507,
				name: 'Paris',
			},
			{
				coord: {
					lon: -3.7,
					lat: 40.42,
				},
				sys: {
					country: 'ES',
					timezone: 3600,
					sunrise: 1609832281,
					sunset: 1609866125,
				},
				weather: [
					{
						id: 800,
						main: 'Clear',
						description: 'clear sky',
						icon: '01d',
					},
				],
				main: {
					temp: 4.05,
					feels_like: 0.86,
					temp_min: 2.78,
					temp_max: 5.56,
					pressure: 1012,
					humidity: 56,
				},
				visibility: 10000,
				wind: {
					speed: 1,
					deg: 0,
				},
				clouds: {
					all: 0,
				},
				dt: 1609848522,
				id: 3117735,
				name: 'Madrid',
			},
		],
	};

	const forecast: Forecast = {
		cod: '200',
		message: 0,
		cnt: 40,
		list: [
			{
				dt: 1609848000,
				main: {
					temp: 4.66,
					feels_like: 1.32,
					temp_min: 4.66,
					temp_max: 5.21,
					pressure: 1010,
					sea_level: 1010,
					grnd_level: 987,
					humidity: 81,
					temp_kf: -0.55,
				},
				weather: [
					{
						id: 803,
						main: 'Clouds',
						description: 'broken clouds',
						icon: '04d',
					},
				],
				clouds: {
					all: 75,
				},
				wind: {
					speed: 2.31,
					deg: 307,
				},
				visibility: 10000,
				pop: 0,
				sys: {
					pod: 'd',
				},
				dt_txt: '2021-01-05 12:00:00',
			},
			{
				dt: 1609858800,
				main: {
					temp: 4.57,
					feels_like: 1.37,
					temp_min: 4.57,
					temp_max: 4.69,
					pressure: 1011,
					sea_level: 1011,
					grnd_level: 988,
					humidity: 81,
					temp_kf: -0.12,
				},
				weather: [
					{
						id: 804,
						main: 'Clouds',
						description: 'overcast clouds',
						icon: '04d',
					},
				],
				clouds: {
					all: 95,
				},
				wind: {
					speed: 2.08,
					deg: 294,
				},
				visibility: 10000,
				pop: 0,
				sys: {
					pod: 'd',
				},
				dt_txt: '2021-01-05 15:00:00',
			},
			{
				dt: 1609869600,
				main: {
					temp: 4.33,
					feels_like: 1.59,
					temp_min: 4.33,
					temp_max: 4.34,
					pressure: 1012,
					sea_level: 1012,
					grnd_level: 989,
					humidity: 81,
					temp_kf: -0.01,
				},
				weather: [
					{
						id: 804,
						main: 'Clouds',
						description: 'overcast clouds',
						icon: '04n',
					},
				],
				clouds: {
					all: 98,
				},
				wind: {
					speed: 1.38,
					deg: 253,
				},
				visibility: 10000,
				pop: 0,
				sys: {
					pod: 'n',
				},
				dt_txt: '2021-01-05 18:00:00',
			},
			{
				dt: 1609880400,
				main: {
					temp: 4,
					feels_like: 1.92,
					temp_min: 4,
					temp_max: 4,
					pressure: 1012,
					sea_level: 1012,
					grnd_level: 989,
					humidity: 83,
					temp_kf: 0,
				},
				weather: [
					{
						id: 804,
						main: 'Clouds',
						description: 'overcast clouds',
						icon: '04n',
					},
				],
				clouds: {
					all: 99,
				},
				wind: {
					speed: 0.43,
					deg: 288,
				},
				visibility: 10000,
				pop: 0,
				sys: {
					pod: 'n',
				},
				dt_txt: '2021-01-05 21:00:00',
			},
			{
				dt: 1609891200,
				main: {
					temp: 3.8,
					feels_like: 1.56,
					temp_min: 3.8,
					temp_max: 3.8,
					pressure: 1012,
					sea_level: 1012,
					grnd_level: 988,
					humidity: 87,
					temp_kf: 0,
				},
				weather: [
					{
						id: 804,
						main: 'Clouds',
						description: 'overcast clouds',
						icon: '04n',
					},
				],
				clouds: {
					all: 96,
				},
				wind: {
					speed: 0.77,
					deg: 114,
				},
				visibility: 10000,
				pop: 0.03,
				sys: {
					pod: 'n',
				},
				dt_txt: '2021-01-06 00:00:00',
			},
			{
				dt: 1609902000,
				main: {
					temp: 3.05,
					feels_like: 0.17,
					temp_min: 3.05,
					temp_max: 3.05,
					pressure: 1010,
					sea_level: 1010,
					grnd_level: 987,
					humidity: 92,
					temp_kf: 0,
				},
				weather: [
					{
						id: 500,
						main: 'Rain',
						description: 'light rain',
						icon: '10n',
					},
				],
				clouds: {
					all: 100,
				},
				wind: {
					speed: 1.69,
					deg: 113,
				},
				visibility: 10000,
				pop: 0.37,
				rain: {
					'3h': 0.22,
				},
				sys: {
					pod: 'n',
				},
				dt_txt: '2021-01-06 03:00:00',
			},
			{
				dt: 1609912800,
				main: {
					temp: 2.83,
					feels_like: -1.06,
					temp_min: 2.83,
					temp_max: 2.83,
					pressure: 1010,
					sea_level: 1010,
					grnd_level: 986,
					humidity: 88,
					temp_kf: 0,
				},
				weather: [
					{
						id: 500,
						main: 'Rain',
						description: 'light rain',
						icon: '10n',
					},
				],
				clouds: {
					all: 100,
				},
				wind: {
					speed: 2.94,
					deg: 109,
				},
				visibility: 10000,
				pop: 0.38,
				rain: {
					'3h': 0.33,
				},
				sys: {
					pod: 'n',
				},
				dt_txt: '2021-01-06 06:00:00',
			},
			{
				dt: 1609923600,
				main: {
					temp: 3.37,
					feels_like: -0.13,
					temp_min: 3.37,
					temp_max: 3.37,
					pressure: 1010,
					sea_level: 1010,
					grnd_level: 986,
					humidity: 87,
					temp_kf: 0,
				},
				weather: [
					{
						id: 804,
						main: 'Clouds',
						description: 'overcast clouds',
						icon: '04d',
					},
				],
				clouds: {
					all: 100,
				},
				wind: {
					speed: 2.48,
					deg: 129,
				},
				visibility: 10000,
				pop: 0.14,
				sys: {
					pod: 'd',
				},
				dt_txt: '2021-01-06 09:00:00',
			},
			{
				dt: 1609934400,
				main: {
					temp: 4.34,
					feels_like: 1.67,
					temp_min: 4.34,
					temp_max: 4.34,
					pressure: 1009,
					sea_level: 1009,
					grnd_level: 986,
					humidity: 78,
					temp_kf: 0,
				},
				weather: [
					{
						id: 804,
						main: 'Clouds',
						description: 'overcast clouds',
						icon: '04d',
					},
				],
				clouds: {
					all: 99,
				},
				wind: {
					speed: 1.16,
					deg: 243,
				},
				visibility: 10000,
				pop: 0.11,
				sys: {
					pod: 'd',
				},
				dt_txt: '2021-01-06 12:00:00',
			},
			{
				dt: 1609945200,
				main: {
					temp: 3.4,
					feels_like: -1.02,
					temp_min: 3.4,
					temp_max: 3.4,
					pressure: 1009,
					sea_level: 1009,
					grnd_level: 986,
					humidity: 76,
					temp_kf: 0,
				},
				weather: [
					{
						id: 804,
						main: 'Clouds',
						description: 'overcast clouds',
						icon: '04d',
					},
				],
				clouds: {
					all: 95,
				},
				wind: {
					speed: 3.39,
					deg: 272,
				},
				visibility: 10000,
				pop: 0,
				sys: {
					pod: 'd',
				},
				dt_txt: '2021-01-06 15:00:00',
			},
			{
				dt: 1609956000,
				main: {
					temp: 2.65,
					feels_like: -2.15,
					temp_min: 2.65,
					temp_max: 2.65,
					pressure: 1010,
					sea_level: 1010,
					grnd_level: 986,
					humidity: 80,
					temp_kf: 0,
				},
				weather: [
					{
						id: 804,
						main: 'Clouds',
						description: 'overcast clouds',
						icon: '04n',
					},
				],
				clouds: {
					all: 95,
				},
				wind: {
					speed: 3.93,
					deg: 275,
				},
				visibility: 10000,
				pop: 0.06,
				sys: {
					pod: 'n',
				},
				dt_txt: '2021-01-06 18:00:00',
			},
			{
				dt: 1609966800,
				main: {
					temp: 1.84,
					feels_like: -3.6,
					temp_min: 1.84,
					temp_max: 1.84,
					pressure: 1011,
					sea_level: 1011,
					grnd_level: 988,
					humidity: 91,
					temp_kf: 0,
				},
				weather: [
					{
						id: 600,
						main: 'Snow',
						description: 'light snow',
						icon: '13n',
					},
				],
				clouds: {
					all: 100,
				},
				wind: {
					speed: 5.05,
					deg: 261,
				},
				visibility: 3493,
				pop: 0.38,
				snow: {
					'3h': 0.32,
				},
				sys: {
					pod: 'n',
				},
				dt_txt: '2021-01-06 21:00:00',
			},
			{
				dt: 1610150400,
				main: {
					temp: -0.71,
					feels_like: -4.6,
					temp_min: -0.71,
					temp_max: -0.71,
					pressure: 1021,
					sea_level: 1021,
					grnd_level: 997,
					humidity: 93,
					temp_kf: 0,
				},
				weather: [
					{
						id: 800,
						main: 'Clear',
						description: 'clear sky',
						icon: '01n',
					},
				],
				clouds: {
					all: 5,
				},
				wind: {
					speed: 2.39,
					deg: 277,
				},
				visibility: 10000,
				pop: 0,
				sys: {
					pod: 'n',
				},
				dt_txt: '2021-01-09 00:00:00',
			},
			{
				dt: 1610161200,
				main: {
					temp: -1.17,
					feels_like: -4.49,
					temp_min: -1.17,
					temp_max: -1.17,
					pressure: 1021,
					sea_level: 1021,
					grnd_level: 997,
					humidity: 93,
					temp_kf: 0,
				},
				weather: [
					{
						id: 800,
						main: 'Clear',
						description: 'clear sky',
						icon: '01n',
					},
				],
				clouds: {
					all: 1,
				},
				wind: {
					speed: 1.48,
					deg: 282,
				},
				visibility: 10000,
				pop: 0,
				sys: {
					pod: 'n',
				},
				dt_txt: '2021-01-09 03:00:00',
			},
			{
				dt: 1610172000,
				main: {
					temp: -1.43,
					feels_like: -4.14,
					temp_min: -1.43,
					temp_max: -1.43,
					pressure: 1022,
					sea_level: 1022,
					grnd_level: 998,
					humidity: 93,
					temp_kf: 0,
				},
				weather: [
					{
						id: 800,
						main: 'Clear',
						description: 'clear sky',
						icon: '01n',
					},
				],
				clouds: {
					all: 4,
				},
				wind: {
					speed: 0.57,
					deg: 254,
				},
				visibility: 10000,
				pop: 0,
				sys: {
					pod: 'n',
				},
				dt_txt: '2021-01-09 06:00:00',
			},
			{
				dt: 1610182800,
				main: {
					temp: 0.05,
					feels_like: -2.73,
					temp_min: 0.05,
					temp_max: 0.05,
					pressure: 1022,
					sea_level: 1022,
					grnd_level: 998,
					humidity: 91,
					temp_kf: 0,
				},
				weather: [
					{
						id: 803,
						main: 'Clouds',
						description: 'broken clouds',
						icon: '04d',
					},
				],
				clouds: {
					all: 73,
				},
				wind: {
					speed: 0.89,
					deg: 115,
				},
				visibility: 10000,
				pop: 0,
				sys: {
					pod: 'd',
				},
				dt_txt: '2021-01-09 09:00:00',
			},
		],
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

	const location: SearchResult = {
		title: 'Spiegelgasse 3, 1010 Vienna, Austria',
		id: 'here:af:streetsection:9KHK78chjH2teW48hg58mA:CgcIBCCvkqlNEAEaATM',
		resultType: 'houseNumber',
		houseNumberType: 'PA',
		address: {
			label: 'Spiegelgasse 3, 1010 Vienna, Austria',
			countryCode: 'AUT',
			countryName: 'Austria',
			state: 'Vienna',
			countyCode: 'W',
			county: 'Vienna',
			city: 'Vienna',
			district: '1. Bezirk-Innere Stadt',
			street: 'Spiegelgasse',
			postalCode: '1010',
			houseNumber: '3',
		},
		position: {
			lat: 48.20778,
			lng: 16.37055,
		},
		access: [
			{
				lat: 48.2078,
				lng: 16.37041,
			},
		],
		distance: 10,
		mapView: {
			west: 16.3688,
			south: 48.20574,
			east: 16.37059,
			north: 48.20819,
		},
	};

	return { options, weather, forecast, location, group };
};
