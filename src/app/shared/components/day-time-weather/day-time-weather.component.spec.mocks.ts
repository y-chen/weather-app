/* eslint-disable @typescript-eslint/naming-convention */

import { DayTimeWeather } from '@wa/app/models/open-weather-parser.model';
import { DayTime } from '@wa/app/models/open-weather.model';

export interface DayTimeWeatherComponentMocks {
	dayTimeName: DayTime;
	dayTimeWeather: DayTimeWeather;
}

export const getDayTimeWeatherComponentMocks = (): DayTimeWeatherComponentMocks => {
	const dayTimeName: DayTime = 'night';

	const dayTimeWeather: DayTimeWeather = [
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

	return { dayTimeName, dayTimeWeather };
};
