/* eslint-disable security/detect-object-injection */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Injectable } from '@angular/core';
import {
	LocalStorageService, StorageKeys
} from '@wa/app/core/services/local-storage/local-storage.service';
import { Units } from '@wa/app/models/open-weather.model';

@Injectable()
export class SettingsService {
	constructor(private readonly localStorageService: LocalStorageService) {}

	getUnit(): Units {
		const storedUnit: string = this.localStorageService.get(StorageKeys.Units);
		let unit: Units = storedUnit ? Units[storedUnit] : Units.Metric;

		if (!unit) {
			unit = Units.Metric;
		}

		return unit;
	}
}
