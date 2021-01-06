import { ViewWeather } from '@wa/app/models/open-weather-parser.model';

export interface HomeComponentMocks {
	viewWeathers: ViewWeather[];
}

export const getHomeComponentMocks = (): HomeComponentMocks => {
	const viewWeathers: ViewWeather[] = [
		{
			id: 1,
			title: 'First Title',
			description: 'First Description',
			temperature: 'First Temperature',
			icon: 'First Icon',
			time: 'First Time',
		},
		{
			id: 2,
			title: 'Second Title',
			description: 'Second Description',
			temperature: 'Second Temperature',
			icon: 'Second Icon',
			time: 'Second Time',
		},
	];

	return { viewWeathers };
};
