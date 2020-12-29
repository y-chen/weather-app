import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { CultureService } from '../culture/culture.service';
import { LoggerService } from '../logger/logger.service';
import { HttpOptions, Header, Param, HttpOption } from '@wa/app/models/http.model';

@Injectable()
export class ApiService {
	constructor(private readonly http: HttpClient, private readonly logger: LoggerService) {}

	get<T>(url: string, options?: HttpOptions): Observable<T> {
		const opts = this.getOptions(options);

		this.logger.debug(`ApiService: executing GET ${url}`);

		return this.http.get(url, opts).pipe((result: Observable<T>) => {
			this.logger.debug(`ApiService: executed GET ${url} result`, result);

			return result;
		});
	}

	post<T>(url: string, body?: any, options?: HttpOptions): Observable<T> {
		const opts = this.getOptions(options);

		this.logger.debug(`ApiService: executing POST ${url}`, body);

		return this.http.post<T>(url, body, opts).pipe((result) => {
			this.logger.debug(`ApiService: executed POST ${url} result`, result);

			return result;
		});
	}

	put<T>(url: string, body?: any, options?: HttpOptions): Observable<T> {
		const opts = this.getOptions(options);

		this.logger.debug(`ApiService: executing PUT ${url}`, body);

		return this.http.put<T>(url, body, opts).pipe((result) => {
			this.logger.debug(`ApiService: executed PUT ${url} result`, result);
			return result;
		});
	}

	delete<T>(url: string, body?: any, options?: HttpOptions): Observable<T> {
		const opts = this.getOptions(options);

		this.logger.debug(`ApiService: executing DELETE ${url}`, body);

		return this.http.delete<T>(url, opts).pipe((result) => {
			this.logger.debug(`ApiService: executed DELETE ${url} result`, result);
			return result;
		});
	}

	patch<T>(url: string, body?: any): Observable<T> {
		const opts = { headers: new HttpHeaders() };
		opts.headers = this.getHeaders([]);

		this.logger.debug(`ApiService: executing PATCH ${url}`, body);

		return this.http.patch<T>(url, body, opts).pipe((result) => {
			this.logger.debug(`ApiService: executed PATCH ${url} result`, result);
			return result;
		});
	}

	private getOptions(options?: HttpOptions): { headers: HttpHeaders; params: HttpParams } {
		options = options || { headers: [], params: [] };

		return {
			headers: this.getHeaders(options.headers),
			params: this.getParams(options.params),
		};
	}

	private getHeaders(customHeaders?: Header[]): HttpHeaders {
		let headers = new HttpHeaders();
		customHeaders = customHeaders || [];

		customHeaders.forEach(
			(header: Header) => (headers = this.handleOption(headers, header) as HttpHeaders),
		);

		const hasContentType = headers.has('Content-Type');
		if (!hasContentType) {
			headers = headers.set('Content-Type', 'application/json');
		}

		return headers;
	}

	private getParams(customParams?: Param[]): HttpParams {
		let params = new HttpParams();

		customParams.forEach(
			(param: Param) => (params = this.handleOption(params, param) as HttpParams),
		);

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
