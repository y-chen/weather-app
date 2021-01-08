/* eslint-disable security/detect-object-injection */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Component, OnInit } from '@angular/core';
import { LocalizationPathKeys } from '@wa/app/common/constants';
import { ComponentService } from '@wa/app/core/services/component/component.service';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import { EventService } from '@wa/app/core/services/event/event.service';
import { SettingsService } from '@wa/app/core/services/settings/settings.service';
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
		private readonly componentService: ComponentService,
		private readonly cultureService: CultureService,
		private readonly eventService: EventService,
		private readonly settingsService: SettingsService,
	) {
		this.componentService.init({ localizationBasePath: LocalizationPathKeys.SettingsMenuComponent });
	}

	ngOnInit(): void {
		this.cultures = this.cultureService.getAvailableCultures();
		this.currentLang = this.settingsService.getCulture().language;

		this.currentUnit = this.settingsService.getUnit();
	}

	setCulture(event: MouseEvent, culture: Culture): void {
		event.stopPropagation();

		if (this.currentLang !== culture.language) {
			this.cultureService.setCulture(culture);
			this.currentLang = culture.language;

			this.eventService.onSettingsChange.emit();
		}
	}

	setUnit(event: MouseEvent, unit: Units): void {
		event.stopPropagation();

		if (unit !== this.currentUnit) {
			this.settingsService.setUnit(unit);
			this.currentUnit = unit;

			this.eventService.onSettingsChange.emit();
		}
	}

	getUnitsTranslationPath(unit: string): string {
		return this.getLocalizationPath(`units.${unit.toLocaleLowerCase()}`);
	}

	getLocalizationPath(end: string): string {
		return this.componentService.getLocalizationPath(end);
	}
}
