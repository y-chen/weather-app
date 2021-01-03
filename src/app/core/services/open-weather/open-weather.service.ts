/* eslint-disable @typescript-eslint/naming-convention */

import { Injectable } from '@angular/core';
import { ApiService } from '@wa/app/core/services/api/api.service';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import { GeoService } from '@wa/app/core/services/geo/geo.service';
import {
	LocalStorageService, StorageKeys
} from '@wa/app/core/services/local-storage/local-storage.service';
import {
	OpenWeatherParserService
} from '@wa/app/core/services/open-weather-parser/open-weather-parser.service';
import { Param } from '@wa/app/models/http.model';
import { ViewForecast, ViewWeather } from '@wa/app/models/open-weather-parser.model';
import {
	Forecast, OpenWeatherSearchParams, Weather, WeatherGroup
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
		private readonly geoService: GeoService,
		private readonly openWeatherParserService: OpenWeatherParserService,
	) {
		const { url, apiKey } = environment.openWeatherMapAPI;
		this.URL = url;
		this.API_KEY = apiKey;
	}

	async getWeatherGroup(searchParams: OpenWeatherSearchParams): Promise<ViewWeather[]> {
		const url = this.buildUrl('group');
		let params: Param[] = [{ key: 'id', value: searchParams.group.join(',') }];
		params = this.appendParams(params);

		const weatherGroup = await this.api.get<WeatherGroup>(url, { params });
		await this.openWeatherParserService.translateLocationNames(weatherGroup);

		return weatherGroup.list.map((weather: Weather) => this.openWeatherParserService.parseWeatherData(weather));
	}

	async getForecastById(searchParams: OpenWeatherSearchParams): Promise<ViewForecast> {
		const url = this.buildUrl('forecast');
		let params: Param[] = [{ key: 'id', value: searchParams.id }];
		params = this.appendParams(params);

		const forecast: Forecast = await this.api.get<Forecast>(url, { params });

		return await this.openWeatherParserService.parseForecastData(forecast, searchParams.iconSize);
	}

	async getForecastByCoord(searchParams: OpenWeatherSearchParams): Promise<ViewForecast> {
		const url = this.buildUrl('forecast');
		const { lat, lon } = searchParams.coord;
		let params: Param[] = [
			{ key: 'lat', value: lat },
			{ key: 'lon', value: lon },
		];
		params = this.appendParams(params);

		const forecast = await this.api.get<Forecast>(url, { params });

		return await this.openWeatherParserService.parseForecastData(forecast, searchParams.iconSize);
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
