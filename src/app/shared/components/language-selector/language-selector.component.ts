/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Component, OnInit, ViewChild } from '@angular/core';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import { SettingsService } from '@wa/app/core/services/settings/settings.service';
import { Culture } from '@wa/app/models/culture.model';

@Component({
	selector: 'wa-language-selector',
	templateUrl: './language-selector.component.html',
	styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent implements OnInit {
	@ViewChild('cultureSelection') cultureSelection: any;

	cultures: Culture[];
	currentLang: string;

	constructor(private readonly cultureService: CultureService, private readonly settingsService: SettingsService) {}

	ngOnInit(): void {
		this.cultures = this.cultureService.getAvailableCultures();
		this.currentLang = this.settingsService.getCulture().language;
	}

	setCulture(culture: Culture): void {
		if (this.currentLang !== culture.language) {
			this.cultureService.setCulture(culture);
			this.currentLang = culture.language;

			if (this.cultureSelection) {
				this.cultureSelection.hide();
			}
		}
	}
}
