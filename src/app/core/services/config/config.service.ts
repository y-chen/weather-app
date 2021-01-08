/* eslint-disable no-underscore-dangle */

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Config } from '@wa/app/models/config.model';
import { environment } from '@wa/environments/environment';

@Injectable()
export class ConfigService {
	private _config: Config;
	public get config(): Config {
		return this._config;
	}

	constructor(private readonly firestore: AngularFirestore) {}

	async loadConfig(): Promise<void> {
		const snapshot = await this.firestore.collection('config').doc<Config>(environment.configId).get().toPromise();

		this._config = snapshot.data();
	}
}
