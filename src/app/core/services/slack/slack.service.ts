/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/naming-convention */

import moment from 'moment';

import { Injectable } from '@angular/core';
import { ApiService } from '@wa/app/core/services/api/api.service';
import { ConfigService } from '@wa/app/core/services/config/config.service';
import { Header } from '@wa/app/models/http.model';
import { SlackMessage, SlackPayload } from '@wa/app/models/slack.model';

@Injectable()
export class SlackService {
	private readonly HOOK_URL: string;

	constructor(private readonly api: ApiService, private readonly config: ConfigService) {
		this.HOOK_URL = this.config.getConfig().slackHookUrl;
	}

	async sendError(content: unknown): Promise<void> {
		const headers: Header[] = [{ key: 'Content-type', value: 'application/x-www-form-urlencoded' }];
		const message: SlackMessage = { timestamp: moment.now(), type: 'error', content };
		const payload: SlackPayload = { channel: 'ng-weather-app-log-staging', text: JSON.stringify(message) };

		await this.api.post<void>(this.HOOK_URL, payload, { headers });
	}
}
