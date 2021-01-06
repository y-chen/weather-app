import { SearchParams, SearchResult } from '@wa/app/models/here.model';

export interface GeoServiceMocks {
	searchParams: SearchParams;
	location: SearchResult;
}

export const getGeoServiceMocks = (): GeoServiceMocks => {
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

	return { searchParams, location };
};
