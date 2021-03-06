/* eslint-disable security/detect-object-injection */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/naming-convention */

import { Injectable } from '@angular/core';
import { Param } from '@wa/app/models/http.model';
import { Forecast, Weather } from '@wa/app/models/open-weather-parser.model';
import { OpenWeatherSearchParams, RawForecast, RawWeather, Units, WeatherGroup } from '@wa/app/models/open-weather.model';

import { ApiService } from '../api/api.service';
import { ConfigService } from '../config/config.service';
import { OpenWeatherParserService } from '../open-weather-parser/open-weather-parser.service';
import { SettingsService } from '../settings/settings.service';

@Injectable()
export class OpenWeatherService {
	private readonly URL: string;
	private readonly API_KEY: string;

	constructor(
		private readonly api: ApiService,
		private readonly configService: ConfigService,
		private readonly openWeatherParserService: OpenWeatherParserService,
		private readonly settingsService: SettingsService,
	) {
		const { url, apiKey } = this.configService.config.openWeatherMap;
		this.URL = url;
		this.API_KEY = apiKey;
	}

	async getWeatherGroup(searchParams: OpenWeatherSearchParams): Promise<Weather[]> {
		const url = this.buildUrl('group');
		let params: Param[] = [{ key: 'id', value: searchParams.group.join(',') }];
		params = this.appendParams(params);

		const weatherGroup = await this.api.get<WeatherGroup>(url, { params });
		await this.openWeatherParserService.translateLocationNames(weatherGroup);

		return weatherGroup.list.map((weather: RawWeather) => this.openWeatherParserService.parseWeatherData(weather));
	}

	async getForecastById(searchParams: OpenWeatherSearchParams): Promise<Forecast> {
		const url = this.buildUrl('forecast');
		let params: Param[] = [{ key: 'id', value: searchParams.id }];
		params = this.appendParams(params);

		const forecast: RawForecast = await this.api.get<RawForecast>(url, { params });

		return await this.openWeatherParserService.parseForecastData(forecast, searchParams.iconSize);
	}

	async getForecastByCoord(searchParams: OpenWeatherSearchParams): Promise<Forecast> {
		const url = this.buildUrl('forecast');
		const { lat, lon } = searchParams.coord;
		let params: Param[] = [
			{ key: 'lat', value: lat },
			{ key: 'lon', value: lon },
		];
		params = this.appendParams(params);

		const forecast = await this.api.get<RawForecast>(url, { params });

		return await this.openWeatherParserService.parseForecastData(forecast, searchParams.iconSize);
	}

	private appendParams(params: Param[] = []): Param[] {
		const unit: Units = this.settingsService.getUnit();

		return params.concat([
			{ key: 'lang', value: this.settingsService.getCulture().language },
			{ key: 'appid', value: this.API_KEY },
			{ key: 'units', value: unit.toLocaleLowerCase() },
		]);
	}

	private buildUrl(endpoint: string): string {
		return `${this.URL}/${endpoint}`;
	}
}
