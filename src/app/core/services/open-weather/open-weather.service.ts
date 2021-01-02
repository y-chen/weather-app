/* eslint-disable @typescript-eslint/naming-convention */

import Case from 'case';

import { Injectable } from '@angular/core';
import { ApiService } from '@wa/app/core/services/api/api.service';
import { AskGeoService } from '@wa/app/core/services/ask-geo/ask-geo.service';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import { GeoService } from '@wa/app/core/services/geo/geo.service';
import {
	LocalStorageService, StorageKeys
} from '@wa/app/core/services/local-storage/local-storage.service';
import { TimeZoneDBService } from '@wa/app/core/services/time-zone-db/time-zone-db.service';
import { SearchResult } from '@wa/app/models/here-api.model';
import { Param } from '@wa/app/models/http.model';
import {
	Coord, Forecast, OpenWeatherSearchParams, ViewForecast, ViewWeather, Weather, WeatherGroup
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
		private readonly timeZoneDBService: TimeZoneDBService,
		private readonly askGeoService: AskGeoService,
	) {
		const { url, apiKey } = environment.openWeatherMapAPI;
		this.URL = url;
		this.API_KEY = apiKey;
	}

	async getWeatherByQuery(searchParams: OpenWeatherSearchParams): Promise<Weather> {
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
		await this.translateLocationNames(weatherGroup);

		// const promises: Promise<ViewWeather>[] = weatherGroup.list.map((weather: Weather) =>
		// 	this.parseWeatherData(weather),
		// );
		// return await Promise.all(promises);

		return weatherGroup.list.map((weather: Weather) => this.parseWeatherData(weather));
	}

	async getForecastById(searchParams: OpenWeatherSearchParams): Promise<ViewForecast> {
		const url = this.buildUrl('forecast');
		let params: Param[] = [{ key: 'id', value: searchParams.id }];
		params = this.appendParams(params);

		const forecast: Forecast = await this.api.get<Forecast>(url, { params });

		return await this.parseForecastData(forecast);
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
		// const { lat, lon } = weather.coord;
		const { description, icon } = weather.weather[0];

		return {
			id,
			title: location || name,
			time: '', // await this.timeZoneDBService.convertUnixTimeToPositionLocaleDate(dt, lat, lon),
			description: Case.capital(description),
			temperature: `${Math.round(weather.main.temp)}° ${temperatureUnit}`,
			icon: `http://openweathermap.org/img/wn/${icon}@${iconSize}x.png`,
		};
	}

	private async parseForecastData(forecast: Forecast): Promise<ViewForecast> {
		console.log({ forecast });

		const coord = forecast.city.coord;
		const location: SearchResult = await this.geoService.findLocationByCoords(coord);
		const { city, countryCode } = location.address;
		const name = `${city}, ${countryCode}`;

		const promises = forecast.list.map(async (weather: Weather) => {
			const date: string = this.cultureService.convertUnixTimeToLocaleDate(weather.dt);
			const titleOverride: string = await this.cultureService.getTranslation('shared.basicWeather.date', { date });

			return this.parseWeatherData(weather, titleOverride);
		});

		const viewData = await Promise.all(promises);

		return { name, viewData, coord };
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

	private async translateLocationNames(weatherGroup: WeatherGroup): Promise<void> {
		for (const weather of weatherGroup.list) {
			const location = await this.geoService.findLocationByQuery(weather.name);
			const { city, countryCode } = location.address;

			weather.name = `${city}, ${countryCode}`;
		}
	}
}
