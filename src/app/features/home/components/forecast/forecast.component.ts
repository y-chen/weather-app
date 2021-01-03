import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import { OpenWeatherService } from '@wa/app/core/services/open-weather/open-weather.service';
import { ViewForecast } from '@wa/app/models/open-weather-parser.model';
import { Coord } from '@wa/app/models/open-weather.model';

@Component({
	selector: 'wa-forecast',
	templateUrl: './forecast.component.html',
	styleUrls: ['./forecast.component.scss'],
	providers: [ComponentService],
})
export class ForecastComponent implements OnInit {
	viewForecast: ViewForecast;

	constructor(
		private readonly componentService: ComponentService,
		private readonly route: ActivatedRoute,
		private readonly router: Router,
		private readonly openWeatherService: OpenWeatherService,
		private readonly cultureService: CultureService,
	) {
		this.componentService.init({ route: this.route, router: this.router });
	}

	async ngOnInit(): Promise<void> {
		this.viewForecast = (await this.componentService.getResolverData('forecast')) as ViewForecast;

		const subscription = this.route.params.subscribe((params: Coord) => {
			const coord = { lat: params.lat, lon: params.lon };

			if (coord.lat && coord.lon) {
				void (async () => (this.viewForecast = await this.openWeatherService.getForecastByCoord({ coord })))();
			}
		});
		this.componentService.subscribe(subscription);

		const refreshViewData: () => Promise<void> = async (): Promise<void> => {
			this.viewForecast = await this.openWeatherService.getForecastByCoord({
				coord: this.viewForecast.coord,
			});
		};

		this.cultureService.onLangChange(refreshViewData);
	}
}
