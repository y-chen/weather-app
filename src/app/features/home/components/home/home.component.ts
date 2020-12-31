import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import {
	LocalStorageService, StorageKeys
} from '@wa/app/core/services/local-storage/local-storage.service';
import {
	OpenWeatherMapService
} from '@wa/app/core/services/open-weather-map/open-weather-map.service';
import { Forecast } from '@wa/app/models/open-weather-map.model';

@Component({
	selector: 'wa-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	providers: [ComponentService],
})
export class HomeComponent implements OnInit {
	favouriteCities;

	constructor(
		private readonly componentService: ComponentService,
		private readonly route: ActivatedRoute,
		private readonly localStorageService: LocalStorageService,
		private readonly openWeatherMapService: OpenWeatherMapService,
	) {
		this.componentService.init('', this.route);
	}

	async ngOnInit(): Promise<void> {
		this.favouriteCities = await this.getFavouriteCities();
	}

	private async getFavouriteCities(): Promise<Forecast[]> {
		let group: number[];
		const localStorageFavouriteCities: string = this.localStorageService.get(
			StorageKeys.favouriteCities,
		);

		if (localStorageFavouriteCities) {
			group = JSON.parse(localStorageFavouriteCities) as number[];
		} else {
			group = (await this.componentService.getRouteData('defaultCities')) as number[];

			this.localStorageService.set(StorageKeys.favouriteCities, JSON.stringify(group));
		}

		return (await this.openWeatherMapService.getGroupForecast({ group })).list;
	}
}
