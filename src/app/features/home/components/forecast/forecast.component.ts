import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { OpenWeatherService } from '@wa/app/core/services/open-weather/open-weather.service';
import { Forecast, ViewWeather, Weather } from '@wa/app/models/open-weather.model';

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
		private readonly openWeatherService: OpenWeatherService,
	) {
		this.componentService.init({ route: this.route });
	}

	async ngOnInit(): Promise<void> {
		const forecast: Forecast = (await this.componentService.getResolverData(
			'forecast',
		)) as Forecast;

		this.viewWeathers = forecast.list.map((forecastItem: Weather) =>
			this.openWeatherService.parseWeatherData(forecastItem),
		);

		const { name, country } = forecast.city;
		this.title = `${name}, ${country}`;
	}
}
