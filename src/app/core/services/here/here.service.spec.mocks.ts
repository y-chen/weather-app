import { HereLocation, HereSearchParams } from '@wa/app/models/here.model';

export interface HereServiceMocks {
	searchParams: HereSearchParams;
	location: HereLocation;
}

export const getHereServiceMocks = (): HereServiceMocks => {
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

	return { searchParams, location };
};
