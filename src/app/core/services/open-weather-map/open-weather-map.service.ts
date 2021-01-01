/* eslint-disable @typescript-eslint/naming-convention */

import Case from 'case';

import { Injectable } from '@angular/core';
import { ApiService } from '@wa/app/core/services/api/api.service';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import {
	LocalStorageService, StorageKeys
} from '@wa/app/core/services/local-storage/local-storage.service';
import { Param } from '@wa/app/models/http.model';
import {
	OpenWeatherSearchParams, ViewWeather, Weather, WeatherGroup
} from '@wa/app/models/open-weather-map.model';
import { environment } from '@wa/environments/environment';

@Injectable()
export class OpenWeatherMapService {
	private readonly URL: string;
	private readonly API_KEY: string;

	constructor(
		private readonly api: ApiService,
		private readonly cultureService: CultureService,
		private readonly localStorageService: LocalStorageService,
	) {
		const { url, apiKey } = environment.openWeatherMapPI;
		this.URL = url;
		this.API_KEY = apiKey;
	}

	async getWeather(searchParams: OpenWeatherSearchParams): Promise<Weather> {
		const url = this.buildUrl('weather');
		let params: Param[] = [{ key: 'q', value: searchParams.q }];
		params = this.appendParams(params);

		return await this.api.get<Weather>(url, { params });
	}

	async getWeatherGroup(searchParams: OpenWeatherSearchParams): Promise<WeatherGroup> {
		const url = this.buildUrl('group');
		let params: Param[] = [{ key: 'id', value: searchParams.group.join(',') }];
		params = this.appendParams(params);

		return await this.api.get<WeatherGroup>(url, { params });
	}

	async getForecast(searchParams: OpenWeatherSearchParams): Promise<Weather> {
		const url = this.buildUrl('forecast');
		let params: Param[] = [{ key: 'id', value: searchParams.id }];
		params = this.appendParams(params);

		return await this.api.get<Weather>(url, { params });
	}

	parseWeatherData(weather: Weather, location?: string, iconSize?: 2 | 4): ViewWeather {
		iconSize = iconSize ? iconSize : 4;
		const unitsType: string = this.localStorageService.get(StorageKeys.Units);
		let temperatureUnit: string;
		switch (unitsType) {
			case 'standard':
				temperatureUnit = 'K';
				break;
			case 'metric':
				temperatureUnit = 'C';
				break;
			case 'imperial':
				temperatureUnit = 'F';
				break;
			default:
				break;
		}

		const { name, dt } = weather;
		const { description, icon } = weather.weather[0];

		return {
			title: location || name,
			time: this.cultureService.convertUnixTimeToLocaleTime(dt),
			description: Case.capital(description),
			temperature: `${Math.round(weather.main.temp)}° ${temperatureUnit}`,
			icon: `http://openweathermap.org/img/wn/${icon}@${iconSize}x.png`,
		};
	}

	private appendParams(params?: Param[]): Param[] {
		let units = this.localStorageService.get(StorageKeys.Units);
		units = units ? units : 'standard';
		params = params || [];

		return params.concat([
			{ key: 'lang', value: this.cultureService.getCulture().language },
			{ key: 'appid', value: this.API_KEY },
			{ key: 'units', value: units },
		]);
	}

	private buildUrl(endpoint: string): string {
		return `${this.URL}/${endpoint}`;
	}
}
