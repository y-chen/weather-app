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
	coord: Coord;
	country: string;
	popuplation: number;
	timezone: number;
	sunrise: number;
	sunset: number;
}

export interface OpenWeatherSearchParams {
	q?: string;
	group?: number[];
	id?: number;
	coord?: Coord;
	iconSize?: IconSize;
}

export interface WeatherGroup {
	cnt: number;
	list: Weather[];
}

export interface Weather {
	id: number;
	name: string;
	coord: Coord;
	weather: WeatherDetails[];
	base: string;
	main: Temperature;
	visibility: number;
	wind: Wind;
	clouds: Clouds;
	dt: number;
	sys: DayInfo;
	cod: number;
	pop?: number;
	dt_txt?: string;
}
export interface Coord {
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

export interface DayInfo {
	id?: number;
	type?: number;
	country?: string;
	sunrise?: number;
	sunset?: number;
	timezone?: number;
	sys?: string;
}

export type IconSize = 2 | 4;
export type DayTime = 'night' | 'morning' | 'afternoon' | 'evening';
export type Units = 'standard' | 'metric' | 'imperial';
