import { Injectable } from '@angular/core';

export const StorageKeys = {
	Position: 'position',
};

@Injectable()
export class LocalStorageService {
	set(key: string, value: string) {
		localStorage.setItem(key, value);
	}

	get(key: string) {
		return localStorage.getItem(key);
	}

	remove(key: string) {
		localStorage.removeItem(key);
	}
}
