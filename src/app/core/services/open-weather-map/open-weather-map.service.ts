import { Injectable } from '@angular/core';

import { ApiService } from '@wa/app/core/services/api/api.service';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import { Param } from '@wa/app/models/http.model';
import {
	Forecast,
	ForecastGroup,
	ForecastSearchParams,
} from '@wa/app/models/open-weather-map.model';
import { environment } from '@wa/environments/environment';
import {
	LocalStorageService,
	StorageKeys,
} from '@wa/app/core/services/local-storage/local-storage.service';

@Injectable()
export class OpenWeatherMapService {
	private readonly URL: string;
	private readonly API_KEY: string;

	constructor(
		private readonly api: ApiService,
		private readonly cultureService: CultureService,
		private readonly localStorageService: LocalStorageService,
	) {
		const { url, apiKey } = environment.openWeatherMapPI;
		this.URL = url;
		this.API_KEY = apiKey;
	}

	async getForecast(searchParams: ForecastSearchParams): Promise<Forecast> {
		const url = this.buildUrl('weather');
		let params: Param[] = [{ key: 'q', value: searchParams.q }];
		params = this.appendParams(params);

		return await this.api.get<Forecast>(url, { params });
	}

	async getGroupForecast(searchParams: ForecastSearchParams): Promise<ForecastGroup> {
		const url = this.buildUrl('group');
		let params: Param[] = [{ key: 'id', value: searchParams.group.join(',') }];
		params = this.appendParams(params);

		return await this.api.get<ForecastGroup>(url, { params });
	}

	private appendParams(params?: Param[]): Param[] {
		let units = this.localStorageService.get(StorageKeys.Units);
		units = units ? units : 'standard';
		params = params || [];

		return params.concat([
			{ key: 'lang', value: this.cultureService.getCulture().language },
			{ key: 'appid', value: this.API_KEY },
			{ key: 'units', value: units },
		]);
	}

	private buildUrl(endpoint: string): string {
		return `${this.URL}/${endpoint}`;
	}
}
