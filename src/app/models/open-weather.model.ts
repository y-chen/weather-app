/* eslint-disable @typescript-eslint/naming-convention */

export interface RawForecast {
        cod: string;
        message: number;
        cnt: number;
        list: RawWeather[];
        city: City;
}

export interface City {
        id?: number | string;
        name: string;
        coord: OpenCoord;
        country?: string;
        population?: number;
        timezone: number;
        sunrise?: number;
        sunset?: number;
}

export interface OpenWeatherSearchParams {
        q?: string;
        group?: string[];
        id?: string;
        coord?: OpenCoord;
        iconSize?: IconSize;
}

export interface WeatherGroup {
        cnt: number;
        list: RawWeather[];
}

export interface RawWeather {
        id?: number | string;
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

export interface OneCallResponse {
        lat: number;
        lon: number;
        timezone: string;
        timezone_offset: number;
        current: OneCallCurrent;
        hourly?: OneCallHourly[];
        daily?: OneCallDaily[];
}

export interface OneCallCurrent {
        dt: number;
        sunrise?: number;
        sunset?: number;
        temp: number;
        feels_like: number;
        pressure: number;
        humidity: number;
        dew_point?: number;
        uvi?: number;
        clouds: number;
        visibility?: number;
        wind_speed?: number;
        wind_deg?: number;
        wind_gust?: number;
        weather: WeatherDetails[];
        rain?: Precipitation;
        snow?: Precipitation;
}

export interface OneCallHourly {
        dt: number;
        temp: number;
        feels_like: number;
        pressure: number;
        humidity: number;
        dew_point?: number;
        uvi?: number;
        clouds: number;
        visibility?: number;
        wind_speed?: number;
        wind_deg?: number;
        wind_gust?: number;
        weather: WeatherDetails[];
        pop?: number;
        rain?: Precipitation;
        snow?: Precipitation;
}

export interface OneCallDaily {
        dt: number;
        sunrise?: number;
        sunset?: number;
        moonrise?: number;
        moonset?: number;
        moon_phase?: number;
        summary?: string;
        temp: DailyTemperature;
        feels_like: DailyFeelsLike;
        pressure: number;
        humidity: number;
        dew_point?: number;
        wind_speed?: number;
        wind_deg?: number;
        wind_gust?: number;
        weather: WeatherDetails[];
        clouds: number;
        pop?: number;
        rain?: number;
        snow?: number;
        uvi?: number;
}

export interface DailyTemperature {
        day: number;
        min: number;
        max: number;
        night: number;
        eve: number;
        morn: number;
}

export interface DailyFeelsLike {
        day: number;
        night: number;
        eve: number;
        morn: number;
}

export interface Precipitation {
        [key: string]: number;
}
