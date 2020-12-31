/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import {
	LocalStorageService, StorageKeys
} from '@wa/app/core/services/local-storage/local-storage.service';
import {
	OpenWeatherMapService
} from '@wa/app/core/services/open-weather-map/open-weather-map.service';
import { Weather } from '@wa/app/models/open-weather-map.model';

@Injectable()
export class GroupForecastResolver implements Resolve<Weather[]> {
	constructor(
		private readonly localStorageService: LocalStorageService,
		private readonly openWeatherMapService: OpenWeatherMapService,
	) {}

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Weather[]> {
		const favouriteCities: string = this.localStorageService.get(StorageKeys.favouriteCities);
		const group: number[] = favouriteCities
			? (JSON.parse(favouriteCities) as number[])
			: (route.data['defaultCities'] as number[]);

		this.localStorageService.set(StorageKeys.favouriteCities, JSON.stringify(group));

		return (await this.openWeatherMapService.getWeatherGroup({ group })).list;
	}
}
