import { Coord, IconSize } from '@wa/app/models/open-weather.model';

export interface ViewParserOptions {
	iconSize?: IconSize;
	titleOverride?: string;
	timezone?: number;
}

export interface ViewForecast {
	id: number;
	name: string;
	coord: Coord;
	days: DayForecast[];
}

export interface DayForecastPromise {
	day: string;
	night?: Promise<DayTimeWeather>;
	morning?: Promise<DayTimeWeather>;
	afternoon?: Promise<DayTimeWeather>;
	evening?: Promise<DayTimeWeather>;
}

export interface DayForecast {
	day: string;
	night?: DayTimeWeather;
	morning?: DayTimeWeather;
	afternoon?: DayTimeWeather;
	evening?: DayTimeWeather;
}

export interface DayTimeWeather {
	0?: ViewWeather;
	1?: ViewWeather;
}

export interface ViewWeather {
	id: number;
	title: string;
	description: string;
	temperature: string;
	icon: string;
	time: string;
}
