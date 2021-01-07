import { IconSize, OpenCoord } from '@wa/app/models/open-weather.model';

export interface ParserOptions {
	iconSize?: IconSize;
	timezone?: number;
	titleOverride?: string;
}

export interface Forecast {
	id: number;
	name: string;
	coord: OpenCoord;
	days: DayForecast[];
}

export interface DayForecast {
	day: string;
	night?: DayTimeWeather;
	morning?: DayTimeWeather;
	afternoon?: DayTimeWeather;
	evening?: DayTimeWeather;
}

export interface DayTimeWeather {
	0?: Weather;
	1?: Weather;
}

export interface Weather {
	id: number;
	title: string;
	description: string;
	temperature: string;
	icon: string;
	time: string;
}
