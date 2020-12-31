import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { Forecast } from '@wa/app/models/open-weather-map.model';

@Component({
	selector: 'wa-forecast',
	templateUrl: './forecast.component.html',
	styleUrls: ['./forecast.component.scss'],
	providers: [ComponentService],
})
export class ForecastComponent implements OnInit {
	forecast: Forecast;

	constructor(
		private readonly componentService: ComponentService,
		private readonly route: ActivatedRoute,
	) {
		this.componentService.init({ route: this.route });
	}

	async ngOnInit(): Promise<void> {
		this.forecast = (await this.componentService.getResolverData('forecast')) as Forecast;
	}
}
