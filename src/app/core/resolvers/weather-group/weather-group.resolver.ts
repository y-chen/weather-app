/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Weather } from '@wa/app/models/open-weather-parser.model';

import { LocalStorageService, StorageKeys } from '../../services/local-storage/local-storage.service';
import { OpenWeatherService } from '../../services/open-weather/open-weather.service';

@Injectable()
export class WeatherGroupResolver implements Resolve<Weather[]> {
	constructor(private readonly localStorageService: LocalStorageService, private readonly openWeatherService: OpenWeatherService) {}

	async resolve(route: ActivatedRouteSnapshot): Promise<Weather[]> {
		const favouriteCities: string = this.localStorageService.get(StorageKeys.FavouriteCities);
		const group: number[] = favouriteCities ? (JSON.parse(favouriteCities) as number[]) : (route.data.defaultCities as number[]);

		this.localStorageService.set(StorageKeys.FavouriteCities, JSON.stringify(group));

		if (group && group.length > 0) {
			return await this.openWeatherService.getWeatherGroup({ group });
		}

		return [];
	}
}
