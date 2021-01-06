/* eslint-disable @typescript-eslint/naming-convention */

import * as lodash from 'lodash';

import { Injectable } from '@angular/core';
import { ApiService } from '@wa/app/core/services/api/api.service';
import { SettingsService } from '@wa/app/core/services/settings/settings.service';
import { HereLocation, HereSearchParams } from '@wa/app/models/here.model';
import { Param } from '@wa/app/models/http.model';
import { Coord } from '@wa/app/models/open-weather.model';
import { environment } from '@wa/environments/environment';

@Injectable()
export class GeoService {
	private readonly API_KEY: string;
	private readonly GEOCODE_URL: string;
	private readonly REV_GEOCODE_URL: string;

	constructor(private readonly api: ApiService, private readonly settingsService: SettingsService) {
		const { geocode, revGeocode } = environment.hereAPI.urls;
		this.GEOCODE_URL = geocode;
		this.REV_GEOCODE_URL = revGeocode;
		this.API_KEY = environment.hereAPI.apiKey;
	}

	async locationLookup(searchParams: HereSearchParams): Promise<HereLocation> {
		const { id, coord, query } = searchParams;
		let location: HereLocation;

		if (id) {
			location = await this.findLocationById(id);
		}

		if (coord && !location) {
			location = await this.findLocationByCoords(coord);
		}

		if (query && !location) {
			location = await this.findLocationByQuery(query);
		}

		return location;
	}

	async findCities(query: string): Promise<HereLocation[]> {
		const url = `${this.GEOCODE_URL}/autocomplete`;
		let params: Param[] = [
			{ key: 'q', value: query.replace(' ', '+') },
			{ key: 'limit', value: 20 },
		];
		params = this.appendParams(params);

		return (await this.api.get<{ items: HereLocation[] }>(url, { params })).items;
	}

	async findLocationById(id: string): Promise<HereLocation> {
		const url = `${this.REV_GEOCODE_URL}/lookup`;
		let params: Param[] = [{ key: 'id', value: id }];
		params = this.appendParams(params);

		return await this.api.get<HereLocation>(url, { params });
	}

	async findLocationByCoords(coord: Coord): Promise<HereLocation> {
		const url = `${this.REV_GEOCODE_URL}/revgeocode`;
		let params: Param[] = [{ key: 'at', value: `${coord.lat},${coord.lon}` }];
		params = this.appendParams(params);

		const result = await this.api.get<{ items: HereLocation[] }>(url, { params });
		return lodash.head(result.items);
	}

	async findLocationByQuery(query: string): Promise<HereLocation> {
		const url = `${this.REV_GEOCODE_URL}/geocode`;
		let params: Param[] = [{ key: 'q', value: query.replace(' ', '+') }];
		params = this.appendParams(params);

		const result = await this.api.get<{ items: HereLocation[] }>(url, { params });
		return lodash.head(result.items);
	}

	private appendParams(params: Param[] = []): Param[] {
		return params.concat([
			{ key: 'apiKey', value: this.API_KEY },
			{ key: 'types', value: 'city' },
			{ key: 'lang', value: this.settingsService.getCulture().language },
		]);
	}
}
