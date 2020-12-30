import { Injectable } from '@angular/core';

import { environment } from '@wa/environments/environment';
import { ApiService } from '@wa/app/core/services/api/api.service';
import { Param } from '@wa/app/models/http.model';
import { HereAuthService } from '@wa/app/core/services/here-auth/here-auth.service';
import { SearchResult } from '@wa/app/models/here-api.model';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import { GeolocationCoordinates } from '@wa/app/models/geolocation.model';

@Injectable()
export class GeoService {
	private readonly GEOCODE_URL: string;
	private readonly REV_GEOCODE_URL: string;

	constructor(
		private readonly api: ApiService,
		private readonly hereAuthService: HereAuthService,
		private readonly cultureService: CultureService,
	) {
		const { geocode, revGeocode } = environment.hereAPI.urls;
		this.GEOCODE_URL = geocode;
		this.REV_GEOCODE_URL = revGeocode;
	}

	async findCities(query: string): Promise<SearchResult[]> {
		let params: Param[] = [
			{ key: 'q', value: query },
			{ key: 'limit', value: 20 },
			{ key: 'types', value: 'city' },
			{ key: 'lang', value: this.cultureService.getCulture().language },
		];
		params = this.hereAuthService.appendAPIKeyParam(params);
		const url = `${this.GEOCODE_URL}/autocomplete`;

		return (await this.api.get<{ items: SearchResult[] }>(url, { params })).items;
	}

	async findLocationByCoords(coords: GeolocationCoordinates): Promise<SearchResult> {
		let params: Param[] = [
			{ key: 'at', value: `${coords.latitude},${coords.longitude}` },
			{ key: 'types', value: 'city' },
			{ key: 'lang', value: this.cultureService.getCulture().language },
		];
		params = this.hereAuthService.appendAPIKeyParam(params);
		const url = `${this.REV_GEOCODE_URL}/revgeocode`;

		return (await this.api.get<{ items: SearchResult[] }>(url, { params })).items[0];
	}
}
