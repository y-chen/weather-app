import moment from 'moment';

/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { ApiService } from '@wa/app/core/services/api/api.service';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import { AskGeo, TimeZone } from '@wa/app/models/ask-geo.model';
import { Param } from '@wa/app/models/http.model';
import { environment } from '@wa/environments/environment';

@Injectable()
export class AskGeoService {
	private readonly URL: string;
	private readonly API_KEY: string;
	private readonly ACCOUNT_ID: number;

	constructor(private readonly api: ApiService, private readonly cultureService: CultureService) {
		const { url, apiKey, accountId } = environment.askGeoAPI;
		this.URL = url;
		this.API_KEY = apiKey;
		this.ACCOUNT_ID = accountId;
	}

	async convertUnixTimeToPositionLocaleDate(
		unixTime: number,
		lat: number,
		lng: number,
	): Promise<string> {
		const positionTimeZone: TimeZone = await this.getTimeZoneByPosition(lat, lng);

		const positionLocaleDate = moment
			.tz(unixTime, positionTimeZone.TimeZoneId)
			.format('DD/MM/YYYY - H:mm:ss');

		return `${positionLocaleDate} ${positionTimeZone.ShortName}`;
	}

	async getTimeZoneByPosition(lat: number, lon: number): Promise<TimeZone> {
		const url = this.buildUrl();

		let params: Param[] = [{ key: 'points', value: `${lat},${lon}` }];
		params = this.appendParams(params);

		const askGeoResult: AskGeo = await this.api.get<AskGeo>(url, {
			params,
			headers: [{ key: 'Content-Type', value: 'application/json' }],
		});
		return askGeoResult.data[0].TimeZone;
	}

	private appendParams(params?: Param[]): Param[] {
		params = params || [];

		return params.concat([{ key: 'databases', value: 'TimeZone' }]);
	}

	private buildUrl(): string {
		return `${this.URL}/${this.ACCOUNT_ID}/${this.API_KEY}/query.json`;
	}
}
