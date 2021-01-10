/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/naming-convention */

import { AES, enc } from 'crypto-js';
import { stringify } from 'flatted';
import moment from 'moment';

import { Injectable } from '@angular/core';
import { Header } from '@wa/app/models/http.model';
import { SlackMessage, SlackPayload } from '@wa/app/models/slack.model';
import { environment } from '@wa/environments/environment';

import { ApiService } from '../api/api.service';

@Injectable()
export class SlackService {
	private readonly HOOK_URL: string;
	private readonly CHANNEL: string;

	constructor(private readonly api: ApiService) {
		// I have to temporary read SlackService's config from Angular environment files
		// because the service constructor runs before ConfingService.loadConfig() finishes
		// but HereService and OpenWeatherMapService behave as expected.
		const { hookUrlEncrypted, channel } = environment.slack;
		this.HOOK_URL = AES.decrypt(hookUrlEncrypted, environment.key).toString(enc.Utf8);
		this.CHANNEL = channel;
	}

	async sendError(content: unknown): Promise<void> {
		const headers: Header[] = [{ key: 'Content-type', value: 'application/x-www-form-urlencoded' }];
		const message: SlackMessage = { timestamp: moment.now(), type: 'error', content };
		const payload: SlackPayload = { channel: this.CHANNEL, text: stringify(message) };

		await this.api.post<void>(this.HOOK_URL, payload, { headers });
	}
}
