/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import {
	LocalStorageService, StorageKeys
} from '@wa/app/core/services/local-storage/local-storage.service';
import { OpenWeatherService } from '@wa/app/core/services/open-weather/open-weather.service';
import { ViewWeather } from '@wa/app/models/open-weather-parser.model';

@Injectable()
export class WeatherGroupResolver implements Resolve<ViewWeather[]> {
	constructor(private readonly localStorageService: LocalStorageService, private readonly openWeatherService: OpenWeatherService) {}

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ViewWeather[]> {
		const favouriteCities: string = this.localStorageService.get(StorageKeys.favouriteCities);
		const group: number[] = favouriteCities ? (JSON.parse(favouriteCities) as number[]) : (route.data['defaultCities'] as number[]);

		this.localStorageService.set(StorageKeys.favouriteCities, JSON.stringify(group));

		return await this.openWeatherService.getWeatherGroup({ group });
	}
}
