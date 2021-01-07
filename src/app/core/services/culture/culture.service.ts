import moment from 'moment';
import { Subscription } from 'rxjs';

import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from '@wa/app/core/services/settings/settings.service';
import { Culture, cultures } from '@wa/app/models/culture.model';

@Injectable()
export class CultureService {
	constructor(private readonly settingsService: SettingsService, private readonly translate: TranslateService) {}

	init(): void {
		const defaultCulture: Culture = this.getAvailableCultures()[0];
		this.translate.setDefaultLang(defaultCulture.language);
		this.settingsService.setCulture(defaultCulture);
	}

	getAvailableCultures(): Culture[] {
		return Object.assign([], cultures);
	}

	setCulture(culture: Culture): void {
		const storedCulture: Culture = this.settingsService.getCulture();

		if (storedCulture !== culture) {
			this.translate.use(culture.language);
			this.settingsService.setCulture(culture);
		}
	}

	onLangChange(callback: () => Promise<void>): Subscription {
		return this.translate.onLangChange.subscribe(async () => await callback());
	}

	convertUnixTimeToLocaleDate(unixTime: number, offset: number = 0): string {
		return moment((unixTime + offset) * 1000).toString();
	}
}
