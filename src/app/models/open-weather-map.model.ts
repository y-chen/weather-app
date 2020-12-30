export interface ForecastParams {
	q?: string;
	group?: number[];
	units: 'standard' | 'metric' | 'imperial';
}

export interface ForecastGroup {
	cnt: number;
	list: Forecast[];
}

export interface Forecast {
	id: number;
	name: string;
	coord: Coords;
	weather: Weather[];
	base: string;
	main: Temperature;
	visibility: number;
	wind: Wind;
	clouds: Clouds;
	dt: number;
	sys: DayTime;
	timezone: number;
	cod: number;
}

export interface Coords {
	lat: number;
	lon: number;
}

export interface Weather {
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
}
