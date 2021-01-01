import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import {
	OpenWeatherMapService
} from '@wa/app/core/services/open-weather-map/open-weather-map.service';
import { ViewWeather, Weather } from '@wa/app/models/open-weather-map.model';

@Component({
	selector: 'wa-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	providers: [ComponentService],
})
export class HomeComponent implements OnInit {
	favouriteCitiesViewData: ViewWeather[];

	constructor(
		private readonly componentService: ComponentService,
		private readonly route: ActivatedRoute,
		private readonly openWeatherMapService: OpenWeatherMapService,
	) {
		this.componentService.init({ route: this.route });
	}

	async ngOnInit(): Promise<void> {
		const favouriteCitiesWeather = (await this.componentService.getResolverData(
			'favouriteCitiesWeather',
		)) as Weather[];
		this.favouriteCitiesViewData = favouriteCitiesWeather.map((weather: Weather) =>
			this.openWeatherMapService.parseWeatherData(weather),
		);
	}
}
