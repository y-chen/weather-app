/* eslint-disable @typescript-eslint/naming-convention */

import Case from 'case';

import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '@wa/app/core/services/api/api.service';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import {
	LocalStorageService, StorageKeys
} from '@wa/app/core/services/local-storage/local-storage.service';
import { Param } from '@wa/app/models/http.model';
import {
	Forecast, OpenWeatherSearchParams, ViewWeather, Weather, WeatherGroup
} from '@wa/app/models/open-weather.model';
import { environment } from '@wa/environments/environment';

@Injectable()
export class OpenWeatherService {
	private readonly URL: string;
	private readonly API_KEY: string;

	constructor(
		private readonly api: ApiService,
		private readonly cultureService: CultureService,
		private readonly localStorageService: LocalStorageService,
		private readonly translate: TranslateService,
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

	async getWeatherGroup(searchParams: OpenWeatherSearchParams): Promise<ViewWeather[]> {
		const url = this.buildUrl('group');
		let params: Param[] = [{ key: 'id', value: searchParams.group.join(',') }];
		params = this.appendParams(params);

		const weatherGroup = await this.api.get<WeatherGroup>(url, { params });
		return weatherGroup.list.map((weather: Weather) => this.parseWeatherData(weather));
	}

	async getForecast(searchParams: OpenWeatherSearchParams): Promise<ViewWeather[]> {
		const url = this.buildUrl('forecast');
		let params: Param[] = [{ key: 'id', value: searchParams.id }];
		params = this.appendParams(params);

		const forecast = await this.api.get<Forecast>(url, { params });
		return await this.parseForecastData(forecast);
	}

	private parseWeatherData(weather: Weather, location?: string, iconSize?: 2 | 4): ViewWeather {
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

		const { id, name, dt } = weather;
		const { description, icon } = weather.weather[0];

		return {
			id,
			title: location || name,
			time: this.cultureService.convertUnixTimeToLocaleTime(dt),
			description: Case.capital(description),
			temperature: `${Math.round(weather.main.temp)}° ${temperatureUnit}`,
			icon: `http://openweathermap.org/img/wn/${icon}@${iconSize}x.png`,
		};
	}

	private async parseForecastData(forecast: Forecast): Promise<ViewWeather[]> {
		const promises = forecast.list.map(async (weather: Weather) => {
			const date: string = this.cultureService.convertUnixTimeToLocaleDate(weather.dt);

			const titleOverride: string = (await this.translate
				.get('shared.basicWeather.date', { date })
				.toPromise()) as string;

			return this.parseWeatherData(weather, titleOverride);
		});

		return await Promise.all(promises);
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
