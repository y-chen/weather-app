import { Component, Input, OnInit } from '@angular/core';

import Case from 'case';

import { ComponentService } from '@wa/app/core/services/component/component.service';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import { IComponent } from '@wa/app/models/component.model';
import { Forecast, ViewWeather } from '@wa/app/models/open-weather-map.model';
import {
	LocalStorageService,
	StorageKeys,
} from '@wa/app/core/services/local-storage/local-storage.service';

@Component({
	selector: 'wa-basic-weather',
	templateUrl: './basic-weather.component.html',
	styleUrls: ['./basic-weather.component.scss'],
	providers: [ComponentService],
})
export class BasicWeatherComponent implements IComponent, OnInit {
	@Input() location?: string;
	@Input() iconSize?: 2 | 4 = 4;
	@Input() forecast: Forecast;

	viewData: ViewWeather;

	constructor(
		private readonly cultureService: CultureService,
		private readonly componentService: ComponentService,
		private readonly localStorageService: LocalStorageService,
	) {
		this.componentService.init('shared.basicWeather');
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

		const unitsType: string = this.localStorageService.get(StorageKeys.Units);
		let temperatureUnit: string;
		switch (unitsType) {
			case 'standard':
				temperatureUnit = 'K';
				break;
			case 'metric':
				temperatureUnit = 'C';
				break;
			case 'imperial':
				temperatureUnit = 'F';
				break;
			default:
				break;
		}

		this.viewData = {
			title: this.location || this.forecast.name,
			time: this.cultureService.convertUnixTimeToLocaleTime(this.forecast.dt),
			description: Case.capital(this.forecast.weather[0].description),
			temperature: `${Math.round(this.forecast.main.temp)}° ${temperatureUnit}`,
			icon: `http://openweathermap.org/img/wn/${this.forecast.weather[0].icon}@${this.iconSize}x.png`,
		};
	}

	getLocalizationPath(end: string): string {
		return this.componentService.getLocalizationPath(end);
	}
}
