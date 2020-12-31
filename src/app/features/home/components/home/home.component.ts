import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { Weather } from '@wa/app/models/open-weather-map.model';

@Component({
	selector: 'wa-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	providers: [ComponentService],
})
export class HomeComponent implements OnInit {
	favouriteCitiesWeather: Weather[];

	constructor(
		private readonly componentService: ComponentService,
		private readonly route: ActivatedRoute,
	) {
		this.componentService.init({ route: this.route });
	}

	async ngOnInit(): Promise<void> {
		this.favouriteCitiesWeather = (await this.componentService.getResolverData(
			'favouriteCitiesWeather',
		)) as Weather[];
	}
}
