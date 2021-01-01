/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { OpenWeatherService } from '@wa/app/core/services/open-weather/open-weather.service';
import { Weather } from '@wa/app/models/open-weather.model';

@Injectable()
export class ForecastResolver implements Resolve<Weather> {
	constructor(private readonly openWeatherService: OpenWeatherService) {}

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Weather> {
		const id: number = route.params.id as number;

		if (id) {
			return await this.openWeatherService.getForecast({ id });
		}
	}
}
