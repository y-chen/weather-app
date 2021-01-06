import { GeolocationCoordinates } from '@wa/app/models/geolocation.model';
import { SearchResult } from '@wa/app/models/here.model';

export interface SearchComponentMocks {
	coordinates: GeolocationCoordinates;
	location: SearchResult;
}

export const getSearchComponentMocks = (): SearchComponentMocks => {
	const coordinates = {
		accuracy: 30,
		altitude: null,
		altitudeAccuracy: null,
		heading: null,
		latitude: 0,
		longitude: 0,
		speed: null,
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

	return { coordinates, location };
};
