import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import {
	OpenWeatherMapService
} from '@wa/app/core/services/open-weather-map/open-weather-map.service';
import { Forecast, ViewWeather, Weather } from '@wa/app/models/open-weather-map.model';

@Component({
	selector: 'wa-forecast',
	templateUrl: './forecast.component.html',
	styleUrls: ['./forecast.component.scss'],
	providers: [ComponentService],
})
export class ForecastComponent implements OnInit {
	viewWeathers: ViewWeather[];
	title: string;

	constructor(
		private readonly componentService: ComponentService,
		private readonly route: ActivatedRoute,
		private readonly openWeatherMapService: OpenWeatherMapService,
	) {
		this.componentService.init({ route: this.route });
	}

	async ngOnInit(): Promise<void> {
		const forecast: Forecast = (await this.componentService.getResolverData(
			'forecast',
		)) as Forecast;

		this.viewWeathers = forecast.list.map((forecastItem: Weather) =>
			this.openWeatherMapService.parseWeatherData(forecastItem),
		);

		const { name, country } = forecast.city;
		this.title = `${name}, ${country}`;
	}
}
