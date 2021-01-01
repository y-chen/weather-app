import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { OpenWeatherService } from '@wa/app/core/services/open-weather/open-weather.service';
import { ViewWeather, Weather } from '@wa/app/models/open-weather.model';

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
		private readonly openWeatherService: OpenWeatherService,
	) {
		this.componentService.init({ route: this.route });
	}

	async ngOnInit(): Promise<void> {
		const favouriteCitiesWeather = (await this.componentService.getResolverData(
			'favouriteCitiesWeather',
		)) as Weather[];

		this.favouriteCitiesViewData = favouriteCitiesWeather.map((weather: Weather) =>
			this.openWeatherService.parseWeatherData(weather),
		);
	}
}
