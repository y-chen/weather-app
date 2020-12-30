import { Component, Input, OnInit } from '@angular/core';

import Case from 'case';

import { ComponentService } from '@wa/app/core/services/component/component.service';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import { IComponent } from '@wa/app/models/component.model';
import { Forecast, ViewForecast } from '@wa/app/models/open-weather-map.model';

@Component({
	selector: 'wa-forecast',
	templateUrl: './forecast.component.html',
	styleUrls: ['./forecast.component.scss'],
	providers: [ComponentService],
})
export class ForecastComponent implements IComponent, OnInit {
	@Input() location?: string;
	@Input() iconSize?: 2 | 4 = 2;
	@Input() forecast: Forecast;

	viewData: ViewForecast;

	constructor(
		private readonly cultureService: CultureService,
		private readonly componentService: ComponentService,
	) {
		this.componentService.init('shared.forecast');
	}

	ngOnInit(): void {
		this.location = 'Vienna, Austria';
		this.forecast = {
			coord: {
				lon: 16.37,
				lat: 48.21,
			},
			weather: [
				{
					id: 800,
					main: 'Clear',
					description: 'clear sky',
					icon: '01n',
				},
			],
			base: 'stations',
			main: {
				temp: 2.48,
				feels_like: -0.15,
				temp_min: 0,
				temp_max: 3.89,
				pressure: 1008,
				humidity: 86,
			},
			visibility: 10000,
			wind: {
				speed: 1,
				deg: 50,
			},
			clouds: {
				all: 0,
			},
			dt: 1609366726,
			sys: {
				type: 1,
				id: 6878,
				country: 'AT',
				sunrise: 1609310710,
				sunset: 1609340934,
			},
			timezone: 3600,
			id: 2761369,
			name: 'Vienna',
			cod: 200,
		};

		this.viewData = {
			title: this.location || this.forecast.name,
			time: this.cultureService.convertUnixTimeToLocaleTime(this.forecast.dt),
			description: Case.pascal(this.forecast.weather[0].description),
			icon: `http://openweathermap.org/img/wn/${this.forecast.weather[0].icon}@${this.iconSize}x.png`,
		};
	}

	getLocalizationPath(end: string): string {
		return this.componentService.getLocalizationPath(end);
	}
}
