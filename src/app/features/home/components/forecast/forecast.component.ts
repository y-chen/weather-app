import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { OpenWeatherService } from '@wa/app/core/services/open-weather/open-weather.service';
import { ViewForecast } from '@wa/app/models/open-weather.model';

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
		private readonly translate: TranslateService,
		private readonly openWeatherService: OpenWeatherService,
	) {
		this.componentService.init({ route: this.route });
	}

	async ngOnInit(): Promise<void> {
		this.viewForecast = (await this.componentService.getResolverData('forecast')) as ViewForecast;

		this.translate.onLangChange.subscribe(async () => {
			this.viewForecast = await this.openWeatherService.getForecastByCoord({
				coord: this.viewForecast.coord,
			});
		});
	}
}
