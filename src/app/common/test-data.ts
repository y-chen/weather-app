/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/naming-convention */

import { Observable, of } from 'rxjs';

import { HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot } from '@angular/router';
import { GeolocationCoordinates } from '@wa/app/models/geolocation.model';

import { Config } from '../models/config.model';
import { Culture } from '../models/culture.model';
import { ExtendedError, HereError, OpenWeatherMapError } from '../models/error.model';
import { HereLocation, HereSearchParams } from '../models/here.model';
import { DayTimeWeather, Forecast, ParserOptions, Weather } from '../models/open-weather-parser.model';
import {
	DayTime, IconSize, OpenCoord, OpenWeatherSearchParams, RawForecast, RawWeather, WeatherGroup
} from '../models/open-weather.model';

export interface TestData {
	config: Config;
	en: Culture;
	it: Culture;
	cultures: Culture[];
	coord: OpenCoord;
	iconSize: IconSize;
	id: number;
	defaultCities: number[];
	storedFavouriteCities: string;
	route: ActivatedRouteSnapshot;
	body: any;
	observable: Observable<string>;
	url: string;
	extendedError: ExtendedError;
	initHttpErrorResponse: any;
	hereError: HereError;
	openWeatherMapError: OpenWeatherMapError;
	hereSearchParams: HereSearchParams;
	hereLocation: HereLocation;
	openWeatherSearchParams: OpenWeatherSearchParams;
	group: WeatherGroup;
	parserOptions: ParserOptions;
	rawWeather: RawWeather;
	rawForecast: RawForecast;
	forecast: Forecast;
	weathers: Weather[];
	weather: Weather;
	dayTimeName: DayTime;
	dayTimeWeather: DayTimeWeather;
	coordinates: GeolocationCoordinates;
}

export const getTestData = (): TestData => {
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
		slackHookUrl: 'SLACK-HOOK-URL',
	};

	const en: Culture = {
		label: 'English',
		language: 'en',
		code: 'en-GB',
	};

	const it: Culture = {
		label: 'Italiano',
		language: 'it',
		code: 'it-IT',
	};

	const cultures: Culture[] = [en, it];
	const coord: OpenCoord = { lat: 1, lon: 1 };
	const iconSize: IconSize = 2;
	const id = 1;
	const route = new ActivatedRouteSnapshot();
	const defaultCities: number[] = [1, 2];
	const storedFavouriteCities = '[3,4]';
	const body = { key: 'value' };
	const observable: Observable<string> = of('foo.bar');
	const url = 'http://example.com';

	let headers: HttpHeaders = new HttpHeaders();
	headers = headers.set('Key', 'Value');

	const hereError: HereError = {
		error: 'Here Error',
		error_description: 'Here Description',
	};

	const openWeatherMapError: OpenWeatherMapError = {
		cod: 500,
		message: 'OpenWeatherMap Message',
	};

	const initHttpErrorResponse = { headers, status: 401, statusText: 'Unauthorized', url: 'http://example.com' };

	const extendedError: ExtendedError = {
		name: 'ExtendedError',
		message: 'Error Message',
		stack: 'Client Stack',
	};

	const hereSearchParams: HereSearchParams = {
		id: 'LocationId',
		coord: { lat: 0, lon: 0 },
		query: 'Search Query',
	};

	const hereLocation: HereLocation = {
		title: 'Title',
		id: 'Id',
		resultType: 'Resource Type',
		address: {
			label: 'Label',
			countryCode: 'Country Code',
			countryName: 'Country Name',
			state: 'State',
			county: 'County',
			city: 'City',
			postalCode: '0',
		},
	};

	const openWeatherSearchParams: OpenWeatherSearchParams = {
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

	const parserOptions: ParserOptions = {
		iconSize: 2,
		timezone: 7200,
		titleOverride: 'Title Override',
	};

	const rawWeather: RawWeather = {
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

	const rawForecast: RawForecast = {
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

	const forecast: Forecast = {
		id: 0,
		name: 'Name',
		coord: { lat: 0, lon: 0 },
		days: [
			{
				day: 'Day 1',
				night: {
					0: {
						id: 1,
						title: 'First Title',
						description: 'First Description',
						temperature: 'First Temperature',
						icon: 'First Icon',
						time: 'First Time',
					},
					1: {
						id: 2,
						title: 'Second Title',
						description: 'Second Description',
						temperature: 'Second Temperature',
						icon: 'Second Icon',
						time: 'Second Time',
					},
				},
			},
			{
				day: 'Day 2',
				night: {
					0: {
						id: 1,
						title: 'First Title',
						description: 'First Description',
						temperature: 'First Temperature',
						icon: 'First Icon',
						time: 'First Time',
					},
					1: {
						id: 2,
						title: 'Second Title',
						description: 'Second Description',
						temperature: 'Second Temperature',
						icon: 'Second Icon',
						time: 'Second Time',
					},
				},
			},
		],
	};

	const weathers: Weather[] = [
		{
			id: 1,
			title: 'First Title',
			description: 'First Description',
			temperature: 'First Temperature',
			icon: 'First Icon',
			time: 'First Time',
		},
		{
			id: 2,
			title: 'Second Title',
			description: 'Second Description',
			temperature: 'Second Temperature',
			icon: 'Second Icon',
			time: 'Second Time',
		},
	];

	const weather: Weather = {
		id: 0,
		title: 'title',
		temperature: 'temperature',
		description: 'description',
		icon: 'icon',
		time: 'time',
	};

	const dayTimeName: DayTime = 'night';

	const dayTimeWeather: DayTimeWeather = [
		{
			id: 1,
			title: 'First Title',
			description: 'First Description',
			temperature: 'First Temperature',
			icon: 'First Icon',
			time: 'First Time',
		},
		{
			id: 2,
			title: 'Second Title',
			description: 'Second Description',
			temperature: 'Second Temperature',
			icon: 'Second Icon',
			time: 'Second Time',
		},
	];

	const coordinates = {
		accuracy: 30,
		altitude: null,
		altitudeAccuracy: null,
		heading: null,
		latitude: 0,
		longitude: 0,
		speed: null,
	};

	return {
		config,
		en,
		it,
		cultures,
		coord,
		iconSize,
		id,
		route,
		defaultCities,
		storedFavouriteCities,
		body,
		url,
		observable,
		extendedError,
		initHttpErrorResponse,
		hereError,
		openWeatherMapError,
		hereSearchParams,
		hereLocation,
		openWeatherSearchParams,
		group,
		parserOptions,
		rawForecast,
		rawWeather,
		forecast,
		weathers,
		weather,
		dayTimeName,
		dayTimeWeather,
		coordinates,
	};
};
