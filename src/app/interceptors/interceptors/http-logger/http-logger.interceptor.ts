/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggerService } from '@wa/app/core/services/logger/logger.service';
import { Header, HttpOption, Param } from '@wa/app/models/http.model';

@Injectable()
export class HttpLoggerInterceptor implements HttpInterceptor {
	constructor(private readonly loggerService: LoggerService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const { method, url: requestUrl, body: requestBody, headers: requestHeaders, params: requestParams } = request;
		const requestHeaderKeyValuePairs: Header[] = this.mapHttpOption(requestHeaders);
		const requestParamKeyValuePairs: Param[] = this.mapHttpOption(requestParams);

		this.loggerService.debug(`HTTP Request: executing ${method} ${requestUrl}`, {
			body: requestBody,
			headers: requestHeaderKeyValuePairs,
			params: requestParamKeyValuePairs,
		});

		return next.handle(request).pipe(
			tap((event: HttpEvent<any>) => {
				if (event instanceof HttpResponse) {
					const { url: responseUrl, status, body: responseBody, headers: responseHeaders } = event;
					const responseHeaderKeyValuePairs: Header[] = this.mapHttpOption(responseHeaders);

					this.loggerService.debug(`HTTP Response: executed request to ${responseUrl}`, {
						status,
						body: responseBody,
						headers: responseHeaderKeyValuePairs,
					});
				}
			}),
		);
	}

	private mapHttpOption(option: HttpOption): Header[] | Param[] {
		return option.keys().map((key: string) => ({ key, value: option.get(key) }));
	}
}
