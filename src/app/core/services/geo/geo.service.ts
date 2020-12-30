import { Injectable } from '@angular/core';

import { environment } from '@wa/environments/environment';
import { ApiService } from '@wa/app/core/services/api/api.service';
import { Param } from '@wa/app/models/http.model';
import { HereAuthService } from '@wa/app/core/services/here-auth/here-auth.service';
import { SearchResult } from '@wa/app/models/here-maps.mode';
import { CultureService } from '@wa/app/core/services/culture/culture.service';

@Injectable()
export class GeoService {
	private readonly URL;

	constructor(
		private readonly api: ApiService,
		private readonly hereAuthService: HereAuthService,
		private readonly cultureService: CultureService,
	) {
		this.URL = environment.mapAPI.url;
	}

	async findCities(query: string): Promise<SearchResult[]> {
		let params: Param[] = [
			{ key: 'q', value: query },
			{ key: 'limit', value: 20 },
			{ key: 'types', value: 'city' },
			{ key: 'lang', value: this.cultureService.getCulture().language },
		];
		params = this.hereAuthService.appendAPIKeyParam(params);
		const url = `${this.URL}/autocomplete`;

		return (await this.api.get<{ items: SearchResult[] }>(url, { params })).items;
	}
}
