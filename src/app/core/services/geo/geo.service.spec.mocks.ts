import { SearchParams, SearchResult } from '@wa/app/models/here-api.model';
import { HttpOptions } from '@wa/app/models/http.model';
import { environment } from '@wa/environments/environment';

const { revGeocode, geocode } = environment.hereAPI.urls;

export const geocodeUrlMock = `${revGeocode}/geocode`;
export const revGeocodeUrlMock = `${revGeocode}/revgeocode`;
export const autocompleteUrlMock = `${geocode}/autocomplete`;
export const lookupUrlMock = `${revGeocode}/lookup`;

export const defaultOptionsMock: HttpOptions = {
	params: [
		{ key: 'apiKey', value: environment.hereAPI.apiKey },
		{ key: 'types', value: 'city' },
		{ key: 'lang', value: 'en' },
	],
};

export const searchParamsMock: SearchParams = {
	id: 'Id',
	coord: { lat: 0, lon: 0 },
	query: 'Query',
};

export const locationMock: SearchResult = {
	title: 'Title',
	id: 'Id',
	resultType: 'Resource Type',
	localityType: 'Locality Type',
	address: {
		label: 'Label',
		countryCode: 'Country Code',
		countryName: 'Country Name',
		state: 'State',
		county: 'County',
		city: 'City',
		postalCode: 0,
	},
};
