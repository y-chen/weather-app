/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { OpenWeatherService } from '@wa/app/core/services/open-weather/open-weather.service';
import { Coord, ViewWeather } from '@wa/app/models/open-weather.model';

@Injectable()
export class ForecastResolver implements Resolve<ViewWeather[]> {
	constructor(private readonly openWeatherService: OpenWeatherService) {}

	async resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): Promise<ViewWeather[]> | null {
		const id: number = route.params.id as number;
		if (id) {
			return await this.openWeatherService.getForecastById({ id });
		}

		const { lat, lon } = route.queryParams;
		if (lat && lon) {
			const coord: Coord = { lat: +lat, lon: +lon };

			return await this.openWeatherService.getForecastByCoord({ coord });
		}

		return null;
	}
}
