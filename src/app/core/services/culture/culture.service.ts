import moment from 'moment';
import { Subscription } from 'rxjs';

import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Cultures } from '@wa/app/common/constants';
import { Culture } from '@wa/app/models/culture.model';

import { SettingsService } from '../settings/settings.service';

@Injectable()
export class CultureService {
	constructor(private readonly settingsService: SettingsService, private readonly translate: TranslateService) {}

	init(): void {
		const defaultCulture: Culture = this.getAvailableCultures()[0];
		this.translate.setDefaultLang(defaultCulture.language);
		this.settingsService.setCulture(defaultCulture);
	}

	getAvailableCultures(): Culture[] {
		return Object.assign([], Cultures);
	}

	setCulture(culture: Culture): void {
		const storedCulture: Culture = this.settingsService.getCulture();

		if (storedCulture !== culture) {
			this.translate.use(culture.language);
			this.settingsService.setCulture(culture);
		}
	}

	async getTranslation(localizationPath, data?: { [key: string]: any }): Promise<string> {
		return (await this.translate.get(localizationPath, data).toPromise()) as string;
	}

	onLangChange(callback: () => Promise<void>): Subscription {
		return this.translate.onLangChange.subscribe(async () => await callback());
	}

	convertUnixTimeToLocaleDate(unixTime: number, offset: number = 0): string {
		return moment((unixTime + offset) * 1000).toString();
	}
}
