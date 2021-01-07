import { Config } from '@wa/app/models/config.model';
import { HereLocation, HereSearchParams } from '@wa/app/models/here.model';

export interface HereServiceMocks {
	config: Config;
	searchParams: HereSearchParams;
	location: HereLocation;
}

export const getHereServiceMocks = (): HereServiceMocks => {
	const config: Config = {
		here: {
			apiKey: 'HERE-API-KEY',
			urls: {
				geocode: 'GEOCODE-URL',
				revGeocode: 'REV-GEOCODE-URL',
			},
		},
		openWeatherMap: {
			apiKey: 'OPEN-WEATHER-MAP-API-KEY',
			url: 'OPEN-WEATHER-MAP-URL',
		},
	};

	const searchParams: HereSearchParams = {
		id: 'LocationId',
		coord: { lat: 0, lon: 0 },
		query: 'Search Query',
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

	return { config, searchParams, location };
};
