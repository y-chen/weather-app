/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Forecast } from '@wa/app/models/open-weather-parser.model';
import { IconSize, OpenCoord } from '@wa/app/models/open-weather.model';

import { OpenWeatherService } from '../../services/open-weather/open-weather.service';

@Injectable()
export class ForecastResolver implements Resolve<Forecast | null> {
	constructor(private readonly openWeatherService: OpenWeatherService) {}

	async resolve(route: ActivatedRouteSnapshot): Promise<Forecast> | null {
		const iconSize = route.data?.iconSize as IconSize;
		const id: number = route.params?.id as number;
		if (id) {
			return await this.openWeatherService.getForecastById({ id, iconSize });
		}

		const { lat, lon } = route.queryParams;
		if (lat && lon) {
			const coord: OpenCoord = { lat: +lat, lon: +lon };

			return await this.openWeatherService.getForecastByCoord({ coord, iconSize });
		}

		return null;
	}
}
