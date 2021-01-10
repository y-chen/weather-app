/* eslint-disable security/detect-object-injection */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Injectable } from '@angular/core';
import { Cultures, StorageKeys } from '@wa/app/common/constants';
import { Culture } from '@wa/app/models/culture.model';
import { Units } from '@wa/app/models/open-weather.model';

import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable()
export class SettingsService {
	private readonly defaultCulture: Culture;
	private readonly defaultUnit: Units;

	constructor(private readonly localStorageService: LocalStorageService) {
		this.defaultCulture = Cultures[0];
		this.defaultUnit = Units.Metric;
	}

	getCulture(): Culture {
		const storedCulture: string = this.localStorageService.get(StorageKeys.Culture);

		if (storedCulture) {
			try {
				return JSON.parse(storedCulture) as Culture;
			} catch (error) {
				return this.defaultCulture;
			}
		}

		return this.defaultCulture;
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
