import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CultureService } from '@wa/app/core/services/culture/culture.service';
import { LoggerService } from '@wa/app/core/services/logger/logger.service';
import { Header, HttpOption, HttpOptions, Param } from '@wa/app/models/http.model';

@Injectable()
export class ApiService {
	constructor(
		private readonly http: HttpClient,
		private readonly logger: LoggerService,
		private readonly cultureService: CultureService,
	) {}

	get<T>(url: string, options?: HttpOptions): Promise<T> {
		const opts = this.getOptions(options);

		this.logger.debug(`ApiService: executing GET ${url}`, { opts });

		return new Promise<T>((resolve) => {
			this.http.get<T>(url, opts).subscribe((result: T) => {
				this.logger.debug(`ApiService: executed GET ${url} result`, { result });

				resolve(result);
			});
		});
	}

	post<T>(url: string, body?: unknown, options?: HttpOptions): Promise<T> {
		const opts = this.getOptions(options);

		this.logger.debug(`ApiService: executing POST ${url}`, { body, opts });

		return new Promise<T>((resolve) => {
			this.http.post<T>(url, body, opts).subscribe((result: T) => {
				this.logger.debug(`ApiService: executed POST ${url} result`, { result });

				resolve(result);
			});
		});
	}

	put<T>(url: string, body?: unknown, options?: HttpOptions): Promise<T> {
		const opts = this.getOptions(options);

		this.logger.debug(`ApiService: executing PUT ${url}`, { body, opts });

		return new Promise<T>((resolve) => {
			this.http.put<T>(url, body, opts).subscribe((result: T) => {
				this.logger.debug(`ApiService: executed PUT ${url} result`, result);

				resolve(result);
			});
		});
	}

	delete<T>(url: string, options?: HttpOptions): Promise<T> {
		const opts = this.getOptions(options);

		this.logger.debug(`ApiService: executing DELETE ${url}`, { opts });

		return new Promise<T>((resolve) => {
			this.http.delete<T>(url, opts).subscribe((result: T) => {
				this.logger.debug(`ApiService: executed DELETE ${url} result`, { result });

				resolve(result);
			});
		});
	}

	patch<T>(url: string, body?: Body): Promise<T> {
		const opts = { headers: new HttpHeaders() };
		opts.headers = this.getHeaders([]);

		this.logger.debug(`ApiService: executing PATCH ${url}`, { body, opts });

		return new Promise<T>((resolve) => {
			this.http.patch<T>(url, body, opts).subscribe((result: T) => {
				this.logger.debug(`ApiService: executed PATCH ${url} result`, { result });

				resolve(result);
			});
		});
	}

	private getOptions(options?: HttpOptions): { headers: HttpHeaders; params: HttpParams; withCredentials: boolean } {
		options = options || { headers: [], params: [] };

		return {
			headers: this.getHeaders(options.headers),
			params: this.getParams(options.params),
			withCredentials: options.withCredentials,
		};
	}

	private getHeaders(customHeaders?: Header[]): HttpHeaders {
		let headers = new HttpHeaders();
		customHeaders = customHeaders || [];

		customHeaders.forEach((header: Header) => (headers = this.handleOption(headers, header) as HttpHeaders));

		headers = headers.set('Accept-Language', this.cultureService.getCulture().code);

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
