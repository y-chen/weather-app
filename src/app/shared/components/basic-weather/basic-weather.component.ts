import { Component, Input, OnInit } from '@angular/core';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import {
	OpenWeatherMapService
} from '@wa/app/core/services/open-weather-map/open-weather-map.service';
import { IComponent } from '@wa/app/models/component.model';
import { ViewWeather, Weather } from '@wa/app/models/open-weather-map.model';

@Component({
	selector: 'wa-basic-weather',
	templateUrl: './basic-weather.component.html',
	styleUrls: ['./basic-weather.component.scss'],
	providers: [ComponentService],
})
export class BasicWeatherComponent implements IComponent, OnInit {
	@Input() location?: string;
	@Input() iconSize?: 2 | 4;
	@Input() weather: Weather;

	viewData: ViewWeather;

	constructor(
		private readonly componentService: ComponentService,
		private readonly openWeatherMap: OpenWeatherMapService,
	) {
		this.componentService.init({ localizationBasePath: 'shared.basicWeather' });
	}

	ngOnInit(): void {
		if (this.weather) {
			this.viewData = this.openWeatherMap.parseWeatherData(
				this.weather,
				this.location,
				this.iconSize,
			);
		}
	}

	getLocalizationPath(end: string): string {
		return this.componentService.getLocalizationPath(end);
	}
}
