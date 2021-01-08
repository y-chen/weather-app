import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SettingsService } from '@wa/app/core/services/settings/settings.service';
import { Header, HttpOption, HttpRequestOptions, Param } from '@wa/app/models/http.model';

@Injectable()
export class ApiService {
	constructor(private readonly http: HttpClient, private readonly settingsService: SettingsService) {}

	async get<T>(url: string, options?: HttpRequestOptions): Promise<T> {
		const opts = this.getOptions(options);

		return await this.http.get<T>(url, opts).toPromise();
	}

	async post<T>(url: string, body?: unknown, options?: HttpRequestOptions): Promise<T> {
		const opts = this.getOptions(options);

		return await this.http.post<T>(url, body, opts).toPromise();
	}

	async put<T>(url: string, body?: unknown, options?: HttpRequestOptions): Promise<T> {
		const opts = this.getOptions(options);

		return await this.http.put<T>(url, body, opts).toPromise();
	}

	async delete<T>(url: string, options?: HttpRequestOptions): Promise<T> {
		const opts = this.getOptions(options);

		return await this.http.delete<T>(url, opts).toPromise();
	}

	async patch<T>(url: string, body?: Body): Promise<T> {
		const opts = { headers: new HttpHeaders() };
		opts.headers = this.getHeaders([]);

		return await this.http.patch<T>(url, body, opts).toPromise();
	}

	private getOptions(
		options: HttpRequestOptions = { headers: [], params: [] },
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
			return options.set(pair.key, pair.value);
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
