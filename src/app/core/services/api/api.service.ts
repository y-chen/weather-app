/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggerService } from '@wa/app/core/services/logger/logger.service';
import { SettingsService } from '@wa/app/core/services/settings/settings.service';
import { Header, HttpOption, HttpOptions, Param } from '@wa/app/models/http.model';

@Injectable()
export class ApiService {
	constructor(
		private readonly http: HttpClient,
		private readonly loggerService: LoggerService,
		private readonly settingsService: SettingsService,
	) {}

	async get<T>(url: string, options?: HttpOptions): Promise<T> {
		const opts = this.getOptions(options);

		this.loggerService.debug(`ApiService: executing GET ${url}`, { opts });

		const result = await this.http.get<T>(url, opts).toPromise();

		this.loggerService.debug(`ApiService: executed GET ${url} result`, { result });

		return result;
	}

	async post<T>(url: string, body?: unknown, options?: HttpOptions): Promise<T> {
		const opts = this.getOptions(options);

		this.loggerService.debug(`ApiService: executing POST ${url}`, { body, opts });

		const result = await this.http.post<T>(url, body, opts).toPromise();

		this.loggerService.debug(`ApiService: executed POST ${url} result`, { result });

		return result;
	}

	async put<T>(url: string, body?: unknown, options?: HttpOptions): Promise<T> {
		const opts = this.getOptions(options);

		this.loggerService.debug(`ApiService: executing PUT ${url}`, { body, opts });

		const result = await this.http.put<T>(url, body, opts).toPromise();

		this.loggerService.debug(`ApiService: executed PUT ${url} result`, result);

		return result;
	}

	async delete<T>(url: string, options?: HttpOptions): Promise<T> {
		const opts = this.getOptions(options);

		this.loggerService.debug(`ApiService: executing DELETE ${url}`, { opts });

		const result = await this.http.delete<T>(url, opts).toPromise();

		this.loggerService.debug(`ApiService: executed DELETE ${url} result`, { result });

		return result;
	}

	async patch<T>(url: string, body?: Body): Promise<T> {
		const opts = { headers: new HttpHeaders() };
		opts.headers = this.getHeaders([]);

		this.loggerService.debug(`ApiService: executing PATCH ${url}`, { body, opts });

		const result = await this.http.patch<T>(url, body, opts).toPromise();

		this.loggerService.debug(`ApiService: executed PATCH ${url} result`, { result });

		return result;
	}

	private getOptions(
		options: HttpOptions = { headers: [], params: [] },
	): { headers: HttpHeaders; params: HttpParams; withCredentials: boolean } {
		return {
			headers: this.getHeaders(options.headers),
			params: this.getParams(options.params),
			withCredentials: options.withCredentials,
		};
	}

	private getHeaders(customHeaders: Header[] = []): HttpHeaders {
		let headers = new HttpHeaders();

		customHeaders.forEach((header: Header) => (headers = this.handleOption(headers, header) as HttpHeaders));

		headers = headers.set('Accept-Language', this.settingsService.getCulture().code);

		return headers;
	}

	private getParams(customParams: Param[] = []): HttpParams {
		let params = new HttpParams();

		customParams.forEach((param: Param) => (params = this.handleOption(params, param) as HttpParams));

		return params;
	}

	private handleOption(options: HttpOption, pair: Header | Param): HttpOption {
		if (this.isSimpleType(pair.value)) {
			return options.append(pair.key, pair.value);
		}

		return options.set(pair.key, JSON.stringify(pair.value));
	}

	private isSimpleType(value: any): boolean {
		switch (typeof value) {
			case 'string':
			case 'number':
			case 'boolean':
				return true;
		}

		if (value instanceof Date) {
			return true;
		}

		return false;
	}
}
