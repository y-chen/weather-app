import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentService } from '@wa/app/core/services/component/component.service';
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
	) {
		this.componentService.init({ route: this.route });
	}

	async ngOnInit(): Promise<void> {
		this.viewForecast = (await this.componentService.getResolverData('forecast')) as ViewForecast;
	}
}
