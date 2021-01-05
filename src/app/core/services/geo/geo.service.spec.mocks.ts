import { SearchParams, SearchResult } from '@wa/app/models/here-api.model';
import { HttpOptions } from '@wa/app/models/http.model';
import { environment } from '@wa/environments/environment';

const { revGeocode, geocode } = environment.hereAPI.urls;

export interface GeoServiceMocks {
	geocodeUrl: string;
	revGeocodeUrl: string;
	autocompleteUrl: string;
	lookupUrl: string;
	options: HttpOptions;
	searchParams: SearchParams;
	location: SearchResult;
}

export const getMocksData = (): GeoServiceMocks => {
	const geocodeUrl = `${revGeocode}/geocode`;
	const revGeocodeUrl = `${revGeocode}/revgeocode`;
	const autocompleteUrl = `${geocode}/autocomplete`;
	const lookupUrl = `${revGeocode}/lookup`;

	const options: HttpOptions = {
		params: [
			{ key: 'apiKey', value: environment.hereAPI.apiKey },
			{ key: 'types', value: 'city' },
			{ key: 'lang', value: 'en' },
		],
	};

	const searchParams: SearchParams = {
		id: 'LocationId',
		coord: { lat: 0, lon: 0 },
		query: 'Search Query',
	};

	const location: SearchResult = {
		title: 'Title',
		id: 'Id',
		resultType: 'Resource Type',
		address: {
			label: 'Label',
			countryCode: 'Country Code',
			countryName: 'Country Name',
			state: 'State',
			county: 'County',
			city: 'City',
			postalCode: '0',
		},
	};

	return { geocodeUrl, revGeocodeUrl, autocompleteUrl, lookupUrl, options, searchParams, location };
};
