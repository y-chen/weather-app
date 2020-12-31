/* eslint-disable @typescript-eslint/naming-convention */

import { Injectable } from '@angular/core';

export const StorageKeys = {
	Position: 'position',
	HereOAuthToken: 'here-oauth-token',
	Units: 'units',
	favouriteCities: 'favourite-cities',
};

@Injectable()
export class LocalStorageService {
	set(key: string, value: string): void {
		localStorage.setItem(key, value);
	}

	get(key: string): string {
		return localStorage.getItem(key);
	}

	remove(key: string): void {
		localStorage.removeItem(key);
	}
}
