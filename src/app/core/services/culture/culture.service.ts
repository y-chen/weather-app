import { Injectable } from '@angular/core';

import { Culture } from '@wa/app/models';

@Injectable()
export class CultureService {
	private currentCulture: Culture = availableCultures[0];

	getAvailableCultures(): Culture[] {
		return Object.assign([], availableCultures);
	}

	setCulture(culture: Culture): void {
		this.currentCulture = culture;
	}

	getCulture(): Culture {
		return Object.assign({}, this.currentCulture);
	}
}

export const availableCultures: Culture[] = [
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
