import { Culture } from '@wa/app/models/culture.model';
import { Units } from '@wa/app/models/open-weather.model';

export interface SettingsMenuComponentMocks {
	cultures: Culture[];
	currentCulture: Culture;
	currentUnit: Units;
	units: string[];
}

export const getSettingsMenuComponentMocks = (): SettingsMenuComponentMocks => {
	const cultures: Culture[] = [
		{
			label: 'English',
			language: 'en',
			code: 'en-GB',
		},
		{
			label: 'Italiano',
			language: 'it',
			code: 'it-IT',
		},
	];

	const currentCulture: Culture = {
		label: 'Italiano',
		language: 'it',
		code: 'it-IT',
	};

	const currentUnit: Units = Units.Imperial;

	const units: string[] = ['Metric', 'Imperial'];

	return { cultures, currentCulture, currentUnit, units };
};
