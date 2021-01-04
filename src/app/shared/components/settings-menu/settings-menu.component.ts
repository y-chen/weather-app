import { Component, OnInit } from '@angular/core';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import {
	LocalStorageService, StorageKeys
} from '@wa/app/core/services/local-storage/local-storage.service';
import { Culture } from '@wa/app/models/culture.model';

@Component({
	selector: 'wa-settings-menu',
	templateUrl: './settings-menu.component.html',
	styleUrls: ['./settings-menu.component.scss'],
})
export class SettingsMenuComponent implements OnInit {
	cultures: Culture[];
	currentLang: string;
	currentUnit: string;

	constructor(private readonly cultureService: CultureService, private readonly localStorageService: LocalStorageService) {}

	ngOnInit(): void {
		this.cultures = this.cultureService.getAvailableCultures();
		this.currentLang = this.cultureService.getCulture().language;

		const storedUnit = this.localStorageService.get(StorageKeys.Units);
		this.currentUnit = storedUnit ? storedUnit : 'metric';
	}

	setCulture(event: MouseEvent, culture: Culture): void {
		event.stopPropagation();

		if (this.currentLang !== culture.language) {
			this.cultureService.setCulture(culture);
			this.currentLang = culture.language;
		}
	}

	setUnits(event: MouseEvent, unit: string): void {
		event.stopPropagation();

		if (unit !== this.currentUnit) {
			this.localStorageService.set(StorageKeys.Units, unit);
			this.currentUnit = unit;
		}
	}
}
