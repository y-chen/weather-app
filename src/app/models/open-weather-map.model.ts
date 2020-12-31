/* eslint-disable @typescript-eslint/naming-convention */

export interface ViewWeather {
	title: string;
	description: string;
	temperature: string;
	icon: string;
	time: string;
}

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
	cood: Coords;
	country: string;
	popuplation: number;
	timezone: 3600;
	sunrise: number;
	sunset: number;
}

export interface OpenWeatherSearchParams {
	q?: string;
	group?: number[];
	id?: number;
}

export interface WeatherGroup {
	cnt: number;
	list: Weather[];
}

export interface Weather {
	id: number;
	name: string;
	coord: Coords;
	weather: WeatherDetails[];
	base: string;
	main: Temperature;
	visibility: number;
	wind: Wind;
	clouds: Clouds;
	dt: number;
	sys: DayTime;
	timezone: number;
	cod: number;
	pop?: number;
	dt_txt?: string;
}
export interface Coords {
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

export interface DayTime {
	id: number;
	type: number;
	country: string;
	sunrise: number;
	sunset: number;
	sys?: string;
}
