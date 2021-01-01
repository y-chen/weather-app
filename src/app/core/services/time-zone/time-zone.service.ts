/* eslint-disable @typescript-eslint/naming-convention */

import { Injectable } from '@angular/core';
import { ApiService } from '@wa/app/core/services/api/api.service';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import { Param } from '@wa/app/models/http.model';
import { TimeZone } from '@wa/app/models/time-zone.model';
import { environment } from '@wa/environments/environment';

@Injectable()
export class TimeZoneService {
	private readonly URL: string;
	private readonly API_KEY: string;

	constructor(private readonly api: ApiService, private readonly cultureService: CultureService) {
		const { url, apiKey } = environment.timeZoneAPI;
		this.URL = url;
		this.API_KEY = apiKey;
	}

	async getTimeZoneByPosition(lat: number, lng: number): Promise<TimeZone> {
		const url = this.buildUrl('get-time-zone');
		let params: Param[] = [
			{ key: 'lat', value: lat },
			{ key: 'lng', value: lng },
			{ key: 'by', value: 'position' },
		];
		params = this.appendParams(params);

		return await this.api.get<TimeZone>(url, { params });
	}

	private appendParams(params?: Param[]): Param[] {
		params = params || [];

		return params.concat([
			{ key: 'lang', value: this.cultureService.getCulture().language },
			{ key: 'key', value: this.API_KEY },
			{ key: 'format', value: 'json' },
		]);
	}

	private buildUrl(endpoint: string): string {
		return `${this.URL}/${endpoint}`;
	}
}
