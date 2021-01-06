/* eslint-disable @typescript-eslint/naming-convention */

export interface Forecast {
	cod: string;
	message: number;
	cnt: number;
	list: Weather[];
	city: City;
}

export interface City {
	id: number;
	name: string;
	coord: OpenCoord;
	country: string;
	population: number;
	timezone: number;
	sunrise: number;
	sunset: number;
}

export interface OpenWeatherSearchParams {
	q?: string;
	group?: number[];
	id?: number;
	coord?: OpenCoord;
	iconSize?: IconSize;
}

export interface WeatherGroup {
	cnt: number;
	list: Weather[];
}

export interface Weather {
	id?: number;
	name?: string;
	coord?: OpenCoord;
	weather: WeatherDetails[];
	base?: string;
	main: Temperature;
	visibility: number;
	wind?: Wind;
	clouds: Clouds;
	dt: number;
	sys: DayInfo;
	cod?: number;
	pop?: number;
	snow?: Snow;
	rain?: Rain;
	dt_txt?: string;
}

export interface OpenCoord {
	lat: number;
	lon: number;
}

export interface WeatherDetails {
	id: number;
	main: string;
	description: string;
	icon: string;
}

export interface Temperature {
	temp: number;
	feels_like: number;
	temp_min: number;
	temp_max: number;
	pressure: number;
	humidity: number;
	sea_level?: number;
	grnd_level?: number;
	temp_kf?: number;
}

export interface Wind {
	speed: number;
	deg: number;
}

export interface Clouds {
	all: number;
}

export interface Snow {
	[key: string]: number;
}

export interface Rain {
	[key: string]: number;
}

export interface DayInfo {
	id?: number;
	type?: number;
	country?: string;
	sunrise?: number;
	sunset?: number;
	timezone?: number;
	sys?: string;
	// pod?: string;
	pod?: string;
}

export type IconSize = 2 | 4;
export type DayTime = 'night' | 'morning' | 'afternoon' | 'evening';

// eslint-disable-next-line no-shadow
export enum Units {
	Metric = 'Metric',
	Imperial = 'Imperial',
}
