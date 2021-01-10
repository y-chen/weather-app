import { Subscription } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalizationPathKeys } from '@wa/app/common/constants';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import { EventService } from '@wa/app/core/services/event/event.service';
import { OpenWeatherService } from '@wa/app/core/services/open-weather/open-weather.service';
import { IComponent } from '@wa/app/models/component.model';
import { Forecast } from '@wa/app/models/open-weather-parser.model';
import { OpenCoord } from '@wa/app/models/open-weather.model';

@Component({
	selector: 'wa-forecast',
	templateUrl: './forecast.component.html',
	styleUrls: ['./forecast.component.scss'],
	providers: [ComponentService],
})
export class ForecastComponent implements IComponent, OnInit {
	forecast: Forecast;

	constructor(
		private readonly componentService: ComponentService,
		private readonly cultureService: CultureService,
		private readonly openWeatherService: OpenWeatherService,
		private readonly eventService: EventService,
		private readonly route: ActivatedRoute,
		private readonly router: Router,
	) {
		this.componentService.init({
			localizationBasePath: LocalizationPathKeys.ForecastComponent,
			route: this.route,
			router: this.router,
		});
	}

	async ngOnInit(): Promise<void> {
		this.forecast = (await this.componentService.getResolverData('forecast')) as Forecast;

		const queryParamsSub: Subscription = this.route.queryParams.subscribe((queryParams: OpenCoord) =>
			this.updateForecast(queryParams),
		);
		const onSettingsChangeSub: Subscription = this.eventService.onSettingsChange.subscribe(() => this.updateForecast());

		this.componentService.subscribe(queryParamsSub);
		this.componentService.subscribe(onSettingsChangeSub);

		this.refreshTranslations();
	}

	getLocalizationPath(end: string): string {
		return this.componentService.getLocalizationPath(end);
	}

	private updateForecast(coord?: OpenCoord): void {
		coord = coord ? coord : this.forecast.coord;

		if (coord.lat && coord.lon) {
			void (async () => (this.forecast = await this.openWeatherService.getForecastByCoord({ coord })))();
		}
	}

	private refreshTranslations(): void {
		const refreshViewData: () => Promise<void> = async (): Promise<void> => {
			if (this.forecast?.coord) {
				this.forecast = await this.openWeatherService.getForecastByCoord({
					coord: this.forecast.coord,
				});
			}
		};

		const onLangChangeSub = this.cultureService.onLangChange.subscribe(() => refreshViewData());
		this.componentService.subscribe(onLangChangeSub);
	}
}
