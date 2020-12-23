import { Component, OnInit, ViewChild } from '@angular/core';

import { CultureService } from '@wa/app/core/services/culture/culture.service';
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

	constructor(private readonly cultureService: CultureService) {}

	ngOnInit(): void {
		this.currentLang = this.cultureService.getCulture().language;
		this.cultures = this.cultureService.getAvailableCultures();
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
