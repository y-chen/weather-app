import { ViewForecast } from '@wa/app/models/open-weather-parser.model';

export interface ForecastComponentMocks {
	forecast: ViewForecast;
}

export const getForecastComponentMocks = (): ForecastComponentMocks => {
	const forecast: ViewForecast = {
		id: 0,
		name: 'Name',
		coord: { lat: 0, lon: 0 },
		days: [
			{
				day: 'Day 1',
				night: {
					0: {
						id: 1,
						title: 'First Title',
						description: 'First Description',
						temperature: 'First Temperature',
						icon: 'First Icon',
						time: 'First Time',
					},
					1: {
						id: 2,
						title: 'Second Title',
						description: 'Second Description',
						temperature: 'Second Temperature',
						icon: 'Second Icon',
						time: 'Second Time',
					},
				},
			},
			{
				day: 'Day 2',
				night: {
					0: {
						id: 1,
						title: 'First Title',
						description: 'First Description',
						temperature: 'First Temperature',
						icon: 'First Icon',
						time: 'First Time',
					},
					1: {
						id: 2,
						title: 'Second Title',
						description: 'Second Description',
						temperature: 'Second Temperature',
						icon: 'Second Icon',
						time: 'Second Time',
					},
				},
			},
		],
	};

	return { forecast };
};
