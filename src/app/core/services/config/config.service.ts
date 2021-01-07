/* eslint-disable no-underscore-dangle */

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LocalStorageService, StorageKeys } from '@wa/app/core/services/local-storage/local-storage.service';
import { Config } from '@wa/app/models/config.model';
import { environment } from '@wa/environments/environment';

@Injectable()
export class ConfigService {
	constructor(private readonly firestore: AngularFirestore, private readonly localStorageService: LocalStorageService) {}

	async loadConfig(): Promise<void> {
		const snapshot = await this.firestore.collection('config').doc<Config>(environment.configId).get().toPromise();

		this.localStorageService.set(StorageKeys.Config, JSON.stringify(snapshot.data()));
	}

	getConfig(): Config {
		return JSON.parse(this.localStorageService.get(StorageKeys.Config)) as Config;
	}
}
