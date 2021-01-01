import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import { OpenWeatherService } from '@wa/app/core/services/open-weather/open-weather.service';
import { ViewWeather } from '@wa/app/models/open-weather.model';

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
		private readonly cultureService: CultureService,
	) {
		this.componentService.init({ route: this.route });
	}

	async ngOnInit(): Promise<void> {
		this.favouriteCitiesViewData = (await this.componentService.getResolverData(
			'favouriteCitiesWeather',
		)) as ViewWeather[];

		this.cultureService.onLangChange.subscribe(async () => {
			const group: number[] = this.favouriteCitiesViewData.map(
				(viewData: ViewWeather) => viewData.id,
			);

			this.favouriteCitiesViewData = await this.openWeatherService.getWeatherGroup({ group });
		});
	}
}
