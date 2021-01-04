/* eslint-disable security/detect-object-injection */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Component, OnInit } from '@angular/core';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import { EventService } from '@wa/app/core/services/event/event.service';
import {
	LocalStorageService, StorageKeys
} from '@wa/app/core/services/local-storage/local-storage.service';
import { IComponent } from '@wa/app/models/component.model';
import { Culture } from '@wa/app/models/culture.model';
import { Units } from '@wa/app/models/open-weather.model';

@Component({
	selector: 'wa-settings-menu',
	templateUrl: './settings-menu.component.html',
	styleUrls: ['./settings-menu.component.scss'],
	providers: [ComponentService],
})
export class SettingsMenuComponent implements IComponent, OnInit {
	cultures: Culture[];
	currentLang: string;

	units = Units;
	currentUnit: Units;

	constructor(
		private readonly cultureService: CultureService,
		private readonly localStorageService: LocalStorageService,
		private readonly componentService: ComponentService,
		private readonly eventService: EventService,
	) {
		this.componentService.init({ localizationBasePath: 'shared.settingsMenu' });
	}

	ngOnInit(): void {
		this.cultures = this.cultureService.getAvailableCultures();
		this.currentLang = this.cultureService.getCulture().language;

		const storedUnit: string = this.localStorageService.get(StorageKeys.Units);
		this.currentUnit = storedUnit ? Units[storedUnit] : Units.Metric;

		if (!this.currentUnit) {
			this.currentUnit = Units.Metric;
		}
	}

	setCulture(event: MouseEvent, culture: Culture): void {
		event.stopPropagation();

		if (this.currentLang !== culture.language) {
			this.cultureService.setCulture(culture);
			this.currentLang = culture.language;
		}

		this.eventService.onSettingsChange.emit();
	}

	setUnits(event: MouseEvent, unit: Units): void {
		event.stopPropagation();

		if (unit !== this.currentUnit) {
			this.localStorageService.set(StorageKeys.Units, unit);
			this.currentUnit = unit;
		}

		this.eventService.onSettingsChange.emit();
	}

	getUnitsTranslationPath(unit: string): string {
		return this.getLocalizationPath(`units.${unit.toLocaleLowerCase()}`);
	}

	getLocalizationPath(end: string): string {
		return this.componentService.getLocalizationPath(end);
	}
}
