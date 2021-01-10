/* eslint-disable @typescript-eslint/naming-convention */

import { Injectable } from '@angular/core';
import { SendEmailParams } from '@wa/app/models/elastic-email.model';
import { Param } from '@wa/app/models/http.model';

import { ApiService } from '../api/api.service';
import { ConfigService } from '../config/config.service';

@Injectable()
export class ElasticEmailService {
	private readonly API_KEY: string;
	private readonly URL: string;
	private readonly FROM: string;
	private readonly FROM_NAME: string;
	private readonly TO: string;

	constructor(private readonly api: ApiService, private readonly configService: ConfigService) {
		const { apiKey, url, from, fromName, to } = this.configService.config.elasticEmail;
		this.API_KEY = apiKey;
		this.URL = url;
		this.FROM = from;
		this.FROM_NAME = fromName;
		this.TO = to;
	}

	async sendEmail(emailParams: SendEmailParams): Promise<void> {
		const url = this.buildUrl('email/send');
		const { subject, bodyType, message } = emailParams;

		let params: Param[] = [
			{ key: 'subject', value: subject },
			{ key: bodyType, value: message },
		];
		params = this.appendParams(params);

		await this.api.post<void>(url, null, { params });
	}

	private appendParams(params: Param[] = []): Param[] {
		return params.concat([
			{ key: 'apiKey', value: this.API_KEY },
			{ key: 'from', value: this.FROM },
			{ key: 'fromName', value: this.FROM_NAME },
			{ key: 'to', value: this.TO },
		]);
	}

	private buildUrl(endpoint: string): string {
		return `${this.URL}/${endpoint}`;
	}
}
