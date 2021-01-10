import moment from 'moment';

import { EventEmitter, Injectable } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Cultures } from '@wa/app/common/constants';
import { Culture } from '@wa/app/models/culture.model';

import { SettingsService } from '../settings/settings.service';

@Injectable()
export class CultureService {
	constructor(private readonly settingsService: SettingsService, private readonly translate: TranslateService) {}

	get onLangChange(): EventEmitter<LangChangeEvent> {
		return this.translate.onLangChange;
	}

	init(): void {
		const storedCulture: Culture = this.settingsService.getCulture();
		this.translate.setDefaultLang(storedCulture.language);
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

	convertUnixTimeToLocaleDate(unixTime: number, offset: number = 0): string {
		return moment((unixTime + offset) * 1000).toString();
	}
}
