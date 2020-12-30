import { Injectable } from '@angular/core';

import OAuth from 'oauth-1.0a';
import crypto from 'crypto';

import {
	LocalStorageService,
	StorageKeys,
} from '@wa/app/core/services/local-storage/local-storage.service';
import { ApiService } from '@wa/app/core/services/api/api.service';
import { environment } from '@wa/environments/environment';
import { HttpOptions } from '@wa/app/models/http.model';
import { OAuthToken } from '@wa/app/models/here-maps.mode';

@Injectable()
export class HereAuthService {
	private readonly TOKEN_ENDPOINT_URL: string;

	private readonly oauth: OAuth;

	constructor(
		private readonly localStorageService: LocalStorageService,
		private readonly api: ApiService,
	) {
		const { accessKeyId, accessKeySecret, tokenEndpointUrl } = environment.mapAPI.auth;

		this.TOKEN_ENDPOINT_URL = tokenEndpointUrl;

		this.oauth = new OAuth({
			consumer: {
				key: accessKeyId,
				secret: accessKeySecret,
			},
			signature_method: 'HMAC-SHA256',
			hash_function: (base_string: string, key: string) => {
				return crypto.createHmac('sha256', key).update(base_string).digest('base64');
			},
		});
	}

	async getToken(): Promise<string> {
		const requestData = {
			url: this.TOKEN_ENDPOINT_URL,
			method: 'POST',
			data: { grant_type: 'client_credentials' },
		};
		const auth: OAuth.Authorization = this.oauth.authorize(requestData);
		const authHeaderValue: OAuth.Header = this.oauth.toHeader(auth);
		const options: HttpOptions = {
			headers: [{ key: 'Authorization', value: authHeaderValue }],
		};

		const { access_token } = await this.api.post<OAuthToken>(
			requestData.url,
			requestData.data,
			options,
		);

		this.localStorageService.set(StorageKeys.HereMapsOAuthToken, access_token);

		return access_token;
	}
}
