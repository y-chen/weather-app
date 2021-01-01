/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { OpenWeatherService } from '@wa/app/core/services/open-weather/open-weather.service';
import { ViewWeather } from '@wa/app/models/open-weather.model';

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

		return null;
	}
}
