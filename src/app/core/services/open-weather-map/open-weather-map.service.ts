import { Injectable } from '@angular/core';

import { ApiService } from '@wa/app/core/services/api/api.service';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import { Param } from '@wa/app/models/http.model';
import { Forecast, ForecastGroup, ForecastParams } from '@wa/app/models/open-weather-map.model';
import { environment } from '@wa/environments/environment';

@Injectable()
export class OpenWeatherMapService {
	private readonly URL: string;
	private readonly API_KEY: string;

	constructor(private readonly api: ApiService, private readonly cultureService: CultureService) {
		const { url, apiKey } = environment.openWeatherMapPI;
		this.URL = url;
		this.API_KEY = apiKey;
	}

	async getForecast(forecastParams: ForecastParams): Promise<Forecast> {
		const url = this.buildUrl('weather');
		let params: Param[] = Object.keys(forecastParams).map((key: string) => {
			return { key, value: forecastParams[key] };
		});
		params = this.appendParams(params);

		return await this.api.get<Forecast>(url, { params });
	}

	async getGroupForecast(forecastParams: ForecastParams): Promise<ForecastGroup> {
		const url = this.buildUrl('group');
		let params: Param[] = [
			{ key: 'id', value: forecastParams.group.join(',') },
			{ key: 'units', value: forecastParams.units },
		];
		params = this.appendParams(params);

		return await this.api.get<ForecastGroup>(url, { params });
	}

	private appendParams(params?: Param[]): Param[] {
		params = params || [];

		return params.concat([
			{ key: 'lang', value: this.cultureService.getCulture().language },
			{ key: 'appid', value: this.API_KEY },
		]);
	}

	private buildUrl(endpoint: string): string {
		return `${this.URL}/${endpoint}`;
	}
}
