import Case from 'case';

import { Component, Input, OnInit } from '@angular/core';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import {
	LocalStorageService, StorageKeys
} from '@wa/app/core/services/local-storage/local-storage.service';
import { IComponent } from '@wa/app/models/component.model';
import { Forecast, ViewWeather } from '@wa/app/models/open-weather-map.model';

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
		this.viewData = this.parseForecastData();
	}

	getLocalizationPath(end: string): string {
		return this.componentService.getLocalizationPath(end);
	}

	private parseForecastData(): ViewWeather {
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

		const { name, dt } = this.forecast;
		const { description, icon } = this.forecast.weather[0];

		return {
			title: this.location || name,
			time: this.cultureService.convertUnixTimeToLocaleTime(dt),
			description: Case.capital(description),
			temperature: `${Math.round(this.forecast.main.temp)}° ${temperatureUnit}`,
			icon: `http://openweathermap.org/img/wn/${icon}@${this.iconSize}x.png`,
		};
	}
}
