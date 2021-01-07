/* eslint-disable security/detect-object-injection */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Injectable } from '@angular/core';
import { LocalStorageService, StorageKeys } from '@wa/app/core/services/local-storage/local-storage.service';
import { Culture, cultures } from '@wa/app/models/culture.model';
import { Units } from '@wa/app/models/open-weather.model';

@Injectable()
export class SettingsService {
	private readonly defaultCulture: Culture;
	private readonly defaultUnit: Units;

	constructor(private readonly localStorageService: LocalStorageService) {
		this.defaultCulture = cultures[0];
		this.defaultUnit = Units.Metric;
	}

	getCulture(): Culture {
		const storedCulture: string = this.localStorageService.get(StorageKeys.Culture);

		try {
			return JSON.parse(storedCulture) as Culture;
		} catch (e) {
			return this.defaultCulture;
		}
	}

	setCulture(culture: Culture): void {
		this.localStorageService.set(StorageKeys.Culture, JSON.stringify(culture));
	}

	getUnit(): Units {
		const storedUnit: string = this.localStorageService.get(StorageKeys.Units);
		const unit: Units = Units[storedUnit];

		return unit ? unit : this.defaultUnit;
	}

	setUnit(unit: Units): void {
		this.localStorageService.set(StorageKeys.Units, unit);
	}
}
