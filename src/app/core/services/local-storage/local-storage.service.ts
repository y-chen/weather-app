/* eslint-disable @typescript-eslint/naming-convention */

import { Injectable } from '@angular/core';

export const StorageKeys = {
	Config: 'config',
	Culture: 'culture',
	FavouriteCities: 'favourite-cities',
	HereOAuthToken: 'here-oauth-token',
	Position: 'position',
	Units: 'units',
};

@Injectable()
export class LocalStorageService {
	get(key: string): string {
		return localStorage.getItem(key);
	}

	set(key: string, value: string): void {
		localStorage.setItem(key, value);
	}

	remove(key: string): void {
		localStorage.removeItem(key);
	}
}
