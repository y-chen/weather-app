import { Injectable } from '@angular/core';

import { environment } from '@wa/environments/environment';
import { ApiService } from '@wa/app/core/services/api/api.service';
import { Param } from '@wa/app/models/http.model';
import { HereAuthService } from '../here-auth/here-auth.service';
import { SearchResult } from '@wa/app/models/here-maps.mode';

@Injectable()
export class GeoService {
	private readonly URL;

	constructor(private readonly api: ApiService, private readonly hereAuthService: HereAuthService) {
		this.URL = environment.mapAPI.url;
	}

	async findCities(query: string): Promise<SearchResult[]> {
		let params: Param[] = [{ key: 'q', value: query }];
		params = this.hereAuthService.appendAPIKeyParam(params);
		const url = `${this.URL}/autocomplete`;

		const foundResults = await this.api.get<{ items: SearchResult[] }>(url, { params });
		return foundResults.items.filter((result: SearchResult) => result.localityType === 'city');
	}
}
