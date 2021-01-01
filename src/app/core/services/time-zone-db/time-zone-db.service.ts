/* eslint-disable @typescript-eslint/naming-convention */

import moment from 'moment-timezone';

import { Injectable } from '@angular/core';
import { ApiService } from '@wa/app/core/services/api/api.service';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import { Header, Param } from '@wa/app/models/http.model';
import { TimeZoneDB } from '@wa/app/models/time-zone-db.model';
import { environment } from '@wa/environments/environment';

@Injectable()
export class TimeZoneDBService {
	private readonly URL: string;
	private readonly API_KEY: string;

	constructor(private readonly api: ApiService, private readonly cultureService: CultureService) {
		const { url, apiKey } = environment.timeZoneDBAPI;
		this.URL = url;
		this.API_KEY = apiKey;
	}

	async convertUnixTimeToPositionLocaleDate(
		unixTime: number,
		lat: number,
		lng: number,
	): Promise<string> {
		const positionTimeZone: TimeZoneDB = await this.getTimeZoneByPosition(lat, lng);
		const positionLocaleDate: string = moment
			.tz(unixTime, positionTimeZone.zoneName)
			.format('DD/MM/YYYY - H:mm:ss');

		return `${positionLocaleDate} ${positionTimeZone.nextAbbreviation}`;
	}

	async getTimeZoneByPosition(lat: number, lng: number): Promise<TimeZoneDB> {
		const url = this.buildUrl('get-time-zone');

		let params: Param[] = [
			{ key: 'lat', value: lat },
			{ key: 'lng', value: lng },
			{ key: 'by', value: 'position' },
		];
		params = this.appendParams(params);

		const headers: Header[] = [
			{ key: 'Connection', value: 'Keep-Alive' },
			{ key: 'Keep-Alive', value: 'timeout=5000, max=1000' },
		];

		return await this.api.get<TimeZoneDB>(url, { params, headers });
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
