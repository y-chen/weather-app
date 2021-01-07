import { Config } from '@wa/app/models/config.model';
import { GeolocationCoordinates } from '@wa/app/models/geolocation.model';
import { HereLocation } from '@wa/app/models/here.model';

export interface SearchComponentMocks {
	config: Config;
	coordinates: GeolocationCoordinates;
	location: HereLocation;
}

export const getSearchComponentMocks = (): SearchComponentMocks => {
	const config: Config = {
		here: {
			apiKey: 'HERE-API-KEY',
			urls: {
				geocode: 'GEOCODE-URL',
				revGeocode: 'REVGEOCODE-URL',
			},
		},
		openWeatherMap: {
			apiKey: 'OPEN-WEATHER-MAP-API-KEY',
			url: 'OPEN-WEATHER-MAP-URL',
		},
	};

	const coordinates = {
		accuracy: 30,
		altitude: null,
		altitudeAccuracy: null,
		heading: null,
		latitude: 0,
		longitude: 0,
		speed: null,
	};

	const location: HereLocation = {
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

	return { config, coordinates, location };
};
