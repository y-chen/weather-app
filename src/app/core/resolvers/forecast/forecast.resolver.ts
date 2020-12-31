/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import {
	OpenWeatherMapService
} from '@wa/app/core/services/open-weather-map/open-weather-map.service';
import { Weather } from '@wa/app/models/open-weather-map.model';

@Injectable()
export class ForecastResolver implements Resolve<Weather> {
	constructor(private readonly openWeatherMapService: OpenWeatherMapService) {}

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Weather> {
		const id: number = route.params.id as number;

		if (id) {
			return await this.openWeatherMapService.getForecast({ id });
		}
	}
}
