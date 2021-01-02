import moment from 'moment';

import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Culture } from '@wa/app/models/culture.model';

@Injectable()
export class CultureService {
	private currentCulture: Culture = availableCultures[0];

	constructor(private readonly translate: TranslateService) {}

	getAvailableCultures(): Culture[] {
		return Object.assign([], availableCultures);
	}

	setCulture(culture: Culture): void {
		if (this.translate.currentLang !== culture.language) {
			this.translate.use(culture.language);
			this.currentCulture = culture;
		}
	}

	getCulture(): Culture {
		return Object.assign({}, this.currentCulture);
	}

	convertUnixTimeToLocaleTime(unixTime: number): string {
		const { code, timeZone, timeZoneCode } = this.getCulture();
		const date = new Date(unixTime * 1000);
		const time = date.toLocaleTimeString(code, { timeZone });

		return `${time} ${timeZoneCode}`;
	}

	convertUnixTimeToLocaleDate(unixTime: number, offset: number = 0): string {
		const momentDate = moment((unixTime + offset) * 1000);
		const timeZoneSign = offset !== 0 ? (offset > 0 ? '+' : '') : '';
		const hoursOffset = offset / 3600;

		return `${momentDate.format('DD/MM/YYYY - H:mm')} GMT${timeZoneSign}${hoursOffset !== 0 ? hoursOffset : ''}`;
	}

	async getTranslation(localizationPath, data: { [key: string]: any }): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			this.translate.get(localizationPath, data).subscribe(
				(translation) => resolve(translation),
				(error) => reject(error),
			);
		});
	}

	onLangChange(callback: () => Promise<void>): void {
		this.translate.onLangChange.subscribe(async () => await callback());
	}
}

export const availableCultures: Culture[] = [
	{
		label: 'English',
		language: 'en',
		code: 'en-GB',
		timeZone: 'Europe/London',
		timeZoneCode: 'GMT',
	},
	{
		label: 'Italiano',
		language: 'it',
		code: 'it-IT',
		timeZone: 'Europe/Rome',
		timeZoneCode: 'CET',
	},
];
